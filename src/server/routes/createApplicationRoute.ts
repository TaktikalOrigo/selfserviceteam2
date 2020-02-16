import { Handler } from "express";
import { getRepository } from "typeorm";
import { Application } from "~/server/entities/Application";

export const handleCreateApplication: Handler = async (req, res) => {
  let application = new Application();
  (Object.keys(req.body) as Array<keyof Application>).forEach(key => {
    application[key] = req.body[key];
  });

  application = await getRepository(Application).save(application);

  res.status(201).json(application);
};
