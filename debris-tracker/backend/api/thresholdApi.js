import { connectionPool } from "../server/database.js";

// Thresholds for grouping observations
const THRESHOLDS = {
  // Allow for small differences in measurements that could be the same object
  MAX_RA_DIFF_SECONDS: 1.0,  // Maximum difference in RA seconds
  MAX_DEC_DIFF_SECONDS: 1.0, // Maximum difference in Dec seconds
  MAX_TIME_DIFF_MINUTES: 5,  // Maximum time between observations
  MAX_ANGLE_DIFF: 0.5,       // Maximum difference in angle above horizon
  MAX_AZIMUTH_DIFF: 1.0      // Maximum difference in azimuth
};

export async function groupObservationsIntoDebris(req, res) {
  try {
    // Get all ungrouped observations (those without a DebrisID or with temporary IDs)
    const getObservationsQuery = `
      SELECT * FROM observations 
      WHERE DebrisID IS NULL OR DebrisID LIKE 'TMP%'
      ORDER BY ObservationDateTime
    `;

    connectionPool.query(getObservationsQuery, async (error, observations) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Error retrieving observations" });
      }

      const debrisGroups = [];
      const processedObservations = new Set();

      // Compare each observation with others to find groups
      for (let i = 0; i < observations.length; i++) {
        if (processedObservations.has(observations[i].ObservationID)) continue;

        const currentGroup = [observations[i]];
        processedObservations.add(observations[i].ObservationID);

        for (let j = i + 1; j < observations.length; j++) {
          if (processedObservations.has(observations[j].ObservationID)) continue;

          if (areObservationsRelated(observations[i], observations[j])) {
            currentGroup.push(observations[j]);
            processedObservations.add(observations[j].ObservationID);
          }
        }

        if (currentGroup.length >= 2) { // Only create debris if we have multiple observations
          debrisGroups.push(currentGroup);
        }
      }

      // Create new debris entries and update observations
      for (const group of debrisGroups) {
        await createDebrisFromGroup(group);
      }

      res.status(200).json({
        message: `Successfully grouped observations into ${debrisGroups.length} debris objects`
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function areObservationsRelated(obs1, obs2) {
  // Convert RA to seconds for comparison
  const ra1TotalSeconds = (obs1.RightAscensionHours * 3600) + 
                         (obs1.RightAscensionMinutes * 60) + 
                         obs1.RightAscensionSeconds;
  const ra2TotalSeconds = (obs2.RightAscensionHours * 3600) + 
                         (obs2.RightAscensionMinutes * 60) + 
                         obs2.RightAscensionSeconds;

  // Convert Dec to seconds for comparison
  const dec1TotalSeconds = (obs1.DeclinationDegrees * 3600) + 
                          (obs1.DeclinationMinutes * 60) + 
                          obs1.DeclinationSeconds;
  const dec2TotalSeconds = (obs2.DeclinationDegrees * 3600) + 
                          (obs2.DeclinationMinutes * 60) + 
                          obs2.DeclinationSeconds;

  // Calculate time difference in minutes
  const timeDiff = Math.abs(
    (new Date(obs2.ObservationDateTime) - new Date(obs1.ObservationDateTime)) / (1000 * 60)
  );

  return (
    Math.abs(ra1TotalSeconds - ra2TotalSeconds) <= THRESHOLDS.MAX_RA_DIFF_SECONDS &&
    Math.abs(dec1TotalSeconds - dec2TotalSeconds) <= THRESHOLDS.MAX_DEC_DIFF_SECONDS &&
    timeDiff <= THRESHOLDS.MAX_TIME_DIFF_MINUTES &&
    Math.abs(obs1.AngleAboveHorizon - obs2.AngleAboveHorizon) <= THRESHOLDS.MAX_ANGLE_DIFF &&
    Math.abs(obs1.Azimuth - obs2.Azimuth) <= THRESHOLDS.MAX_AZIMUTH_DIFF &&
    obs1.DeclinationDirection === obs2.DeclinationDirection
  );
}

async function createDebrisFromGroup(group) {
  return new Promise((resolve, reject) => {
    // Sort group by time to get first and last observation
    group.sort((a, b) => new Date(a.ObservationDateTime) - new Date(b.ObservationDateTime));
    const firstObs = group[0];
    const lastObs = group[group.length - 1];

    // Calculate velocity and direction based on position changes
    const timeElapsedHours = 
      (new Date(lastObs.ObservationDateTime) - new Date(firstObs.ObservationDateTime)) / (1000 * 60 * 60);
    
    // Simple velocity calculation based on azimuth change
    const azimuthChange = lastObs.Azimuth - firstObs.Azimuth;
    const velocity = Math.abs(azimuthChange / timeElapsedHours); // degrees per hour
    const direction = azimuthChange > 0 ? 'Eastward' : 'Westward';

    // Calculate rough Doppler shift (simplified example)
    const dopplerShift = velocity * 0.001; // Simplified calculation for example

    // Create new debris record
    const debrisID = `DBR${Date.now().toString().slice(-6)}`;
    const debrisQuery = `
      INSERT INTO debris (
        DebrisID, Name, Description, DiscoveryDateTime, 
        Location, Velocity, Direction, DopplerShift
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const location = `RA: ${firstObs.RightAscensionHours}h ${firstObs.RightAscensionMinutes}m ${firstObs.RightAscensionSeconds}s, ` +
                    `Dec: ${firstObs.DeclinationDegrees}° ${firstObs.DeclinationMinutes}' ${firstObs.DeclinationSeconds}" ${firstObs.DeclinationDirection}`;

    const debrisValues = [
      debrisID,
      `Debris Object ${debrisID}`,
      `Observed ${group.length} times over ${timeElapsedHours.toFixed(2)} hours`,
      firstObs.ObservationDateTime,
      location,
      velocity.toFixed(2),
      direction,
      dopplerShift.toFixed(6)
    ];

    connectionPool.query(debrisQuery, debrisValues, async (error, results) => {
      if (error) {
        console.error("Error creating debris:", error);
        return reject(error);
      }

      // Update all observations in the group with the new DebrisID
      const updatePromises = group.map(obs => {
        return new Promise((resolveUpdate, rejectUpdate) => {
          const updateQuery = `
            UPDATE observations 
            SET DebrisID = ? 
            WHERE ObservationID = ?
          `;
          
          connectionPool.query(updateQuery, [debrisID, obs.ObservationID], 
            (updateError, updateResults) => {
              if (updateError) rejectUpdate(updateError);
              else resolveUpdate(updateResults);
          });
        });
      });

      try {
        await Promise.all(updatePromises);
        resolve(results);
      } catch (updateError) {
        reject(updateError);
      }
    });
  });
}