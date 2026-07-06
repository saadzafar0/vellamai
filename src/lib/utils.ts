export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Robustly extract and parse a JSON value from an LLM response string.
 * Handles markdown code fences (```json ... ```) and any leading/trailing prose.
 * Throws a descriptive error if no valid JSON object or array is found.
 */
export function parseJsonFromLLM<T = unknown>(raw: string): T {
  let text = raw.trim();

  // Strip ```json ... ``` or ``` ... ``` fences
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }

  // Try the whole text first
  try {
    return JSON.parse(text) as T;
  } catch {
    // Fall through to substring search
  }

  // Find first { or [ and attempt to parse from there
  const objStart = text.indexOf("{");
  const arrStart = text.indexOf("[");
  const start =
    objStart === -1 ? arrStart :
    arrStart === -1 ? objStart :
    Math.min(objStart, arrStart);

  if (start !== -1) {
    const isObject = text[start] === "{";
    const openChar = isObject ? "{" : "[";
    const closeChar = isObject ? "}" : "]";
    
    let count = 0;
    let end = -1;
    let inString = false;
    let escape = false;

    for (let i = start; i < text.length; i++) {
      const char = text[i];
      if (escape) {
        escape = false;
        continue;
      }
      if (char === "\\") {
        escape = true;
        continue;
      }
      if (char === '"') {
        inString = !inString;
        continue;
      }
      if (!inString) {
        if (char === openChar) {
          count++;
        } else if (char === closeChar) {
          count--;
          if (count === 0) {
            end = i;
            break;
          }
        }
      }
    }

    if (end !== -1) {
      const candidate = text.slice(start, end + 1);
      try {
        return JSON.parse(candidate) as T;
      } catch {
        // Fall through to error
      }
    }
  }

  throw new SyntaxError(
    `parseJsonFromLLM: could not extract valid JSON from LLM output.\nRaw output (first 300 chars): ${raw.slice(0, 300)}`
  );
}
