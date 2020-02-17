import { PrivateEnv, PublicEnv, IS_SERVER } from "~/constants";
import { AssertionError } from "assert";

if (!IS_SERVER) {
  throw new AssertionError({ message: "You should not import the default env on the client." });
}

export const defaultEnv: { [key in keyof (typeof PublicEnv & typeof PrivateEnv)]: string } = {
  ENVIRONMENT: "local",
  SITE_URL: "http://localhost:8080",
  DB_URL:
    "postgresql://sdfjsadfj0@selfserviceteam2:ZIPT_ract9rars@selfserviceteam2.postgres.database.azure.com/selfserviceteam2",
  DB_USE_SSL: "true",
};
