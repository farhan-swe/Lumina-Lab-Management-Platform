
import { GoogleGenAI } from "@google/genai";
import { Registration } from "../types";

export const geminiService = {
  generateQuickSummary: async (reg: Registration): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a professional Lab Technician. Generate a professional greeting and brief summary for a patient named ${reg.patient.name} who just registered for the following tests: ${reg.tests.map(t => t.name).join(', ')}. Mention that their results will be ready by ${new Date(reg.deliveryDate).toDateString()}. Keep it professional, reassuring, and under 100 words.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      return response.text || "Thank you for choosing Lumina Lab. Your registration is complete.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Thank you for choosing Lumina Lab. Your health is our priority.";
    }
  }
};
