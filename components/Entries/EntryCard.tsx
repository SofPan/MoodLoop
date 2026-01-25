import { EntryCardProps } from "@/app/interfaces/Entries";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";

const moods = [
  { value: 1, emoji: '😞', label: 'Awful' },
  { value: 2, emoji: '😕', label: 'Bad' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
];

const EntryCard = ({entry, isExpanded, onClick}:EntryCardProps) => {
  const {
    id,
    date,
    sleepHours,
    moodRating,
    weather,
    activities
  } = entry

  const formattedDate = date.toLocaleString().split('T')[0]

  const formattedMood = (rating:number) => {
    return moods.map(mood => {
      return mood.value === rating && mood.emoji;
    })
  }

  const showActivities = activities.map((tag:string) => {
    return <div className="border border-solid border-slate-400 bg-slate-100 text-slate-500 px-3 py-1.5 text-sm shadow-sm m-1 rounded-full w-max gap-2"  key={tag}>{tag}</div>
  })
  return(
    <div onClick={() => onClick(id)} className={`w-2xl centered bg-white border border-slate-200 px-2 py-1 mx-4 my-2 text-slate-700 rounded-sm hover:shadow-md hover:border-slate-300 cursor-pointer overflow-hidden transition-height duration-500 ease-in-out ${isExpanded ? "h-[180px]" : "h-[70px]"}`}>
      <h3 className="font-bold text-lg center">{formattedDate}</h3>
      <div>
        <span className="text-2xl">{formattedMood(moodRating)} </span>
        <span>{weather}</span>
      </div>
      <div className={`${isExpanded ? 'visible' : 'hidden'}`}>
        <div className="flex justify-center items-center">
          <span className="italic">Slept for {sleepHours} hours.</span>
        </div>
        <div className="flex flex-wrap justify-center">
          {showActivities}
        </div>
        <div className="mt-1">
          <EditEntry id={id}/>
          <DeleteEntry id={id} />
        </div>
        
      </div>
    </div>
  )
}

export default EntryCard;