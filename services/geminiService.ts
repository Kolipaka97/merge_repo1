import { MarketResearchResult, ProjectInput } from "../types";

const API_KEY = process.env.API_KEY || '';
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemma-3-27b-it:free";
const SITE_URL = window.location.origin;
const SITE_NAME = "Feasibly.AI";

async function callOpenRouter(messages: any[]) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenRouter API Error:", response.status, errorText);
    throw new Error(`AI Service Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

// 1. FAST AI: Initial Quick Scan
export const runQuickScan = async (input: ProjectInput): Promise<string> => {
  try {
    const prompt = `
      You are a senior project analyst. Provide a concise, 2-sentence initial impression 
      of the feasibility of this project idea. Be direct and realistic.
      
      Project: ${input.name}
      Description: ${input.description}
      Industry: ${input.industry}
      Budget: ${input.budget}
    `;

    const responseText = await callOpenRouter([
      { role: "user", content: prompt }
    ]);

    return responseText || "Could not generate quick scan.";
  } catch (error) {
    console.error("Quick scan error:", error);
    throw error;
  }
};

// 2. MARKET RESEARCH
// Note: Gemma 3 via OpenRouter does not support the live 'googleSearch' tool natively in the same way.
// We will ask it to use its internal knowledge base.
export const runMarketResearch = async (input: ProjectInput): Promise<MarketResearchResult> => {
  try {
    const prompt = `
      You are a market research expert. Based on your knowledge, analyze general market trends, 
      competitor landscape, and potential factors relevant to the feasibility of this project.
      Summarize the key findings in 3 bullet points.
      
      Project: ${input.name}
      Industry: ${input.industry}
      Description: ${input.description}
    `;

    const responseText = await callOpenRouter([
      { role: "user", content: prompt }
    ]);

    return {
      summary: responseText || "No market data generated.",
      sources: [], // OpenRouter standard chat completion doesn't return grounding sources
    };
  } catch (error) {
    console.error("Market research error:", error);
    throw error;
  }
};

// 3. DEEP ANALYSIS
export const runDeepAnalysis = async (input: ProjectInput, marketContext: string): Promise<string> => {
  try {
    const prompt = `
      Conduct a comprehensive Feasibility Analysis Report for the following project.
      
      PROJECT DETAILS:
      Name: ${input.name}
      Industry: ${input.industry}
      Description: ${input.description}
      Budget: ${input.budget}
      Timeline: ${input.timeline}
      
      MARKET CONTEXT:
      ${marketContext}
      
      Your task is to provide a detailed analysis of the viability of this project.
      Structure the report in Markdown with the following sections:
      1. Executive Summary
      2. Market Feasibility
      3. Technical/Operational Feasibility
      4. Financial Viability & Budget Analysis
      5. Risk Assessment (SWOT Analysis)
      6. Final Recommendation & Score (0-100)
    `;

    const responseText = await callOpenRouter([
      { role: "user", content: prompt }
    ]);

    return responseText || "Could not generate deep analysis.";
  } catch (error) {
    console.error("Deep analysis error:", error);
    throw error;
  }
};
