# Vellam

AI-powered social post generator built with Next.js and LangGraph.

## Requirements

- Node.js ≥ 22.13
- [pnpm](https://pnpm.io/) — **this project uses pnpm only.** Do not use npm or yarn.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create `.env.local` in the project root and set your Ollama API key:

```
OLLAMA_API_KEY=your_key_here
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

All commands must be run with pnpm:

| Command       | Description              |
| ------------- | ------------------------ |
| `pnpm dev`    | Start dev server         |
| `pnpm build`  | Production build         |
| `pnpm start`  | Start production server  |
| `pnpm lint`   | Run ESLint               |

## Project Structure

```
src/
├── app/              # routes only
├── components/       # UI and post-generator components
├── lib/agents/       # LangGraph pipeline
├── hooks/            # client hooks
└── types/            # shared types
```
