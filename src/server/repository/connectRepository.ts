import { createConnection } from "typeorm";
import { Application } from "~/server/entities/Application";
import { Person } from "~/server/entities/Person";
import { ApplicationTime } from "~/server/entities/ApplicationTime";
import { getPrivateEnv } from "~/common/util/env";

export const connectRepository = async () => {
  console.log("Attempting to connect to repository");
  const connection = await createConnection({
    type: "postgres",
    url: getPrivateEnv("DB_URL"),
    port: 5432,
    ssl: false,
    synchronize: true,
    entities: [Application, Person, ApplicationTime],
  });

  if (!connection.isConnected) {
    await connection.connect();
  }
  console.log("Successfully connected to repository");
};
