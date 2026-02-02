import { useState } from "react";
import { useEntries } from "@/app/contexts/EntriesContext";
import Chart from "./Chart";
import Stats from "./Stats";
import { formatDate, parseEntryDate } from "@/app/utils/dateHelpers";


const ChartContainer = () => {
  const {entries} = useEntries();
  const [daysToFilter, setDaysToFilter] = useState(365);
  const [filterValue, setFilterValue] = useState(daysToFilter);

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - Math.abs(daysToFilter));

  const filteredEntries = entries.filter(entry => {
    const entryDate = parseEntryDate(entry.date);
    return entryDate >= startDate && entryDate <= today;
  });

  const chartEntries = filteredEntries.map(entry => {
    const date = formatDate(entry.date);
    return {date: date, mood: entry.moodRating}
  });

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDaysToFilter(filterValue);
  }
  return(
    <div className="w-full flex items-center justify-evenly flex-col">
      <div className="w-full text-center flex flex-col justify-evenly items-center">
        <h2 className="text-lg md:text-xl font-bold mb-6">Your Mood Statistics for the Selected Period</h2>
        <Stats entries={chartEntries}/>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="self-start pl-8 md:pl-16  mb-4">
          <form id="filter-settings" onSubmit={handleSubmit}>
            <label htmlFor="dayFilter">Days to View: </label>
            <input 
              id="dayFilter" 
              type="number"
              min={3}
              max={365}
              value={filterValue?.toString() || '0'} 
              onChange={(e) => setFilterValue(Number(e.target.value))}
              className="border-stone-400 rounded-sm px-1 bg-sage-50 w-15 mr-2 text-center border"
              ></input>
            <button type="submit" className="border border-sage-600 rounded-sm bg-sage-400 px-1 text-white shadow-sm font-normal hover:cursor-pointer hover:bg-sage-700 hover:shadow-md">Apply</button>
          </form>
        </div>
      <Chart data={chartEntries}/>
      </div>
    </div>
  )
};

export default ChartContainer;