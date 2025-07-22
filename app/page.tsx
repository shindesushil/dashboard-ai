'use client'

import TranscriptForm from "./Components/Forms/TranscriptForm";

export default function Home() {
  return (
      <div className="font-sans pb-10 gap-16 sm:p-20">
        <main className="flex flex-col row-start-2 sm:items-start">
          <TranscriptForm />
        </main>
      </div>
  );
}
