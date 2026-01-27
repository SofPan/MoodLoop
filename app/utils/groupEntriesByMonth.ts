import { Entry } from "@/app/interfaces/Entries";
import { getMonthYear } from "./dateHelpers";

export const groupEntriesByMonth = (entries: Entry[]) => {
  const grouped: Record<string, Entry[]> = {};

  for (const entry of entries) {
    const monthYear = getMonthYear(entry.date);
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    
    grouped[monthYear].push(entry);
  }
  return grouped;
};