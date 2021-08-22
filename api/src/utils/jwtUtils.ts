import jwt from "jsonwebtoken";

export const generateTokenForUser = (email: string) =>
  jwt.sign(
    {
      sub: email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "4h",
    }
  );
