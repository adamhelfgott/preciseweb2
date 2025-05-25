import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { NextResponse } from "next/server";

// Create an OpenAI API client (edge-compatible)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Extract the `messages` and `context` from the body of the request
    const { messages, context } = await req.json();

    // If no API key is configured, return a helpful message
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.",
        setupInstructions: {
          local: "Add OPENAI_API_KEY to your .env.local file",
          vercel: "Add OPENAI_API_KEY in Vercel project settings under Environment Variables"
        }
      }, { status: 500 });
    }

    // Build the system prompt based on user context
    const systemPrompt = context?.userRole === "DATA_OWNER" 
      ? `You are an AI assistant for Precise.ai, helping data owners maximize the value of their data assets. 
         You have access to their dashboard showing:
         - Real-time earnings and attribution data
         - Data usage analytics and campaign performance
         - Privacy metrics and compliance status
         - Market demand and pricing recommendations
         
         The user's data is contributing to ${context.activeCampaigns || 0} campaigns and earning ${context.monthlyEarnings || 0} in credits.
         Provide helpful insights about data monetization, privacy-preserving collaboration, and optimization opportunities.`
      : `You are an AI assistant for Precise.ai, helping media buyers and ad ops managers optimize their campaigns.
         You have access to their campaign data showing:
         - Campaign performance metrics (CTR, CVR, CAC, ROAS)
         - Budget pacing and optimization opportunities
         - Audience insights and attribution data
         - Creative performance and fatigue indicators
         
         Current portfolio: ${context.totalCampaigns || 0} campaigns with average ROAS of ${context.avgROAS || 0}.
         Provide actionable insights about campaign optimization, budget allocation, and data collaboration benefits.`;

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      stream: true,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("AI API Error:", error);
    
    // Return user-friendly error messages
    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json({
        error: "OpenAI API key is invalid or not configured properly.",
        setupInstructions: {
          local: "Add OPENAI_API_KEY to your .env.local file",
          vercel: "Add OPENAI_API_KEY in Vercel project settings under Environment Variables"
        }
      }, { status: 500 });
    }
    
    return NextResponse.json({
      error: "Failed to process AI request. Please try again.",
    }, { status: 500 });
  }
}