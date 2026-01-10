'use client';

import EntryForm from "@/components/EntryForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          MoodLoop
        </h1>
        <EntryForm />
      </div>
    </main>
  );
}
