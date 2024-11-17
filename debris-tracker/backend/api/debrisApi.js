// debrisApi.js
import { connectionPool } from "../server/database.js";

export async function getDebrisList(req, res) {
  try {
    const query = `
      SELECT 
        DebrisID as id,
        Name as name,
        Description as description,
        DiscoveryDateTime,
        Location as location,
        Velocity as velocity,
        Direction as direction,
        DopplerShift as dopplerShift,
        (
          SELECT COUNT(DISTINCT o2.DebrisID)
          FROM observations o1
          JOIN observations o2 ON 
            ABS(o1.RightAscensionHours - o2.RightAscensionHours) <= 1
            AND ABS(o1.DeclinationDegrees - o2.DeclinationDegrees) <= 1
            AND o1.DebrisID != o2.DebrisID
          WHERE o1.DebrisID = debris.DebrisID
        ) as affectedSatellites
      FROM debris
      ORDER BY DiscoveryDateTime DESC
    `;

    connectionPool.query(query, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Error fetching debris data" });
      }

      // Format the timestamp for each debris object
      const formattedResults = results.map(debris => ({
        ...debris,
        timestamp: new Date(debris.DiscoveryDateTime).toLocaleString()
      }));

      res.status(200).json(formattedResults);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}