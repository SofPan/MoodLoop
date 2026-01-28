import { useEntries } from "@/app/contexts/EntriesContext";

interface WeatherSelectorProps {
  value: string | null;
  onChange: (weather: string) => void;
}

const WeatherSelector = ({value, onChange}:WeatherSelectorProps) => {
  const {weatherEmoji} = useEntries();

  return(
    <div>
      <label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-1">
        Weather (optional)
      </label>
      <select
        id="weather"
        value={value?.toString()||''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {
          weatherEmoji.map(opt => (
            <option key={opt.value} value={opt.label}>
              {opt.emoji} {opt.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default WeatherSelector;