import jwt from "jsonwebtoken";

export const generateTokenForUser = (login: string) =>
  jwt.sign(
    {
      sub: login,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "4h",
    }
  );
