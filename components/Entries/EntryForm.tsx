import { useState } from "react";
import { useEntries } from "@/app/contexts/EntriesContext";
import MoodSelector from "../MoodSelector";
import Activities from "../FormFields/Activities";

interface EntryFormData {
  date: string;
  moodRating: number | null;
  sleepHours: string;
  weather: string;
  activities: string[];
}

const EntryForm = () => {
  const {refetchEntries} = useEntries();
  const [formData, setFormData] = useState<EntryFormData>({
    date: new Date().toISOString().split('T')[0], // Today's date
    moodRating: null,
    sleepHours: '',
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
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sleepHours: formData.sleepHours ? parseFloat(formData.sleepHours) : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      setMessage({ type: 'success', text: 'Entry saved successfully!' });
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        moodRating: null,
        sleepHours: '',
        weather: '',
        activities: [],
      });
      refetchEntries();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save entry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const addToFormData = (payload:unknown) => {
  //   setFormData({...formData, payload});
  // }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
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
          max={new Date().toISOString().split('T')[0]}
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
          value={formData.sleepHours}
          onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
          placeholder="e.g., 7.5"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Weather */}
      <div>
        <label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-1">
          Weather (optional)
        </label>
        <select
          id="weather"
          value={formData.weather}
          onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select weather</option>
          <option value="sunny">☀️ Sunny</option>
          <option value="cloudy">☁️ Cloudy</option>
          <option value="rainy">🌧️ Rainy</option>
          <option value="snowy">❄️ Snowy</option>
          <option value="stormy">⛈️ Stormy</option>
        </select>
      </div>

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
        className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </button>
    </form>
  );
}

export default EntryForm;