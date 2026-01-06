import { Project } from './project';
import { TimeEntry } from './time-entries';

export interface TimeTrackingItemTable {
  dom?: TimeEntry;
  seg?: TimeEntry;
  ter?: TimeEntry;
  qua?: TimeEntry;
  qui?: TimeEntry;
  sex?: TimeEntry;
  sab?: TimeEntry;
  project: Project;
}

export interface TimeTrackingWeekDay { label: string; date: Date }