import { PrivateEnv, PublicEnv, IS_SERVER } from "~/constants";
import { AssertionError } from "assert";

if (!IS_SERVER) {
  throw new AssertionError({ message: "You should not import the default env on the client." });
}

export const defaultEnv: { [key in keyof (typeof PublicEnv & typeof PrivateEnv)]: string } = {
  ENVIRONMENT: "local",
  SITE_URL: "http://localhost:8080",
};
