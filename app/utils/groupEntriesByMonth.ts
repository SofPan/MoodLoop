import { Entry } from "@/app/interfaces/Entries";

export const groupEntriesByMonth = (entries: Entry[]) => {
  const grouped: Record<string, Entry[]> = {};

  for (const entry of entries) {
    const date = new Date(entry.date);
    const monthYear = date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    
    grouped[monthYear].push(entry);
  }
  return grouped;
};