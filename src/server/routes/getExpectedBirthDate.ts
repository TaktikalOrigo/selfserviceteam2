import { Handler } from "express";
import { expectedBirthDates } from "~/server/data/expectedBirthDateData";
import { ExpectedBirthDate } from "~/types";

const data = expectedBirthDates.reduce<{ [key: string]: ExpectedBirthDate }>((obj, item) => {
  obj[item.ssn] = item;
  return obj;
}, {});

export const handleGetExpectedBirthDate: Handler = async (req, res) => {
  const response = data[req.params.ssn];

  if (!response) {
    res.sendStatus(404);
    return;
  }

  res.json(response);
};
