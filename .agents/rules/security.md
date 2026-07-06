# Security Rules

This document outlines key security guidelines for the Vellam project.

## Secret Management
- **Environment Variables**: Sensitive configuration (like `OLLAMA_API_KEY` and custom `OLLAMA_BASE_URL`) must be loaded from `.env.local`. 
- **Git Safety**: Never check `.env.local` or raw API keys into git. Ensure `.gitignore` continues to exclude `.env.local`.
- **API Endpoints**: Local Ollama endpoints must be configured via `OLLAMA_BASE_URL=http://localhost:11434`. Never hardcode fallback URLs that expose local generation targets to external public endpoints (do not use `https://ollama.com` in production configurations).

## Input Validation and Parsing
- **API Payload Validation**: The API endpoint must validate client payloads before processing. Trim and reject empty topics:
  ```typescript
  if (!topic?.trim()) {
    return Response.json({ error: "Topic is required" }, { status: 400 });
  }
  ```
- **LLM Content Security**: Models can return unstructured text or unexpected payloads. To prevent payload corruption, always use Zod schema validation (e.g. `zodSchema.parse(...)`) to enforce rigid output structures before passing the state downstream.
