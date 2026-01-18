
export interface Entry {
  id: string;
  userId: string;
  date: string;
  moodRating: number;
  sleepHours: number | null;
  weather: string | null;
  activities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EntryCardProps {
  entry: Entry;
  isExpanded: boolean;
  onClick: (entryId:string) => void;
}