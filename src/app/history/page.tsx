'use client';

import { useEffect, useState } from 'react';

type MarketingResult = {
  overview: string;
  ideas: string[];
  adCopy: string;
  socialPost: string;
  emailSubject: string;
  emailBody: string;
};

type HistoryEntry = {
  id: string;
  timestamp: string;
  inputs: {
    productName: string;
    productDescription: string;
    targetAudience: string;
    brandVoice: string;
    campaignGoals: string;
    successes: string;
    failures: string;
    selectedChannels: string[];
  };
  result: MarketingResult;
};

import Link from 'next/link';

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('marketingHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('marketingHistory');
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Campaign Pilot</p>
          <p className="mt-2 text-3xl font-semibold text-white">Campaign history</p>
          <p className="mt-3 max-w-2xl text-slate-400">
            Review past campaign inputs and generated marketing ideas.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Generate
          </Link>
          <Link
            href="/profiles"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Brand Profiles
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Back to home
          </Link>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
            >
              Clear history
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {history.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-2xl shadow-black/20">
            <p className="text-xl font-semibold text-slate-300">No campaign history yet</p>
            <p className="mt-4 text-slate-400">
              Generate your first marketing ideas on the main page to see them here.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start generating
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {history.map((entry) => (
              <article key={entry.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">{new Date(entry.timestamp).toLocaleString()}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Campaign {entry.id}</p>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Inputs</p>
                    <div className="space-y-3 text-sm text-slate-300">
                      <p><strong>Product:</strong> {entry.inputs.productName || 'Not specified'}</p>
                      <p><strong>Description:</strong> {entry.inputs.productDescription || 'Not specified'}</p>
                      <p><strong>Audience:</strong> {entry.inputs.targetAudience || 'Not specified'}</p>
                      <p><strong>Brand voice:</strong> {entry.inputs.brandVoice || 'Not specified'}</p>
                      <p><strong>Goals:</strong> {entry.inputs.campaignGoals || 'Not specified'}</p>
                      <p><strong>Successes:</strong> {entry.inputs.successes || 'Not specified'}</p>
                      <p><strong>Failures:</strong> {entry.inputs.failures || 'Not specified'}</p>
                      <p><strong>Channels:</strong> {entry.inputs.selectedChannels.join(', ') || 'None selected'}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Outputs</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-200">Overview</p>
                        <p className="mt-2 text-sm text-slate-400">{entry.result.overview}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-200">Ideas</p>
                        <ul className="mt-2 list-disc list-inside text-sm text-slate-400 space-y-1">
                          {entry.result.ideas.map((idea, index) => (
                            <li key={index}>{idea}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-200">Ad copy</p>
                        <p className="mt-2 text-sm text-slate-400">{entry.result.adCopy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-200">Social post</p>
                        <p className="mt-2 text-sm text-slate-400">{entry.result.socialPost}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-200">Email draft</p>
                        <p className="mt-2 text-sm text-slate-400 font-semibold">Subject: {entry.result.emailSubject}</p>
                        <p className="mt-2 whitespace-pre-line text-sm text-slate-500">{entry.result.emailBody}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}