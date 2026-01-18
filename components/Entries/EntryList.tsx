import { useState, useEffect } from "react";
import EntryCard from "./EntryCard";

export interface Entry {
  id: string;
  date: string;
  moodRating: number;
  sleepHours: number | null;
  weather: string | null;
  activities: string[];
  createdAt: string;
  updatedAt: string;
  isExpanded: boolean;
}

const EntryList = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [expandedEntryId, setExpandedEntryId] = useState('');
  
  useEffect(() => {
    const fetchEntries = async () => {
      return await fetch('http://localhost:3000/api/entries')
      .then(response => response.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      })
    }

    fetchEntries();
    },[]);

    const handleCardClick = (entryId:string) => {
      if (expandedEntryId === entryId){
          setExpandedEntryId('')
        } else {
          setExpandedEntryId(entryId);
        }
    }

    const displayEntries = entries.map((entry:Entry) => {
      return <EntryCard key={entry.id}
                entry={entry}
                isExpanded={expandedEntryId === entry.id}
                onClick={handleCardClick}
              />
    })
  
  return (
    <div className="text-slate-500 size-full">
      <div className="size-full mx-auto px-20 py-10 text-center flex flex-wrap justify-evenly">
        {
          loading ? "Loading..."
          :
          error ? error
          :
          displayEntries
        }
      </div>
    </div>
  )
}

export default EntryList;

// In the return/JSX:
//   - If loading: show "Loading..."
//   - If error: show error message
//   - If entries exist: map over them and display each entry's date and mood
//   - If no entries: show "No entries yet"