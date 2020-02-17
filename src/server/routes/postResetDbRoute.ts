import { Handler } from "express";
import { getRepository } from "typeorm";
import { Person } from "~/server/entities/Person";
import { ApplicationTime } from "~/server/entities/ApplicationTime";
import { Application } from "~/server/entities/Application";
import { testDataPersonList } from "~/server/data/testPersonData";
import { PersonFields } from "~/types";
import { handleError } from "@taktikal/error";

export const handlePostResetDB: Handler = async (_req, res) => {
  try {
    // syncAndPopulateDatabaseDangerous();
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

    res.status(200).json({ status: "ok" });
  } catch (e) {
    const [err] = handleError(e);
    err.pipe(res);
  }
};
