'use client';

import EntryList from "@/components/Entries/EntryList";

// import EntryForm from "@/components/EntryForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto size-full">
        <h1 className="text-4xl font-bold text-center text-slate-700 mb-8">
          MoodLoop
        </h1>
        {/* <EntryForm /> */}
        <EntryList />
      </div>
    </main>
  );
}
