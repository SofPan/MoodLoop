'use client';

import EntryForm from "@/components/EntryForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-stone-700 mb-8">
          MoodLoop
        </h1>
        <EntryForm />
      </div>
    </main>
  );
}
