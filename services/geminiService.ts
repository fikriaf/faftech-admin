
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function generateProjectDescription(title: string): Promise<string | undefined> {
  if (!apiKey) {
    console.error("API Key not found");
    return "Please configure your API key in the environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a high-end, professional, and slightly futuristic description for a project titled "${title}". 
      Focus on innovation, technology stack, and user experience. 
      Keep it between 100-150 words. Format it as plain text.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating with Gemini:", error);
    return "Failed to generate description. Please check your API key and connection.";
  }
}

export async function summarizeLogs(logs: string): Promise<string | undefined> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following system logs into a single brief sentence focused on security and activity: ${logs}`,
    });
    return response.text;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
