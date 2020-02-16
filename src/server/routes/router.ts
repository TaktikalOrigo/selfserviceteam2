import { Express } from "express";
import { handleGetHelloWorld } from "~/server/routes/getHelloWorldRoute";
import { handleGetTestDataBySsn } from "~/server/routes/getTestDataBySsnRoute";
import { handleGetPerson } from "~/server/routes/getPersonRoute";
import { handleUpdatePerson } from "~/server/routes/UpdatePersonRoute";
import { handlePostResetDB } from "~/server/routes/postResetDbRoute";

export function setApiRoutes(server: Express) {
  server.get ("/api/helloWorld", handleGetHelloWorld);
  server.get ("/api/testPerson/:ssn", handleGetTestDataBySsn);
  server.get ("/api/person/:ssn", handleGetPerson);
  server.put ("/api/person/:ssn", handleUpdatePerson);
  server.post ("/api/db/reset", handlePostResetDB);
}
