## **Vellam:** Agentic Post Generator 

Comprehensive App Blueprint & Architecture 

## **1. Ollama Cloud Free Tier Overview** 

The free tier is highly capable for development and moderate daily usage, especially for a post generator utilizing short prompts and single-post generation. 

- **Limits:** Session limits reset every 5 hours; weekly limits reset every 7 days. 

- **Measurement:** Usage is measured by **GPU time** , not tokens. Heavier models consume quota faster. 

- **Access:** The API is accessible at `https://ollama.com/api/chat` using `Authorization: Bearer $OLLAMA_API_KEY` . 

- **Compatibility:** Acts as an OpenAI-compatible endpoint, allowing seamless integration with most OpenAI SDKs. 

- **Best Practices:** Stick to Level 1 and Level 2 models (e.g., `gemma3:12b` or `gpt-oss:20b` ). Utilize shorter prompts and shared cached context to stretch your quota. 

## **2. Tech Stack** 

|**Layer**|**Choice**|**Why**|
|---|---|---|
|**Frontend**|Next.js 14 App Router|SSE streaming, Server Actions|
|**Agent Orchestration**|LangChain.js + LangGraph|TypeScript-native, stateful graph|
|**LLM**|Ollama Cloud free tier|Free, OpenAI-compatible API|
|**Image Generation**|Pollinations AI|Truly free, no API key needed|
|**API Route**|Next.js Route Handler|Streams agent steps to the UI|



## **3. How LangChain.js Connects to Ollama Cloud** 

Use the `@langchain/ollama` integration package. Ollama also 

supports `.withStructuredOutput()` , allowing you to force the model to return typed JSON without regex parsing. 

```
import { ChatOllama } from "@langchain/ollama";
const llm = new ChatOllama({
  baseUrl: "https://ollama.com", // Points to Ollama Cloud
  model: "gemma3:12b",
  headers: { Authorization: `Bearer ${process.env.OLLAMA_API_KEY}` },
  temperature: 0.7,
});
```

## **4. The Five-Agent Pipeline in Detail** 

## **Agent 1: Research & Strategy Planner** 

- **Input:** Raw topic string (e.g., _"AI-Powered Human Resource Automation"_ ). 

- **Action:** Expands the topic into a structured strategy. Identifies the audience, core pain points, 

- emotional angle, platform, and trending industry angles. 

- **Prompt Style:** System prompt defines agency voice/B2B context. Enforced via Zod schema. 

## **Output (JSON):** 

```
{
```

```
  "targetAudience": "string",
  "painPoints": ["string"],
  "emotionalAngle": "string",
  "platform": "LinkedIn | Instagram | Twitter",
  "trendingAngles": ["string"],
  "tone": "professional | conversational | urgent"
}
```

## **Agent 2: Content Writer** 

- **Input:** Strategy JSON from Agent 1. 

- **Action:** Writes the post copy in three parts: Hook, Body (3-5 sentences), and CTA. 

- **Prompt Style:** Includes examples of strong, problem-first B2B hooks. 

## **Output (JSON):** 

```
{
  "hook": "string",       // Most important, reviewed by critic
  "body": "string",
  "cta": "string",
  "fullCaption": "string"
}
```

## **Agent 3: SEO & Engagement Optimizer** 

- **Input:** Content JSON (Agent 2) + Strategy JSON (Agent 1). 

- **Action:** Trims caption to platform limits, adds 5-8 relevant hashtags, checks hook patterns, and adds engagement triggers. 

## **Output (JSON):** 

```
{
  "optimizedCaption": "string",
  "hashtags": ["string"],
  "characterCount": 0,
  "platform": "string"
}
```

## **Agent 4: Image Prompt Generator (Parallel)** 

- **Input:** Topic + Strategy + Caption. 

- **Action:** Converts context into a visual prompt optimized for Pollinations AI (Flux model). Leans toward clean corporate visuals and abstract tech imagery. 

## **Example Output (String):** 

_"Futuristic HR dashboard with holographic employee profiles, clean minimal design, blue and white palette, professional corporate setting, 4K render"_ 



## **5. Image Generation via Pollinations AI** 

Pollinations AI allows keyless, open-source image generation via a simple HTTP GET request. 

**==> picture [511 x 38] intentionally omitted <==**

_Tip: Set_ _`width=1080&height=1080` for square format, or_ _`1080x1920` for stories._ 

## **6. LangGraph State Machine Structure** 

The workflow relies on a LangGraph `StateGraph` with typed state, edges, and a conditional edge based on the Critic's score. 

```
START
  ↓
researchAgent
  ↓
contentWriter
  ↓
seoOptimizer
  ↓
  ├── imagePromptAgent (Parallel)
```

```
          ↓
    postAssembler
```

```
          ↓
         END
```

## **Agent 5: Post Assembler** 

- **Input:** Optimized caption + hashtags + image URL + critic score. 

- **Action:** Merges the data and returns the final post object to the UI. 

## **Output (JSON):** 

```
{
  "imageUrl": "string",
  "caption": "string",
  "hashtags": ["string"],
  "platform": "string",
  "qualityScore": 0,
  "generatedAt": "string"
}
```

## **7. Next.js Integration** 

1. **User Interface:** A single page with a topic input and a "Generate" button. 

2. **API Route:** Hits `/api/generate` (Next.js Route Handler). 

3. **Streaming:** Streams agent step updates using Server-Sent Events (SSE). 

4. **Display:** Shows a live progress indicator. Once complete, renders a post card using Next.js `<Image>` , clickable hashtag pills, and a copy button. 

## **8. Suggested Build Order** 

1. **Single Chain:** Get Ollama Cloud responding end-to-end (no graph, no critic). 

2. **Structured Output:** Enforce JSON formatting. 

3. **Agent Split:** Separate into named agents. 

4. **Visuals:** Add the image prompt agent and Pollinations AI call. 

5. **LangGraph:** Implement the graph last to handle the retry loop and state management. 

