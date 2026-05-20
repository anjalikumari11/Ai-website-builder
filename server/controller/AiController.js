import { generateAIContent } from "../services/geminiService.js";

export const testAI = async (req, res) => {

  try {

    const {
      businessName,
      businessType,
      description,
      theme,
      style,
    } = req.body;

    const prompt = `
Generate website content in JSON format.

Business Name: ${businessName}
Business Type: ${businessType}
Description: ${description}
Theme: ${theme}
Style: ${style}

Return ONLY valid JSON.

{
  "heroTitle":"",
  "heroSubtitle":"",
  "about":"",
  "services":[]
}
`;

    const aiResponse =
      await generateAIContent(prompt);

    if (!aiResponse) {

      return res.status(500).json({
        success: false,
        message: "No AI response",
      });

    }

    const cleanResponse =
      aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "");

    res.status(200).json({
      success: true,
      body: cleanResponse
    })

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};