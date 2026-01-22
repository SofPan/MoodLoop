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
}

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

  const entryState:EntryContext = {
    entries,
    editingEntry,
    setEditingEntry,
    loading,
    error,
    refetchEntries,
    editEntry
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