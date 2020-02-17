import { Handler } from "express";
import { getRepository } from "typeorm";
import { Person } from "~/server/entities/Person";
import { handleError } from "@taktikal/error";

export const handleGetPerson: Handler = async (req, res) => {
  try {
    const person = await getRepository(Person).findOne({
      where: { ssn: req.params.ssn },
      join: {
        alias: "person",
        leftJoinAndSelect: {
          applications: "person.applications",
          applicationTimes: "applications.applicationTimes",
        },
      },
    });

    if (!person) {
      res.sendStatus(404);
      return;
    }

    res.json(person);
  } catch (e) {
    const [err] = handleError(e);
    err.pipe(res);
  }
};
