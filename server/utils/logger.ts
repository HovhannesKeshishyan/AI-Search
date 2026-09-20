type LogMeta = Record<string, unknown>;

const serializeError = (error: unknown) => {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack, cause: error.cause };
  }
  return { value: error };
};

const write = (
  level: "info" | "warn" | "error",
  message: string,
  meta?: LogMeta
) => {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  });

  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
};

export const logger = {
  info: (message: string, meta?: LogMeta) => write("info", message, meta),
  warn: (message: string, error?: unknown, meta?: LogMeta) =>
    write("warn", message, { ...meta, error: serializeError(error) }),
  error: (message: string, error?: unknown, meta?: LogMeta) =>
    write("error", message, { ...meta, error: serializeError(error) }),
};
