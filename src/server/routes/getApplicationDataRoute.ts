import { Handler } from "express";
import { applicationData } from "~/server/data/applicationData";
import { ApplicationData } from "~/types";

const data = applicationData.reduce<{ [key: string]: ApplicationData }>((obj, item) => {
  obj[item.ssn] = item;
  return obj;
}, {});

export const handleGetApplicationData: Handler = async (req, res) => {
  const response = data[req.params.ssn];
  if (!response) {
    res.sendStatus(404);
    return;
  }

  res.json(response);
};
