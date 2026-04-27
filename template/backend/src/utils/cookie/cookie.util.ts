import type { Response } from "express";

export const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME as string;
export const REFRESH_COOKIE_PATH = process.env.REFRESH_COOKIE_PATH as string;

export const setRefreshCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: REFRESH_COOKIE_PATH,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};

export const clearRefreshCookie = (res: Response) => {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: REFRESH_COOKIE_PATH,
  });
};
