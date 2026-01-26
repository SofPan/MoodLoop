import { useState } from "react";
import { useEntries } from "@/app/contexts/EntriesContext";
import Chart from "./Chart";
import Stats from "./Stats";

const dateFormatter = (date:Date) => {
  return date.toLocaleDateString('en-US', { timeZone:'EST', year: 'numeric', month: 'short', day: 'numeric' });
}

const ChartContainer = () => {
  const {entries} = useEntries();
  const [daysToFilter, setDaysToFilter] = useState(7);
  const [filterValue, setFilterValue] = useState(daysToFilter);

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - Math.abs(daysToFilter));

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate && entryDate <= today;
  });

  const chartEntries = filteredEntries.map(entry => {
    const date = dateFormatter(new Date(entry.date));
    return {date: date, mood: entry.moodRating}
  });

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDaysToFilter(filterValue);
  }
  return(
    <div className="w-full flex items-center justify-evenly flex-col">
      <div className="w-full text-center">
        <h2 className="text-xl font-bold mb-6">Your Mood Statistics for the Selected Period</h2>
        <Stats entries={chartEntries}/>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="self-start pl-20">
          <form id="filter-settings" onSubmit={handleSubmit}>
            <label htmlFor="dayFilter">Days to View: </label>
            <input 
              id="dayFilter" 
              type="number"
              min={3}
              max={365}
              value={filterValue?.toString() || '0'} 
              onChange={(e) => setFilterValue(Number(e.target.value))}
              ></input>
            <button type="submit">Apply</button>
          </form>
        </div>
      <Chart data={chartEntries}/>
      </div>
    </div>
  )
};

export default ChartContainer;