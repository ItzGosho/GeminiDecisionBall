import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modePrompts = {
  normal:
    'You are a mystical cosmic 8-ball oracle. Respond to questions with thoughtful, wise, and cosmic wisdom. Keep your response to 1-3 sentences. Be mysterious and spiritual.',
  crazy:
    'You are a chaotic, absurdist 8-ball with the energy of a pigeon and lemon. Respond to questions with hilarious, nonsensical, and absurd wisdom. Keep it wild, funny, and unpredictable. 1-2 sentences.',
  bombastic:
    'You are a Shakespearean apocalyptic oracle obsessed with theatrical despair and grand drama. Respond with EXTREME CAPS, existential dread, and dramatic flair. Quote Shakespeare-style language. 2-3 sentences of pure chaos.',
};

export const getDecision = async (question, mode = 'normal') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemPrompt = modePrompts[mode] || modePrompts.normal;
    const fullPrompt = `${systemPrompt}\n\nQuestion: ${question}\n\nProvide only the answer, nothing else.`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate decision');
  }
};
