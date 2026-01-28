interface SleepHoursProps {
  value: number | null;
  onChange: (sleep: number) => void;
}

const SleepHours = ({value, onChange}:SleepHoursProps) => {
  return(
    <div>
          <label htmlFor="sleep" className="block text-sm font-medium text-gray-700 mb-1">
            Sleep Hours (optional)
          </label>
          <input
            type="number"
            id="sleep"
            step="0.5"
            min="0"
            max="24"
            value={value?.toString() || '0'}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="e.g., 7.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
  )
}

export default SleepHours;