import { Handler } from "express";
import { getRepository } from "typeorm";
import { Person } from "~/server/entities/Person";

export const handleGetPerson: Handler = async (req, res) => {
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

  res.status(200).json(person);
};
