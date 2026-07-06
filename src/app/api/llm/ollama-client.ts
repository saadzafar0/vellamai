import { ChatOllama } from "@langchain/ollama";

export function createOllamaClient() {
  return new ChatOllama({
    model: "gpt-oss:120b",
    baseUrl: process.env.OLLAMA_BASE_URL ?? "https://ollama.com",
    headers: process.env.OLLAMA_API_KEY
      ? { Authorization: `Bearer ${process.env.OLLAMA_API_KEY}` }
      : undefined,
  });
}
