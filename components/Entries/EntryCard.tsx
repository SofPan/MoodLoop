import { EntryCardProps } from "@/app/interfaces/Entries";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";
import CardWrapper from "../Chart/CardWrapper";
import { formatDate } from "@/app/utils/dateHelpers";
import { useEntries } from "@/app/contexts/EntriesContext";

const EntryCard = ({entry, isExpanded, onClick}:EntryCardProps) => {
  const {
    id,
    date,
    sleepHours,
    moodRating,
    weather,
    activities
  } = entry

  const {moods, weatherEmoji} = useEntries();

  const formattedDate = formatDate(date);

  const formattedEmoji = (
    value: number | string, 
    emojiSelect: {value: number | string, emoji: string, label: string}[]
  ): string => {
    const found = emojiSelect.find(emoji => emoji.value === value);
    return found ? found.emoji : '';
  }

  const showActivities = activities.map((tag:string) => {
    return <div className="border border-solid border-slate-400 bg-slate-100 text-slate-500 px-3 py-1.5 text-sm shadow-sm m-1 rounded-full w-max gap-2"  key={tag}>{tag}</div>
  })
  return(
    <CardWrapper> 
      <div onClick={() => onClick(id)} className={`cursor-pointer overflow-hidden transition-height duration-500 ease-in-out ${isExpanded ? "h-[180px]" : "h-[70px]"}`}>
        <h3 className="font-bold text-lg center">{formattedDate}</h3>
        <div>
          <span className="text-2xl">{formattedEmoji(moodRating, moods)} </span>
          <span>{formattedEmoji(weather, weatherEmoji)}</span>
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
    </CardWrapper>
  )
}

export default EntryCard;