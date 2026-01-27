'use client';
import EntryList from "@/components/Entries/EntryList";
import { EntriesProvider } from "./contexts/EntriesContext";
import ChartContainer from "@/components/Chart/ChartContainer";
import FormDrawer from "@/components/Form/FormDrawer";


export default function Home() {
  return (
    <EntriesProvider>
      <main className="min-h-screen bg-sage-100 py-8 text-stone-700">
        <div className="container mx-auto size-full">
          <h1 className="text-4xl font-bold text-center text-stone-800 mb-8">
            MoodLoop
          </h1>
          <FormDrawer />
          <ChartContainer />
          <EntryList />
        </div>
      </main>
    </EntriesProvider>
  );
}
