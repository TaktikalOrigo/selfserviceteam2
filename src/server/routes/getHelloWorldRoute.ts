import { Handler } from "express";

export const handleGetHelloWorld: Handler = (_req, res) => {
  res.json({ message: "Hello world" });
}