import { SessionType } from "@/types/models/account.type";
import { hashValue } from "@/utils/bcrypt/bcrypt.util";
import type { Request } from "express";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

export const buildSession = async (
  req: Request,
  refreshTokenRaw: string,
  sid: string,
): Promise<SessionType> => {
  const ip = req.ip;
  const geo = ip ? (geoip.lookup(ip) ?? undefined) : undefined;

  const uaString = req.get("user-agent") ?? "";
  const userAgent = new UAParser(uaString).getResult();

  return {
    sid,
    ip,
    geo,
    userAgent,
    token: await hashValue(refreshTokenRaw),
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  };
};
