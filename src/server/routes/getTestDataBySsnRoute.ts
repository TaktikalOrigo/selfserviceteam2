import { Handler } from "express";
import { testPersonList } from "~/server/data/testPersonData";
import { TestPersonData } from "~/types";

const ssnToTestPerson = testPersonList.reduce<{ [ssn: string]: TestPersonData }>((obj, item) => {
  obj[item.ssn] = item;
  return obj;
}, {});

export const handleGetTestDataBySsn: Handler = (req, res) => {
  const { ssn } = req.params;

  if (!/^\d{10}$/.test(ssn)) {
    res.sendStatus(400);
    return;
  }

  if (ssn === "0000000000") {
    res.json(testPersonList[0]);
    return;
  }

  if (!ssnToTestPerson[ssn]) {
    res.status(404).json({ message: "No person with ssn" });
    return;
  }

  res.json(ssnToTestPerson[ssn]);
};
