import { useEntries } from "@/app/contexts/EntriesContext";

interface MoodSelectorProps {
  value: number | null;
  onChange: (mood: number) => void;
}

const MoodSelector = ({value, onChange}:MoodSelectorProps) => {
  const {moods} = useEntries();
  
  return(
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray700">
        How are you feeling today?
      </label>
      <div className="flex gap-2 justify-between">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:scale-110 ${
              value === mood.value
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="text-xs mt-1 text-gray-600">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MoodSelector;