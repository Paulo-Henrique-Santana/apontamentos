import { Request, Response } from "express";
import { Project } from "../../models/Project";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;

    const { rows, count } = await Project.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["id", "DESC"]]
    })

    return res.json({
      total: count,
      items: rows,
      hasNext: count > pageSize * page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ocorreu um erro inesperado ao buscar projetos" });
  }
}