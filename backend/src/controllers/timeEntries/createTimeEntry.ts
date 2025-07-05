import { Request, Response } from "express";
import { TimeEntry } from "../../models/TimeEntry";

export const createTimeEntry = async (req: Request, res: Response) => {
  try {
    const timeEntry = await TimeEntry.create(req.body);

    return res.json(timeEntry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro inesperado ao cadastrar apontamento",
    });
  }
};
