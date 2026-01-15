interface Entry {
  entry:{
    id: string;
  date: string;
  moodRating: number;
  sleepHours: number | null;
  weather: string | null;
  activities: string[];
  createdAt: string;
  updatedAt: string;
  }
}

const moods = [
  { value: 1, emoji: '😞', label: 'Awful' },
  { value: 2, emoji: '😕', label: 'Bad' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
];

const EntryCard = ({entry}:Entry) => {
  const {
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

  const showActivities = activities.map((tag:string, i:number) => {
    return <div className="border border-solid border-stone-300 p-1 m-1 rounded-sm w-max"  key={tag}>{tag}</div>
  })
  return(
    <div className="w-md bg-stone-100 p-8 inline-block mb-8 text-gray-700 rounded-sm shadow-sm">
      <div className="mb-2">
        <span>Date: {formattedDate}</span> | <span>Mood: {formattedMood(moodRating)}</span> <br />
      </div>
      <div className="mb-2">
        <span>Weather: {weather}</span> | <span>Sleep: {sleepHours}</span> <br />
      </div>
      <span>Tags:</span>
      <div className="inline-flex justify-evenly flex-wrap">
        {showActivities}
      </div>
    </div>
  )
}

export default EntryCard;