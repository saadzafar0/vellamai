# Code Style Rules

This document outlines the formatting, naming, and linting standards utilized in this project.

## Language and Types
- **TypeScript**: Strictly type all function signatures, component props, and state properties. Avoid using `any` or `unknown` where specific types can be modeled.
- **Shared Types**: Put shared data structures and types in `src/types/` (e.g. `src/types/sse-events.ts`).

## React Components
- **Arrow Functions**: Component declarations must use arrow functions:
  ```tsx
  export const TopicForm = () => { ... }
  ```
- **Forwarding Refs**: UI primitives and reusable input elements must use `forwardRef`:
  ```tsx
  export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => { ... })
  ```
- **Client Components**: Prefix files containing interactive state (event handlers, hooks, local state) with the `"use client"` directive at the very top. Server components should be used by default for non-interactive elements.

## Styling (Tailwind CSS v4)
- **Tailwind CSS v4**: All styles are parsed via `@import "tailwindcss"` inside `src/app/globals.css`. There is no `tailwind.config` file. Keep styling classes clean and consistent.
- **Class Merging**: The project uses `cn()` defined in `src/lib/utils.ts`.
  > [!IMPORTANT]
  > `cn()` is a simple class list builder (`classes.filter(Boolean).join(" ")`). It does **not** merge or resolve conflicting Tailwind classes (no `tailwind-merge` or `clsx`). Avoid conflicting tailwind classes on the same element; manual ordering or distinct condition blocks are required.

## Linting
- Run `pnpm lint` to check code health. Any PR or change must compile cleanly under ESLint rules.
