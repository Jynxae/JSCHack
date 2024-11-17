// feedApi.js
import { connectionPool } from "../server/database.js";

export async function getLatestObservations(req, res) {
  try {
    const query = `
      SELECT 
        o.ObservationID as id,
        o.ObservationDateTime as timestamp,
        o.DebrisID,
        u.Username as name,
        d.Name as debrisName,
        d.Description as debrisDescription,
        d.Location as debrisLocation,
        CAST(d.Velocity AS DECIMAL(10,2)) as velocity,
        d.Direction as direction,
        CAST(d.DopplerShift AS DECIMAL(10,6)) as dopplerShift,
        CONCAT(
          'Observed ', 
          COALESCE(d.Name, 'unidentified debris'),
          ' at coordinates: RA ',
          o.RightAscensionHours, 'h ',
          o.RightAscensionMinutes, 'm ',
          ROUND(o.RightAscensionSeconds, 2), 's, Dec ',
          o.DeclinationDegrees, '°',
          o.DeclinationMinutes, '''',
          ROUND(o.DeclinationSeconds, 2), '"', 
          o.DeclinationDirection,
          ' (Alt: ',
          ROUND(o.AngleAboveHorizon, 2), '°, Az: ',
          ROUND(o.Azimuth, 2), '°)',
          CASE 
            WHEN d.Velocity IS NOT NULL THEN CONCAT('. Moving ', LOWER(d.Direction), ' at ', ROUND(d.Velocity, 2), '°/hr')
            ELSE ''
          END
        ) as content
      FROM observations o 
      JOIN users u ON o.UserID = u.UserID 
      LEFT JOIN debris d ON o.DebrisID = d.DebrisID
      ORDER BY o.ObservationDateTime DESC 
      LIMIT 4
    `;

    connectionPool.query(query, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Error fetching observations" });
      }

      // Format timestamps and ensure all fields are properly handled
      const formattedResults = results.map(result => {
        // Safely convert numerical values
        const velocity = result.velocity ? parseFloat(result.velocity) : null;
        const dopplerShift = result.dopplerShift ? parseFloat(result.dopplerShift) : null;

        return {
          id: result.id,
          timestamp: new Date(result.timestamp).toLocaleString(),
          DebrisID: result.DebrisID,
          name: result.name,
          content: result.content,
          extraInfo: {
            name: result.debrisName || 'Unknown Object',
            description: result.debrisDescription || 'No description available',
            location: result.debrisLocation || 'Location undefined',
            velocity: velocity ? `${velocity.toFixed(2)}°/hr` : 'Unknown',
            direction: result.direction || 'Unknown',
            dopplerShift: dopplerShift ? dopplerShift.toFixed(6) : 'Unknown'
          }
        };
      });

      res.status(200).json(formattedResults);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}