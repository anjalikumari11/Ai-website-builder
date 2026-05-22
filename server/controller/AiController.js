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
You are an expert AI Website Builder and Creative UI/UX Designer.

Generate a COMPLETE, modern, responsive, and visually stunning website in pure HTML, CSS, and JavaScript based on the business details provided below.

Business Details:
- Business Name: ${businessName}
- Business Type: ${businessType}
- Description: ${description}
- Theme: ${theme}
- Style: ${style}

Requirements:
1. Generate a fully designed website with:
   - Hero Section
   - About Section
   - Services/Features Section
   - Testimonials
   - Gallery or Showcase Section
   - Contact Section
   - Footer

2. Design Rules:
   - Use modern UI/UX principles
   - Make the design visually premium and professional
   - Add gradients, animations, hover effects, shadows, cards, glassmorphism, or neumorphism where suitable
   - Use beautiful typography and spacing
   - Ensure responsive mobile-friendly layout
   - Add smooth scrolling and subtle animations
   - Match colors, layout, and visuals with the provided theme and style

3. Content Rules:
   - Generate realistic and high-quality business content
   - Create catchy headings and professional descriptions
   - Use engaging CTA buttons
   - Make the website look production-ready

4. Technical Rules:
   - Return a SINGLE complete HTML file
   - Include all CSS inside <style> tags
   - Include all JavaScript inside <script> tags
   - Do NOT use external frameworks
   - Use semantic HTML structure
   - Add icons using Font Awesome CDN if needed
   - Use placeholder images from https://images.unsplash.com when required

5. Output Rules:
   - Return ONLY valid HTML
   - Do NOT return markdown
   - Do NOT add explanations
   - Do NOT wrap code inside triple backticks
   - Start directly with <!DOCTYPE html>
   

The generated website should feel like a premium real-world business website created by an expert designer and developer.
`;

    const aiResponse = await generateAIContent(prompt);

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

    res.status(200).send(cleanResponse);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};