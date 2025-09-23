import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Account, Transaction, Goal, Investment, Todo } from "../types";

const API_KEY = "AIzaSyCHe9mX6zarWyfCitBmEdVHn5UlS35JS7o";

if (!API_KEY) {
  console.warn("API_KEY not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });


interface FinancialContext {
  accounts: Account[];
  transactions: Transaction[];
  goals: Goal[];
  investments: Investment[];
  todos: Todo[];
}

export async function getFinancialAdvice(
  prompt: string,
  context: FinancialContext
): Promise<string> {
  if (!API_KEY) {
    return "The AI assistant is currently unavailable. Please configure the API key.";
  }

  const model = "gemini-2.5-flash";

  const systemInstruction = `You are Dhanitra AI, a helpful and friendly financial assistant. 
Your primary role is to answer user questions based on the financial data provided in the prompt.
Analyze the JSON data which includes accounts, transactions, goals, investments, and a to-do list.
Be concise and clear in your answers. Format your responses in plain text only (no bold, no italics).
If a user asks to perform an action (e.g., "add a transaction"), respond with a structured JSON object that the application can parse. 
The JSON object should have an 'action' key and a 'payload' key.
Supported actions are: 'addTransaction', 'addGoal', 'addTodo'.
For 'addTransaction', the payload should include 'description', 'amount', and 'category'. The amount for expenses should be negative.
For 'addGoal', the payload should include 'name', 'targetAmount', and 'deadline'.
For 'addTodo', the payload should include 'task'.
If the user asks a general question, provide a helpful text response.
Today's date is ${new Date().toLocaleDateString()}.
`;

  const fullPrompt = `
${systemInstruction}

Contextual Financial Data:
${JSON.stringify(context, null, 2)}

User's Request:
"${prompt}"
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: 0.2,
      },
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response generated.";
    text = text.replace(/\*\*(.*?)\*\*/g, "$1");
    text = text.replace(/\*(.*?)\*/g, "$1"); 

    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry I can't answer your question 😔";
  }
}
