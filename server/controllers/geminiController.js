// controllers/geminiController.js
const { getEnhancedText } = require("../services/geminiService");

const enhanceSection = async (req, res) => {
  try {
    const { section, data } = req.body;

    if (!section || !data) {
      return res.status(400).json({ error: "Missing section or data" });
    }

    const prompt = generatePrompt(section, data);
    console.log("🧠 Prompt being sent to Gemini:", prompt);

    const enhancedText = await getEnhancedText(prompt);

    // Just send raw text back for now
    res.status(200).json({ enhanced: enhancedText });
  } catch (err) {
    console.error("❌ Enhancement Error:", err.message || err);
    res.status(500).json({ error: "Something went wrong in enhanceSection" });
  }
};

const generatePrompt = (section, data) => {
  switch (section) {
    case "summary":
      return `
You are a professional resume writer. 
Your task is to rewrite the following summary to be concise (2-3 lines max), clear, and impactful for a software developer applying to top tech companies.

Instructions:
- Remove filler or vague phrases.
- Keep only the most impressive, relevant details.
- Output as 2 or 3 clean sentences, no bullet points or asterisks.
- Do NOT include quotes, brackets, or prefixes like 'Summary:'.

Original summary:
${data}
`;

    case "skills":
      return `
You are an ATS-optimized resume assistant.

Instructions:
- Rewrite the following skills into 3–4 clean bullet points, one per line.
- Group related skills and avoid redundancy.
- Be concise, remove outdated or generic terms.
- Do NOT wrap output in JSON or quotes.

Original skills:
${JSON.stringify(data)}
`;

    case "experience":
      return `
You are an expert resume formatter.

Instructions:
- Enhance this job experience to make it impactful and professional.
- Follow this format:
  Job Title @ Company
  Duration | Location
  • Bullet point 1 (start with action verb, describe achievement/impact)
  • Bullet point 2 (quantify results or explain role)
- Keep total 2–3 concise bullet points.
- Do NOT include any placeholders like [ ... ].
- Do NOT wrap the output in JSON or quotes.

Original experience:
${JSON.stringify(data)}
`;

    case "education":
      return `
Polish this education section to look professional and formatted for a resume.

Instructions:
- Include degree, institution, location, and duration.
- Use line breaks between institution, duration, and location if needed.
- Do NOT wrap it in quotes or JSON.

Original education:
${JSON.stringify(data)}
`;

    default:
      return `Improve this resume section:\n${JSON.stringify(data)}`;
  }
};

module.exports = { enhanceSection };
