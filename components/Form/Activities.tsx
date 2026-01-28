import { Dispatch, SetStateAction, useState } from "react";

interface EntryFormData {
  date: string;
  moodRating: number | null;
  sleepHours: number | null;
  weather: string;
  activities: string[];
}

interface ActivitiesProps {
  setFormData: Dispatch<SetStateAction<EntryFormData>>;
  formData: EntryFormData;
}

const MAX_TAG_LENGTH = 50;
const MAX_TOTAL_LENGTH = 500;

const Activities = ({setFormData, formData}:ActivitiesProps) => {
  const [activityInput, setActivityInput] = useState('');

  const addActivity = () => {
    const input = activityInput.trim();
    if (!input) return;

    // Split by comma and process each tag
    const newActivities = input
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0 && tag.length <= MAX_TAG_LENGTH && !formData.activities.includes(tag));

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

  return(
      <div>
        <label htmlFor="activities" className="block text-sm font-medium text-stone-700 mb-1">
          Activities (optional)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="activities"
            value={activityInput}
            onChange={(e) => setActivityInput(e.target.value)}
            maxLength={MAX_TOTAL_LENGTH}
            onKeyPress={handleKeyPress}
            placeholder="e.g., exercise, therapy, work"
            className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-stone-400 text-stone-800"
          />
          <button
            type="button"
            onClick={addActivity}
            className="px-4 py-2 bg-sage-300 text-white font-bold rounded-lg hover:bg-sage-500 transition"
          >
            Add
          </button>
        </div>
        {formData.activities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.activities.map((activity) => (
              <span
                key={activity}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {activity}
                <button
                  type="button"
                  onClick={() => removeActivity(activity)}
                  className="hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

  )
}

export default Activities;