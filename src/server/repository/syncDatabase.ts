import "~/config/configServer";

import { getConnection, getRepository, createConnection } from "typeorm";
import { handleError } from "@taktikal/error";
import { Application } from "~/server/entities/Application";
import { Person } from "~/server/entities/Person";
import { testDataPersonList } from "~/server/data/testPersonData";
import { PersonFields } from "~/types";
import { getPrivateEnv } from "~/common/util/env";
import { ApplicationTime } from "~/server/entities/ApplicationTime";

let hasCreated = false;

const create = async () => {
  if (hasCreated) {
    return;
  }

  await createConnection({
    type: "postgres",
    url: getPrivateEnv("DB_URL"),
    port: 5432,
    ssl: true,
    synchronize: true,
    entities: [Application, Person, ApplicationTime],
  });
};

const connectRepository = async () => {
  await create();
  const connection = getConnection();

  if (!connection.isConnected) {
    console.log("Attempting to connect to repository");
    try {
      await connection.connect();
      console.log("Successfully connected to repository");
    } catch (e) {
      handleError(e);
      process.exit();
    }
  }
};

/**
 * Drops the current database, re-creates it and populates it with test data
 */
export async function syncAndPopulateDatabaseDangerously() {
  try {
    await connectRepository();

    console.log("Attempting to delete ApplicationTime rows");
    await getRepository(ApplicationTime).delete({});
    console.log("Successfully deleted ApplicationTime rows");

    console.log("Attempting to delete Application rows");
    await getRepository(Application).delete({});
    console.log("Successfully deleted Application rows");

    console.log("Attempting to delete Person rows");
    await getRepository(Person).delete({});
    console.log("Successfully deleted Person rows");

    for (let i = 0; i < testDataPersonList.length; i++) {
      const item = testDataPersonList[i];

      const person = new Person();
      (Object.keys(item) as Array<keyof PersonFields>).forEach(key => {
        (person as any)[key] = item[key];
      });

      await getRepository(Person).save(person);
    }

    const persons = await getRepository(Person).find();
    console.log("Loaded persons: ", persons);
    console.log("\nCompleted");
  } catch (e) {
    handleError(e);
  }
  process.exit();
}

syncAndPopulateDatabaseDangerously();
