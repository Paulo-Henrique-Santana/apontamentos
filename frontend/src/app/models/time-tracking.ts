import { Project } from './project';
import { TimeEntry } from './time-entries';

export interface TimeTrackingItemTable {
  Dom?: TimeEntry;
  Seg?: TimeEntry;
  Ter?: TimeEntry;
  Qua?: TimeEntry;
  Qui?: TimeEntry;
  Sex?: TimeEntry;
  Sáb?: TimeEntry;
  project: Project;
}

export interface TimeTrackingWeekDay { label: string; date: Date }