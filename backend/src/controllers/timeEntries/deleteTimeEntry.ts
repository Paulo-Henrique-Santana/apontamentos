import { Request, Response } from "express";
import { TimeEntry } from "../../models/TimeEntry";

export const deleteTimeEntry = async (req: Request, res: Response) => {
  try {
    await TimeEntry.destroy({
      where: { id: req.params.id },
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro inesperado ao excluir apontamento",
    });
  }
};
