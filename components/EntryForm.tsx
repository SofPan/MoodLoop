import { useState } from "react";
import MoodSelector from "./MoodSelector";

interface EntryFormData {
  date: string;
  moodRating: number | null;
  sleepHours: string;
  weather: string;
  activities: string[];
}

const EntryForm = () => {
  const [formData, setFormData] = useState<EntryFormData>({
    date: new Date().toISOString().split('T')[0], // Today's date
    moodRating: null,
    sleepHours: '',
    weather: '',
    activities: [],
  });
  const [activityInput, setActivityInput] = useState('');
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
      setActivityInput('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save entry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addActivity = () => {
    const input = activityInput.trim();
    if (!input) return;

    // Split by comma and process each tag
    const newActivities = input
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0 && !formData.activities.includes(tag));

    if (newActivities.length > 0) {
      setFormData({
        ...formData,
        activities: [...formData.activities, ...newActivities],
      });
      setActivityInput('');
    }
  };

  const removeActivity = (activity: string) => {
    setFormData({
      ...formData,
      activities: formData.activities.filter((a) => a !== activity),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addActivity();
    }
  };

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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
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
      <div>
        <label htmlFor="activities" className="block text-sm font-medium text-gray-700 mb-1">
          Activities (optional)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="activities"
            value={activityInput}
            onChange={(e) => setActivityInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., exercise, therapy, work"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addActivity}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Add
          </button>
        </div>
        {formData.activities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.activities.map((activity) => (
              <span
                key={activity}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {activity}
                <button
                  type="button"
                  onClick={() => removeActivity(activity)}
                  className="hover:text-green-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

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
        className="w-full py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </button>
    </form>
  );
}

export default EntryForm;