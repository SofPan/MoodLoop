'use client';
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Entry } from "../interfaces/Entries";


interface EntryContext {
  entries: Entry[];
  editingEntry: Entry | null;
  setEditingEntry: Dispatch<SetStateAction<Entry | null>>;
  loading: boolean;
  error: string | null;
  refetchEntries: () => void;
  editEntry: (id:string) => void;
  deleteEntry: (id:string) => void;
  moods:{value:number, emoji:string, label: string}[];
  weatherEmoji:{value:string, emoji:string, label: string}[];
}

const moods = [
  { value: 1, emoji: '😞', label: 'Awful' },
  { value: 2, emoji: '😕', label: 'Bad' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
];

const weatherEmoji = [
  { value: 'select', emoji: ' ', label: 'Select' },
  { value:'sunny', emoji: '☀️', label: 'Sunny' },
  { value:'cloudy', emoji: '☁️', label: 'Cloudy' },
  { value:'rainy', emoji: '🌧️', label: 'Rainy' },
  { value:'snowy', emoji: '❄️', label: 'Snowy' },
  { value:'stormy', emoji: '⛈️', label: 'Stormy' },
];

const EntriesContext = createContext<EntryContext | undefined>(undefined);

export const EntriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
    
  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/entries');
      const data = await response.json();
      setEntries(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchEntries();
  }, []);
    
  const refetchEntries = () => {
    setLoading(true);
    fetchEntries();
  };

  const editEntry = (id:string) => {
    const entryToEdit = entries.filter(entry => {
      return entry.id === id && entry;
    });

    setEditingEntry(entryToEdit[0]);
  }

  const deleteEntry = async (id: string) => {
    try{
      const response = await fetch('/api/entries', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id
          }),
        });
        if (response.ok){
          refetchEntries();
        }
          
        
    } catch(err){
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  }

  const entryState:EntryContext = {
    entries,
    editingEntry,
    setEditingEntry,
    loading,
    error,
    refetchEntries,
    editEntry,
    deleteEntry,
    moods,
    weatherEmoji
  }

  return(
    <EntriesContext.Provider value={entryState}>
      {children}
    </EntriesContext.Provider>
  )
}

export const useEntries = () => {
  const context = useContext(EntriesContext);
  if (!context) throw new Error('useEntries must be used within EntriesProvider');
  return context;
};