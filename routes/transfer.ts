import { Request, Response, NextFunction } from "express";
import Transfer from "../models/Transfer";

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const transferRecords = await Transfer.findAll()
  // console.log(transferRecords)
  res.status(200).send(transferRecords)
}

export default controller;