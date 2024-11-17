import { connectionPool } from "../server/database.js";

export async function insertObservation(req, res) {
  try {
    const {
      ObservationDateTime,
      RightAscensionHours,
      RightAscensionMinutes,
      RightAscensionSeconds,
      DeclinationDegrees,
      DeclinationMinutes,
      DeclinationSeconds,
      DeclinationDirection,
      AngleAboveHorizon,
      Azimuth
    } = req.body;

    const query = `
      INSERT INTO observations (
        DebrisID,
        UserID,
        ObservationDateTime,
        RightAscensionHours,
        RightAscensionMinutes,
        RightAscensionSeconds,
        DeclinationDegrees,
        DeclinationMinutes,
        DeclinationSeconds,
        DeclinationDirection,
        AngleAboveHorizon,
        Azimuth
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      2, // DebrisID always 2
      2, // UserID always 2
      ObservationDateTime,
      RightAscensionHours,
      RightAscensionMinutes,
      RightAscensionSeconds,
      DeclinationDegrees,
      DeclinationMinutes,
      DeclinationSeconds,
      DeclinationDirection,
      AngleAboveHorizon,
      Azimuth
    ];

    connectionPool.query(query, values, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Error inserting data into database" });
      }

      res.status(201).json({
        message: "Observation data inserted successfully",
        observationId: results.insertId
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}