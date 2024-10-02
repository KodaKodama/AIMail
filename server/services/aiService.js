const { GoogleGenerativeAI } = require("@google/generative-ai");
const sanitizeContent = require("../utils/contentSanitizer");
const { AI_API_KEY } = require("../config/config");

// Initialize the generative AI client
const genAI = new GoogleGenerativeAI(AI_API_KEY);

// Function to generate content using Google Generative AI
async function generateStory(preference) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log('inside ai generrate');
        
        // Since the preference can be either a topic or subtopic, just use it in the prompt
        const prompt = `Write an article on ${preference}.`; 
        
        const result = await model.generateContent(prompt);
        const rawContent = result.response.text();
        console.log(rawContent);
        
        return sanitizeContent(rawContent);
  } catch (error) {
    console.error("Error generating content:", error);
    return "Failed to generate content"; 
  }
}

module.exports = { generateStory };
