import { Handler } from "express";
import { getRepository } from "typeorm";
import { Person } from "~/server/entities/Person";

export const handleUpdatePerson: Handler = async (req, res) => {
  let person = new Person();
  (Object.keys(req.body) as Array<keyof Person>).forEach(key => {
    (person as any)[key] = req.body[key];
  });

  person = await getRepository(Person).save(person);

  res.status(201).json(person);
};
