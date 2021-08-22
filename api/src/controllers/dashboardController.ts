import { Request, Response } from "express";

const getRandomArbitrary = (min = 10, max = 30) =>
  Math.round(Math.random() * (max - min) + min);

export const getTemperatures = async (_req: Request, res: Response) => {
  const temperatures = [
    { createAt: "2021-08-01 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-02 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-03 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-04 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-05 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-06 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-07 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-08 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-09 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-10 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-11 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-12 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-13 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-14 12:00:00", value: getRandomArbitrary() },
    { createAt: "2021-08-15 12:00:00", value: getRandomArbitrary() },
  ];

  try {
    return res.json({ temperatures });
  } catch (error) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};
