import { pool } from "../db/db.js";
import { generateSummary } from "../services/groq.service.js";

export const summarizeDocument = async (req, res) => {
  try {

    const { documentId } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
    }

    const document = await pool.query(
  `
  SELECT content, summary
  FROM documents
  WHERE id = $1 AND user_id = $2
  `,
  [documentId, req.user.id]
);

    if (document.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const existingSummary = document.rows[0].summary;

if (existingSummary) {
  return res.status(200).json({
    success: true,
    summary: existingSummary,
    cached: true,
  });
}

    const content = document.rows[0].content;

    const summary = await generateSummary(content);

      await pool.query(
        `
        UPDATE documents
        SET summary = $1
        WHERE id = $2
        AND user_id = $3
        `,
        [summary, documentId, req.user.id]
      );

return res.status(200).json({
  success: true,
  summary,
  cached: false,
});
  } catch (error) {
  console.error("AI ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};