export function ensureJwtSecret(): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    const err = new Error(
      "JWT_SECRET is not configured on the server",
    ) as Error & { status?: number };
    err.status = 500;
    throw err;
  }
  return jwtSecret;
}
