import {
  generateAIInsight,
  generateInsightFromContext,
} from "@/lib/openrouter";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, category, context, existingInsights } = body;

    if (!prompt && !context) {
      return NextResponse.json(
        { error: "Either prompt or context is required" },
        { status: 400 }
      );
    }

    let result;

    if (context) {
      // Generate insight based on context
      result = await generateInsightFromContext(
        context,
        existingInsights || []
      );
    } else {
      // Generate insight based on direct prompt
      result = await generateAIInsight(prompt, category || "General");
    }

    return NextResponse.json({
      success: true,
      insight: result,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI insight",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
