import { useEffect, useState } from "react";
import EntryCard from "./EntryCard";
import { Entry } from "@/app/interfaces/Entries";
import { groupEntriesByMonth } from "@/app/utils/groupEntriesByMonth";

const MonthSection = ({entries}:Entry[]) => {
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

    const displayEntries = entries.map((entry:Entry) => {
      return <EntryCard key={entry.id}
                entry={entry}
                isExpanded={expandedEntryId === entry.id}
                onClick={handleCardClick}
              />
    });

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
        ))}
      </div>
    )
  })
 
  return(
    <>
      {mapMonths}
    </>
  )
}

export default MonthSection;