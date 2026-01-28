'use client';
import EntryList from "@/components/Entries/EntryList";
import { EntriesProvider } from "./contexts/EntriesContext";
import ChartContainer from "@/components/Chart/ChartContainer";
import FormDrawer from "@/components/Form/FormDrawer";


export default function Home() {
  return (
    <EntriesProvider>
      <main className="min-h-screen bg-sage-100 py-8 text-stone-700">
        <div className="container mx-auto size-full text-center">
          <h1 className="text-4xl font-bold text-center text-stone-800 mb-8">
            MoodLoop
          </h1>
          <p className="text-center font-bold mb-8 w-2xl mx-auto">Small daily check-ins can reveal big patterns. Take a moment each day to log your mood, sleep, and what you did. Over time, you&apos;ll spot connections between your habits and how you feel, giving you the insights to make meaningful changes.</p>
          <hr className="mb-24 text-sage-400"></hr>
          <FormDrawer />
          <ChartContainer />
          <EntryList />
        </div>
      </main>
    </EntriesProvider>
  );
}
