const OPENROUTER_API_KEY =
  "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";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export async function generateAIInsight(prompt, category = "General") {
  try {
    const categoryEmojis = {
      Productivity: "⚡",
      Health: "💪",
      Learning: "📚",
      Mindfulness: "🧘",
      Relationships: "💝",
      Career: "🎯",
      General: "💡",
    };

    const emoji = categoryEmojis[category] || "💡";

    const userPrompt = `You are a helpful AI assistant. Generate a concise, actionable insight about: ${prompt}

Category: ${category}

FORMAT YOUR RESPONSE AS BULLET POINTS (3-4 points max) using these emojis based on the content:
• Use ✨ for key benefits or positive outcomes
• Use 🎯 for specific action steps or goals
• Use 💡 for tips or recommendations  
• Use ⚠️ for important warnings or considerations
• Use 🔑 for key takeaways

Example format:
✨ [First key point about the benefit]
🎯 [Specific action or recommendation]
💡 [Helpful tip or insight]

Keep each point concise (one sentence). Be practical and actionable.`;

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meituan/longcat-flash-chat:free",
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenRouter API error: ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from OpenRouter API");
    }

    const generatedContent = data.choices[0].message.content.trim();

    // Generate a title from the first sentence or create one
    const title =
      generatedContent.split(".")[0].substring(0, 50) +
      (generatedContent.split(".")[0].length > 50 ? "..." : "");

    return {
      title: title || `AI Insight: ${category}`,
      content: generatedContent,
      category: category,
      generated: true,
    };
  } catch (error) {
    console.error("Error generating AI insight:", error);
    throw new Error(`Failed to generate AI insight: ${error.message}`);
  }
}

export async function generateInsightFromContext(
  context,
  existingInsights = []
) {
  try {
    const contextPrompt = `Based on this context: "${context}"

And considering these existing insights: ${existingInsights
      .map((i) => i.title)
      .join(", ")}

Generate a new, unique insight that complements the existing ones. Focus on providing value that hasn't been covered yet.`;

    return await generateAIInsight(contextPrompt, "Contextual");
  } catch (error) {
    console.error("Error generating contextual insight:", error);
    throw error;
  }
}
