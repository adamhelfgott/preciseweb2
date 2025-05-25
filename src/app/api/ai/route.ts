import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

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
         
         Response Instructions:
         - Be extremely concise unless asked to explain in detail
         - Give direct answers in 1-2 sentences when possible
         - Use bullet points for multiple items
         - Only provide detailed explanations when specifically requested
         - Focus on actionable insights`
      : `You are an AI assistant for Precise.ai, helping media buyers and ad ops managers optimize their campaigns.
         
         You have access to their campaign data showing:
         - Campaign performance metrics (CTR, CVR, CAC, ROAS)
         - Budget pacing and optimization opportunities
         - Audience insights and attribution data
         - Creative performance and fatigue indicators
         
         Current portfolio: ${context.totalCampaigns || 0} campaigns with average ROAS of ${context.avgROAS || 0}.
         
         Response Instructions:
         - Be extremely concise unless asked to explain in detail
         - Give direct answers in 1-2 sentences when possible
         - Use bullet points for multiple items
         - Only provide detailed explanations when specifically requested
         - Focus on actionable insights`;

    // Use the new streamText API
    const result = await streamText({
      model: openai("gpt-4-turbo-preview"),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    // Return the stream
    return result.toDataStreamResponse();
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