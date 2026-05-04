'use client';

import { FormEvent, useState } from 'react';

const channelOptions = [
  'Social media',
  'Email marketing',
  'Search ads',
  'Landing page',
  'SMS campaigns',
];

type MarketingResult = {
  overview: string;
  ideas: string[];
  adCopy: string;
  socialPost: string;
  emailSubject: string;
  emailBody: string;
};

const normalizeTone = (voice: string) => {
  const normalized = voice.toLowerCase();
  if (/friendly|warm|approachable|playful/.test(normalized)) return 'friendly and approachable';
  if (/professional|confident|bold|authoritative/.test(normalized)) return 'professional and confident';
  if (/luxury|premium|elegant|sophisticated/.test(normalized)) return 'luxurious and refined';
  if (/fun|energetic|bold|vibrant/.test(normalized)) return 'energetic and bold';
  return 'clear and compelling';
};

const chooseGoalFocus = (goals: string) => {
  const lower = goals.toLowerCase();
  if (/awareness|brand|reach|visibility/.test(lower)) return 'increase brand awareness and audience reach';
  if (/sales|conversion|revenue|growth/.test(lower)) return 'drive conversions and boost sales';
  if (/engagement|traffic|interaction/.test(lower)) return 'improve engagement and customer interaction';
  return 'support your campaign goals with measurable results';
};

const buildPerformanceInsight = (successes: string, failures: string) => {
  const wins = successes.trim() || 'strong creative performance and positive customer feedback';
  const losses = failures.trim() || 'campaigns that underperformed because of weak calls to action or unclear audience fit';
  return `We analyzed your past marketing performance, noting ${wins} while avoiding ${losses}. This helps shape a campaign that leans into what worked and sidesteps prior mistakes.`;
};

const generateMarketingResult = (
  productName: string,
  productDescription: string,
  targetAudience: string,
  brandVoice: string,
  campaignGoals: string,
  successes: string,
  failures: string,
  channels: string[],
): MarketingResult => {
  const productLabel = productName.trim() || 'your product';
  const audienceLabel = targetAudience.trim() || 'your ideal customer';
  const tone = normalizeTone(brandVoice);
  const goalFocus = chooseGoalFocus(campaignGoals);
  const insight = buildPerformanceInsight(successes, failures);
  const selectedChannels = channels.length ? channels.join(', ') : 'social media and email marketing';

  const ideas = [
    `Create a ${tone} campaign that positions ${productLabel} as the solution for ${audienceLabel}.`,
    `Use past success signals to highlight benefits, while testing a more direct call to action in ${selectedChannels}.`,
    `Build a short-form social sequence that turns key product features into snackable content for modern buyers.`,
  ];

  const adCopy = `Discover ${productLabel}, designed for ${audienceLabel}. ${productDescription.trim() || 'A compelling product that stands out in a crowded market.'} With a ${tone} brand voice, this campaign aims to ${goalFocus}.`; 
  const socialPost = `Ready for better results? ${productLabel} helps ${audienceLabel} achieve more by focusing on what matters most. ${campaignGoals.trim() || 'Get started today with smarter campaigns.'}`;
  const emailSubject = `How ${productLabel} helps ${audienceLabel} achieve more`; 
  const emailBody = `Hi there,

We analyzed your past campaign performance and built a plan that leans into what worked while avoiding previous pitfalls. ${insight}

Our recommendation is to promote ${productLabel} across ${selectedChannels}, using a ${tone} tone and messaging that speaks directly to ${audienceLabel}. The campaign should focus on ${goalFocus}.

Best,
The AiMarketing team`; 

  return {
    overview: `Based on your input for ${productLabel}, this campaign strategy combines product storytelling, audience targeting, and performance learnings to deliver a stronger marketing push.`,
    ideas,
    adCopy,
    socialPost,
    emailSubject,
    emailBody,
  };
};

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandVoice, setBrandVoice] = useState('');
  const [campaignGoals, setCampaignGoals] = useState('');
  const [successes, setSuccesses] = useState('');
  const [failures, setFailures] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Social media', 'Email marketing']);
  const [result, setResult] = useState<MarketingResult | null>(null);

  const toggleChannel = (channel: string) => {
    setSelectedChannels((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const generated = generateMarketingResult(
      productName,
      productDescription,
      targetAudience,
      brandVoice,
      campaignGoals,
      successes,
      failures,
      selectedChannels,
    );
    setResult(generated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">AiMarketing</p>
          <p className="mt-2 text-3xl font-semibold text-white">Marketing idea generator</p>
          <p className="mt-3 max-w-2xl text-slate-400">
            Enter your product and campaign details, share past performance insights, and get tailored campaign ideas plus content drafts instantly.
          </p>
        </div>
        <a
          href="#generator"
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Start now
        </a>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section id="generator" className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl shadow-black/30 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Campaign input</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Tell us about your product, audience, and goals.</h2>
              <p className="mt-3 text-slate-400">
                The more details you provide, the more tailored the campaign ideas and drafts will be.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  Product name
                  <input
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Example: Spark Social Scheduler"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  Target audience
                  <input
                    value={targetAudience}
                    onChange={(event) => setTargetAudience(event.target.value)}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Example: small business owners, ecommerce marketers"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-300">
                Product description
                <textarea
                  value={productDescription}
                  onChange={(event) => setProductDescription(event.target.value)}
                  rows={4}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Describe what makes your product unique, key benefits, and offer details."
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                Brand voice
                <input
                  value={brandVoice}
                  onChange={(event) => setBrandVoice(event.target.value)}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Example: confident, warm, modern, expert"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                Campaign goals
                <textarea
                  value={campaignGoals}
                  onChange={(event) => setCampaignGoals(event.target.value)}
                  rows={3}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Example: increase sales, boost signups, launch a new product"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                Past campaign successes
                <textarea
                  value={successes}
                  onChange={(event) => setSuccesses(event.target.value)}
                  rows={3}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Example: high click-through rate on email, a viral social post, strong conversion from influencer ads"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                Past campaign failures
                <textarea
                  value={failures}
                  onChange={(event) => setFailures(event.target.value)}
                  rows={3}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Example: low engagement, poor audience fit, weak messaging"
                />
              </label>

              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Preferred channels</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {channelOptions.map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => toggleChannel(channel)}
                      className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${
                        selectedChannels.includes(channel)
                          ? 'border-cyan-400 bg-cyan-500/10 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-3xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Generate marketing ideas
              </button>
            </form>
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-black/20">
            <div className="rounded-3xl bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Generated output</p>
              <p className="mt-3 text-slate-400">
                Receive campaign ideas, ad copy, social posts, and a draft email using your product details and past performance lessons.
              </p>
            </div>

            {result ? (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Overview</p>
                  <p className="mt-4 text-slate-200">{result.overview}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {result.ideas.map((idea, index) => (
                    <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Idea {index + 1}</p>
                      <p className="mt-3 text-slate-200">{idea}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Ad copy</p>
                    <p className="mt-3 text-slate-200">{result.adCopy}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Social post</p>
                    <p className="mt-3 text-slate-200">{result.socialPost}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Email draft</p>
                    <p className="mt-3 text-slate-200 font-semibold">Subject: {result.emailSubject}</p>
                    <p className="mt-3 whitespace-pre-line text-slate-300">{result.emailBody}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
                Fill out the campaign form and click “Generate marketing ideas” to see tailored suggestions.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
