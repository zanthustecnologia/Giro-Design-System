import { appendFileSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { dirname, join } from 'path';

// Opt-in only: nothing is logged or sent anywhere unless the dev explicitly
// sets one of these env vars. No tool arguments or results are recorded —
// only the tool name, timestamp, duration and success flag.
const LOG_PATH =
  process.env.GIRO_MCP_USAGE_LOG ??
  (process.env.GIRO_MCP_TELEMETRY === '1'
    ? join(homedir(), '.giro-ds', 'mcp-usage.jsonl')
    : null);

export function withUsageLogging<Args extends unknown[], R>(
  toolName: string,
  handler: (...args: Args) => Promise<R>,
): (...args: Args) => Promise<R> {
  if (!LOG_PATH) return handler;

  return async (...args: Args) => {
    const startedAt = Date.now();
    try {
      const result = await handler(...args);
      appendLog(toolName, Date.now() - startedAt, true);
      return result;
    } catch (error) {
      appendLog(toolName, Date.now() - startedAt, false);
      throw error;
    }
  };
}

function appendLog(toolName: string, durationMs: number, success: boolean): void {
  try {
    mkdirSync(dirname(LOG_PATH as string), { recursive: true });
    const line = JSON.stringify({
      tool: toolName,
      timestamp: new Date().toISOString(),
      durationMs,
      success,
    });
    appendFileSync(LOG_PATH as string, `${line}\n`);
  } catch {
    // telemetry must never break the actual tool call
  }
}
