import { useState, useEffect } from "react";
import { Entry } from "@/app/interfaces/Entries";
import MonthSection from "./MonthSection";
import { mockEntries } from "@/app/mock/mockEntries";

const EntryList = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  
  useEffect(() => {
    // const fetchEntries = async () => {
    //   return await fetch('http://localhost:3000/api/entries')
    //   .then(response => response.json())
    //   .then(data => {
    //     setEntries(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError(err);
    //     setLoading(false);
    //   })
    // }

    // fetchEntries();
    setEntries(mockEntries);
    setLoading(false);
    },[]);

  return (
    <div className="text-slate-500 size-full">
      <div className="size-full mx-auto px-20 py-10 text-center flex flex-wrap justify-evenly">
        {
          loading ? "Loading..."
          :
          error ? error
          :
          <MonthSection entries={entries} />
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