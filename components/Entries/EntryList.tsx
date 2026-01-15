import { useState, useEffect } from "react";
import EntryCard from "./EntryCard";
interface Entry {
  id: string;
  date: string;
  moodRating: number;
  sleepHours: number | null;
  weather: string | null;
  activities: string[];
  createdAt: string;
  updatedAt: string;
}

const EntryList = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>()
  
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

    const displayEntries = entries.map((entry:Entry) => {
      return <EntryCard key={entry.id}
                entry={entry}
              />
    })
  
  return (
    <div className="text-gray-500 ">
      <div className="flex justify-evenly flex-wrap">
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