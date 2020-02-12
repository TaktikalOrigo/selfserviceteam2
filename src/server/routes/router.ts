import { Express } from "express";
import { handleGetHelloWorld } from "~/server/routes/getHelloWorldRoute";
import { handleGetTestDataBySsn } from "~/server/routes/getTestDataBySsnRoute";

export function setApiRoutes(server: Express) {
  server.get ("/api/helloWorld", handleGetHelloWorld);
  server.get ("/api/testPerson/:ssn", handleGetTestDataBySsn);
}
