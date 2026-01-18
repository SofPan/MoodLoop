import { useEffect, useState } from "react";
import { useEntries } from "@/app/contexts/EntriesContext";
import { Entry } from "@/app/interfaces/Entries";
import { groupEntriesByMonth } from "@/app/utils/groupEntriesByMonth";
import EntryCard from "./EntryCard";

const EntryList = () => {

  const {entries, loading, error} = useEntries();

  const [expandedEntryId, setExpandedEntryId] = useState('');
  const [months, setMonths] = useState<string[]>([]);
  const [groupedEntries, setGroupedEntries] = useState<Record<string, Entry[]>>({});

  useEffect(() => {
    const extractMonthKeys = (entryArray:Entry[]) => {
      const groupedEntries = groupEntriesByMonth(entryArray);
  
      const monthKeys = Object.keys(groupedEntries);
  
      setMonths(monthKeys);
      setGroupedEntries(groupedEntries);
    }

    extractMonthKeys(entries);
  },[entries]);

    const handleCardClick = (entryId:string) => {
      if (expandedEntryId === entryId){
          setExpandedEntryId('')
        } else {
          setExpandedEntryId(entryId);
        }
    }
    const mapMonths = months.map(month => {
      return (
        <div key={month}>
          <h2>{month}</h2>
            {groupedEntries[month].map((entry) => (
                <EntryCard 
                    key={entry.id}
                    entry={entry}
                    isExpanded={expandedEntryId === entry.id}
                    onClick={() => handleCardClick(entry.id)}
                  />
              )
            )}
          </div>
        )
  })
 
  return(
    <div className="text-slate-500 size-full mx-auto px-20 py-10 text-center flex flex-wrap justify-evenly">
      {
        loading ? "Loading..."
        : error ? `There was an error ${error}`
        : mapMonths
      }
    </div>
  )
}

export default EntryList;