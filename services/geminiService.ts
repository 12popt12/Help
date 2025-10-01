import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';
import { GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBetaResponse = async (
  prompt: string
): Promise<{ text: string; sources: GroundingSource[] }> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, sources: sources as GroundingSource[] };
  } catch (error) {
    console.error('Error in generateBetaResponse:', error);
    throw new Error('ERROR_BETA_RESPONSE');
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error('ERROR_IMAGE_GENERATION');
    }
  } catch (error) {
    console.error('Error in generateImage:', error);
    throw new Error('ERROR_IMAGE_GENERATION');
  }
};

export const getChatSession = (systemInstruction: string): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        }
    });
};


export const getChatResponse = async (chat: Chat, prompt: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    throw new Error('ERROR_CHAT_RESPONSE');
  }
};