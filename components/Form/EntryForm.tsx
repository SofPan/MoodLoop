import { useEffect, useState, SetStateAction, Dispatch } from "react";
import { useEntries } from "@/app/contexts/EntriesContext";
import MoodSelector from "./MoodSelector";
import Activities from "./Activities";
import { getTodayDateString } from "@/app/utils/dateHelpers";
import WeatherSelector from "./WeatherSelector";
import SleepHours from "./SleepHours";

interface EntryFormData {
  date: string;
  moodRating: number | null;
  sleepHours: number | null;
  weather: string;
  activities: string[];
}

interface EntryFormProps{
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const EntryForm = ({setIsOpen}:EntryFormProps) => {
  const {refetchEntries, editingEntry, setEditingEntry} = useEntries();
  const [formData, setFormData] = useState<EntryFormData>({
    date: getTodayDateString(),
    moodRating: null,
    sleepHours: 0,
    weather: '',
    activities: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.moodRating) {
      setMessage({ type: 'error', text: 'Please select a mood' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      let response;
      if (editingEntry){
        response = await fetch('/api/entries', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            id: editingEntry.id,
            sleepHours: formData.sleepHours,
          }),
        });
      } else {
        response = await fetch('/api/entries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            sleepHours: formData.sleepHours,
          }),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      setMessage({ type: 'success', text: 'Entry saved successfully!' });
      
      // Reset form
      setFormData({
        date: getTodayDateString(),
        moodRating: null,
        sleepHours: 0,
        weather: '',
        activities: [],
      });
      refetchEntries();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to save entry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (editingEntry){
      const dateCorrection = editingEntry.date.split("T")[0];
      setFormData({...editingEntry, date:dateCorrection});
    } else {
      // Reset form
      setFormData({
        date: getTodayDateString(),
        moodRating: null,
        sleepHours: 0,
        weather: '',
        activities: [],
      });
    }
  },[editingEntry])

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Daily Entry</h2>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            max={getTodayDateString()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Mood Selector */}
        <MoodSelector
          value={formData.moodRating}
          onChange={(mood) => setFormData({ ...formData, moodRating: mood })}
        />

        {/* Sleep Hours */}
        
        <SleepHours 
          value={formData.sleepHours}
          onChange={(sleep) => setFormData({ ...formData, sleepHours: sleep })}
        />

        {/* Weather */}
        <WeatherSelector 
          value={formData.weather}
          onChange={(weather) => setFormData({ ...formData, weather: weather })}
        />
        {/* Activities */}
        <Activities setFormData={setFormData} formData={formData}/>
        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-sage-700 text-white rounded-lg font-bold hover:bg-sage-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </button>
        {/* Cancel Edit Button */}
        {editingEntry && 
        <button className="w-full py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => {
          setEditingEntry(null);
          setIsOpen(false);
          } }>
            Cancel
        </button>
        }
      </form>
    </div>
  );
}

export default EntryForm;