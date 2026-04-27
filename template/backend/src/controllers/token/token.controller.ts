// Labraries
import { Request, Response } from "express";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
// Types
import { SessionType } from "@/types/models/account.type";
// Models
import Account from "@/models/account/account.model";
// Service
import { pullExpiredSessionsS } from "@/services/token/token.service";
// Utils
import { compareHashed, hashValue } from "@/utils/bcrypt/bcrypt.util";
import {
  clearRefreshCookie,
  REFRESH_COOKIE_NAME,
  setRefreshCookie,
} from "@/utils/cookie/cookie.util";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt/jwt.util";

export const refreshToken = async (req: Request, res: Response) => {
  // Success response helper (always 200)
  const ok = (message: string, accessToken: string) =>
    res.status(200).json({ message, accessToken });

  // Failure response helper (always 200 + null accessToken for errors)
  const fail = (message: string) =>
    res.status(200).json({ message, accessToken: null });

  // Read refresh token from cookie
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!token) return fail("Missing refresh token.");

  // Expected refresh token payload: user id (sub) + session id (sid)
  let payload: { sub: string; sid: string };

  try {
    // Verify refresh token signature/expiry and extract payload
    payload = verifyRefreshToken(token) as { sub: string; sid: string };
  } catch {
    // If refresh token is invalid/expired, clear cookie and return a soft-fail
    clearRefreshCookie(res);
    return fail("Invalid refresh token.");
  }

  // Cleanup any expired sessions for this user so sessions don't accumulate
  await pullExpiredSessionsS(payload.sub);

  // Load the account and include sessions.token (often excluded by default)
  const account = await Account.findById(payload.sub)
    .select("+sessions.token")
    .exec();

  // If the user no longer exists, clear cookie and fail
  if (!account) {
    clearRefreshCookie(res);
    return fail("Unauthorized.");
  }

  // Find the session that matches the refresh token's session id
  const session = account.sessions?.find(
    (s: SessionType) => s.sid === payload.sid,
  );

  // If session doesn't exist, force re-login (cookie cleared)
  if (!session) {
    clearRefreshCookie(res);
    return fail("Session not found. Please login again.");
  }

  // Extra safety: if session has an expiresAt and it's already past, revoke it
  if (session.expiresAt && new Date(session.expiresAt).getTime() < Date.now()) {
    // Remove the expired session from the user's sessions array
    await Account.updateOne(
      { _id: payload.sub },
      { $pull: { sessions: { sid: payload.sid } } },
    ).exec();

    // Clear cookie and ask user to login again
    clearRefreshCookie(res);
    return fail("Session expired. Please login again.");
  }

  // Compare the cookie refresh token vs the hashed token stored in the session
  const matches = await compareHashed(token, session.token);

  // If token doesn't match, revoke the session (prevents stolen/rotated token use)
  if (!matches) {
    await Account.updateOne(
      { _id: payload.sub },
      { $pull: { sessions: { sid: payload.sid } } },
    ).exec();

    clearRefreshCookie(res);
    return fail("Refresh token mismatch. Please login again.");
  }

  // Issue new tokens (access token for auth header; refresh token for cookie)
  const newAccessToken = signAccessToken(payload.sub);
  const newRefreshToken = signRefreshToken(payload.sub, payload.sid);

  // Hash the new refresh token before storing (so DB never stores raw token)
  const newHashedRefresh = await hashValue(newRefreshToken);

  // Capture current request metadata (used for session monitoring/security)
  const ip = req.ip;
  const geo = ip ? (geoip.lookup(ip) ?? undefined) : undefined;
  const uaString = req.get("user-agent") ?? "";
  const userAgent = new UAParser(uaString).getResult();

  // Persist rotated refresh token + extend expiry + update device metadata
  await Account.updateOne(
    { _id: payload.sub, "sessions.sid": payload.sid },
    {
      $set: {
        "sessions.$.token": newHashedRefresh,
        "sessions.$.expiresAt": new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        "sessions.$.ip": ip,
        "sessions.$.geo": geo,
        "sessions.$.userAgent": userAgent,
      },
    },
  ).exec();

  // Set the new refresh token cookie (rotating cookie)
  setRefreshCookie(res, newRefreshToken);

  // Return the new access token to the frontend
  return ok("Token refreshed.", newAccessToken);
};
