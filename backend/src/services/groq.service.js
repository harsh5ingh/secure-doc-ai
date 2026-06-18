import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateSummary = async (text) => {
  const MAX_CHARS = 12000;
  const truncatedText = text.slice(0, MAX_CHARS);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages: [
      {
  role: "system",
  content: `
You are a professional document analysis assistant.

Provide output in this format:

## Summary
2-3 paragraphs

## Key Points
- point 1
- point 2
- point 3

## Important Takeaways
- takeaway 1
- takeaway 2
`,
},
      {
        role: "user",
        content: `Summarize the following document:

${truncatedText}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};