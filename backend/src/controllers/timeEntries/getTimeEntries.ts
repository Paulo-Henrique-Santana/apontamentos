import { Request, Response } from "express";
import { Op, WhereOptions } from "sequelize";
import { Project } from "../../models/Project";
import { TimeEntrie } from "../../models/TimeEntrie";

export const getTimeEntries = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    const { startDate, endDate } = req.query;
    const where: WhereOptions = {};

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [
          new Date(startDate as string),
          new Date(endDate as string),
        ],
      };
    }

    const { rows, count } = await TimeEntrie.findAndCountAll({
      where,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["id", "DESC"]],
      include: [Project]
    });

    return res.json({
      total: count,
      items: rows,
      hasNext: count > pageSize * page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro inesperado ao buscar os apontamentos",
    });
  }
};
