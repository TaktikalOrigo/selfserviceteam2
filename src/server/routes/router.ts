import { Express } from "express";
import { handleGetHelloWorld } from "~/server/routes/getHelloWorldRoute";

export function setApiRoutes(server: Express) {
  server.get ("/api/helloWorld", handleGetHelloWorld);
}
