import { Project } from "./project";
import { User } from "./user";

export interface TimeEntry {
  id?: number;
  date: string;
  hours: number;
  observations?: string;
  project?: Project;
  user?: User;
  createdAt?: string;
  updatedAt?: string;
  idProject: number;
  idUser: number;
}

export interface TimeEntryParams {
  startDate?: string;
  endDate?: string;
}