import { registerEnv } from "@taktikal/env";
import { PrivateEnv, PublicEnv } from "~/constants";
import { defaultEnv } from "~/config/defaultEnv";

registerEnv({ private: PrivateEnv, public: PublicEnv }, defaultEnv);
