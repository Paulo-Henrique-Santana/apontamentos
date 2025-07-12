import { createTimeEntry } from "./createTimeEntry";
import { deleteTimeEntry } from "./deleteTimeEntry";
import { getTimeEntries } from "./getTimeEntries";
import { updateTimeEntry } from "./updateTimeEntry";

export const timeEntryController = {
  getTimeEntries,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry
}