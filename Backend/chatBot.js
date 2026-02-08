import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import dotenv from "dotenv";
dotenv.config();

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generate(userMessage) {
  const messages = [
    {
      role: "system",
      content:
        "You are a smart personal assistant who answers questions using tools when needed.",
    },
    {
      role: "user",
      content: userMessage,
    },
  ];

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    messages,
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description: "Search the latest information on the internet",
          parameters: {
            type: "object",
            properties: {
              query: { type: "string" },
            },
            required: ["query"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  const message = response.choices[0].message;

  // If model wants to call tool
  if (message.tool_calls) {
    messages.push(message);

    for (const toolCall of message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments);

      const result = await webSearch(args);

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        name: toolCall.function.name,
        content: result,
      });
    }

    const finalResponse = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,
      messages,
      tool_choice: "none",
    });

    return finalResponse.choices[0].message.content;
  }

  return message.content;
}

async function webSearch({ query }) {
  const response = await tvly.search(query);

  return response.results.map((result) => result.content).join("\n\n");
}
