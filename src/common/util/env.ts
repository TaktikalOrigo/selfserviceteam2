import { createEnvGetters } from "@taktikal/env";
import { PublicEnv, PrivateEnv } from "~/constants";

export const { getPublicEnv, getPrivateEnv } = createEnvGetters({
  public: PublicEnv,
  private: PrivateEnv,
});
