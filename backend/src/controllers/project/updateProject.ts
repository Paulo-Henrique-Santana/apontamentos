import { Request, Response } from "express";
import { Project } from "../../models/Project";

export const updateProject = async (req: Request, res: Response) => {
  try {
    const [, affectedRows] = await Project.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    return res.status(200).json(affectedRows[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ocorreu um erro inesperado ao editar projeto" });
  }
};
