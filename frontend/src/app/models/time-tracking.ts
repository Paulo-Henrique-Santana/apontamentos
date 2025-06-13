import { Project } from './project';

export interface TimeTrackingItemTable {
  Dom?: number;
  Seg?: number;
  Ter?: number;
  Qua?: number;
  Qui?: number;
  Sex?: number;
  Sáb?: number;
  project: Project;
}
