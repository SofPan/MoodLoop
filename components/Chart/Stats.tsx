import CardWrapper from "../Visual/CardWrapper";

interface StatsProps {
  entries: {date:string, mood:number}[];
}

const Stats = ({entries}:StatsProps) => {
  const averageMood = (entries:{ date: string; mood: number; }[]) => {
    let sum = 0;
    for (const entry of entries){
      sum+= entry.mood;
    }
    // TODO: Replace this output with the emoji equivalent
    return Math.round(sum/entries.length);
  }

  return(
    <div className="place-items-center-safe grid md:grid-cols-3 gap-1 w-full mb-8">
      <CardWrapper>
        <div>Total Entries<span className="text-xl font-bold block">{entries.length}</span></div>
      </CardWrapper>
      <CardWrapper>
        <div>Average Mood Rating<span className="text-xl font-bold block">{entries.length && averageMood(entries)}</span> </div>
      </CardWrapper>
      {/* <CardWrapper>
        <div>Average Sleep Duration<span className="text-xl font-bold block">#</span> </div>
      </CardWrapper> */}
    </div>
  )
}

export default Stats;