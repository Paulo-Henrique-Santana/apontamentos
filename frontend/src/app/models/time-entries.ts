import { Project } from "./project";
import { User } from "./user";

export interface TimeEntry {
  id?: number;
  date: string;
  hours: string;
  observations?: string;
  project: Project;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntryParams {
  startDate?: string;
  endDate?: string;
}