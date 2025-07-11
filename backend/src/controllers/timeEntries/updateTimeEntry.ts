import { Request, Response } from "express";
import { TimeEntry } from "../../models/TimeEntry";

export const updateTimeEntry = async (req: Request, res: Response) => {
  try {
    const [, timeEntry] = await TimeEntry.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    return res.status(200).json(timeEntry[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro inesperado ao atualizar o apontamento",
    });
  }
};
