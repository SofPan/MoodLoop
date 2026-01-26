'use client';
import EntryList from "@/components/Entries/EntryList";
import { EntriesProvider } from "./contexts/EntriesContext";
import EntryForm from "@/components/Entries/EntryForm";
import ChartContainer from "@/components/Chart/ChartContainer";


export default function Home() {
  return (
    <EntriesProvider>
      <main className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto size-full">
          <h1 className="text-4xl font-bold text-center text-slate-700 mb-8">
            MoodLoop
          </h1>
          {/* <EntryForm /> */}
          <ChartContainer />
          <EntryList />
        </div>
      </main>
    </EntriesProvider>
  );
}
