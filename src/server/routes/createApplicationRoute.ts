import { Handler } from "express";
import { getRepository } from "typeorm";
import { Application } from "~/server/entities/Application";
import { Person } from "~/server/entities/Person";
import { ApplicationFields } from "~/types";
import { handleError } from "@taktikal/error";

export const handleCreateApplication: Handler = async (req, res) => {
  try {
    const { ssn } = req.params;

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
      res.status(404).json({ message: `Could not find person with ssn '${ssn}'.` });
      return;
    }

    let application = new Application();

    (Object.keys(req.body) as Array<keyof ApplicationFields>).forEach(key => {
      application[key] = req.body[key];
    });

    application.person = person;
    person.applications.push(application);

    await getRepository(Person).save(person);

    res.sendStatus(201);
  } catch (e) {
    const [err] = handleError(e);
    err.pipe(res);
  }
};
