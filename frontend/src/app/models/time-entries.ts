import { Project } from "./project";
import { User } from "./user";

export interface TimeEntrie {
  id?: number;
  date: string;
  hours: string;
  observations?: string;
  project: Project;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntrieParams {
  startDate?: string;
  endDate?: string;
}