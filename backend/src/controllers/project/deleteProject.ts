import { Request, Response } from "express";
import { Project } from "../../models/Project";

export const deleteProject = async (req: Request, res: Response) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ocorreu um erro inesperado ao remover projeto" });
  }
};
