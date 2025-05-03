import { Request, Response } from "express";
import { Project } from "../../models/Project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);

    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ocorreu um erro inesperado ao criar projeto" });
  }
};
