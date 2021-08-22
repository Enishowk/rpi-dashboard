import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const parseToken = (jwtToken: string | undefined) => {
  return jwtToken ? jwtToken.replace("Bearer ", "") : null;
};

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

export const checkJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = parseToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (payload.sub !== "admin") {
      return res.status(403).json({ error: "Unauthorized." });
    }

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).send({ error: "Token expiré." });
    }
    return res.status(403).send({ error: "Unauthorized." });
  }
};
