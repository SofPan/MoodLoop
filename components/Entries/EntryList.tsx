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
          <h2 className="text-2xl text-stone-600 font-bold mb-3">{month}</h2>
          <div className="grid grid-cols-3 gap-4">
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
          </div>
        )
  })
 
  return(
    <div className="text-stone-500 size-full mx-auto py-10 text-center flex items-center flex-col">
      {
        loading ? "Loading..."
        : error ? `There was an error ${error}`
        : mapMonths
      }
    </div>
  )
}

export default EntryList;