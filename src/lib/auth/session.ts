import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "hlh_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.SESSION_SECRET || "dev-session-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function validateAdminCredentials(input: {
  password: string;
}) {
  const password = process.env.ADMIN_PASSWORD || "change";
  return input.password === password;
}

export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `admin:${expiresAt}`;
  return `${payload}:${sign(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [role, expiresAt, signature] = parts;
  const payload = `${role}:${expiresAt}`;
  const isValidSignature = safeEqual(signature, sign(payload));
  const isFresh = Number(expiresAt) > Date.now();
  const isAdminRole = role === "admin";

  return isValidSignature && isFresh && isAdminRole;
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export { COOKIE_NAME };
