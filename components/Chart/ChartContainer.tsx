import { useState } from "react";
import { useEntries } from "@/app/contexts/EntriesContext";
import Chart from "./Chart";

const dateFormatter = (date:Date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const ChartContainer = () => {
  const {entries} = useEntries();
  const [daysToFilter, setDaysToFilter] = useState(7);
  const [filterValue, setFilterValue] = useState(daysToFilter);

  const todayMs = new Date().getTime();
  const startDateMs = todayMs - (daysToFilter * 24 * 60 * 60 * 1000);

  const filteredEntries = entries.filter(entry => {
    const entryMs = new Date(entry.date).getTime();
    return entryMs >= startDateMs && entryMs <= todayMs;
  });

  const chartEntries = filteredEntries.map(entry => {
    const date = dateFormatter(new Date(entry.date));
    return {date: date, mood: entry.moodRating}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterValue = e.target.dayFilter.value;
    setDaysToFilter(filterValue);
  }
  return(
    <div className="w-1/2 flex items-center justify-evenly flex-col">
      <h2>Mood Data</h2>
      <form id="filter-settings" onSubmit={handleSubmit}>
        <label htmlFor="dayFilter">Days to View: </label>
        <input id="dayFilter" type="number" value={filterValue} onChange={(e) => setFilterValue(Number(e.target.value))}></input>
        <button type="submit">Apply</button>
      </form>
      <Chart data={chartEntries}/>
    </div>
  )
};

export default ChartContainer;