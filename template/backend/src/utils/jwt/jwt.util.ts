import jwt from "jsonwebtoken";

export const signAccessToken = (sub: string) => {
  return jwt.sign({ sub }, process.env.JWT_ACCESS_TOKEN as string, {
    expiresIn: "10m",
  });
};

export const signRefreshToken = (sub: string, sid: string) => {
  return jwt.sign({ sub, sid }, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: "15d",
  });
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.JWT_REFRESH_TOKEN as string);
