import { Express } from "express";
import { handleGetHelloWorld } from "~/server/routes/getHelloWorldRoute";
import { handleGetPerson } from "~/server/routes/getPersonRoute";
import { handleUpdatePerson } from "~/server/routes/UpdatePersonRoute";
import { handlePostResetDB } from "~/server/routes/postResetDbRoute";
import { handleGetApplicationData } from "~/server/routes/getApplicationDataRoute";
import { handleGetExpectedBirthDate } from "~/server/routes/getExpectedBirthDate";

export function setApiRoutes(server: Express) {
  server.get ("/api/helloWorld", handleGetHelloWorld);
  server.get ("/api/person/:ssn/applicationData", handleGetApplicationData);
  server.get ("/api/person/:ssn/expectedBirthDate", handleGetExpectedBirthDate);
  server.get ("/api/person/:ssn", handleGetPerson);
  server.put ("/api/person/:ssn", handleUpdatePerson);
  server.post ("/api/db/reset", handlePostResetDB);
}
