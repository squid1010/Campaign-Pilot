'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ProfileSelector } from '../components/ProfileSelector';
import { Suspense } from 'react';

type BrandProfile = {
  id: string;
  name: string;
  description: string;
  values: string;
  personality: string;
  targetAudience: string;
  brandColors: string;
  story: string;
  tone: string;
  createdAt: string;
  updatedAt: string;
};

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
  return { wins, losses };
};

const generateStrategicOverview = (
  productName: string,
  productDescription: string,
  targetAudience: string,
  tone: string,
  goalFocus: string,
  wins: string,
  losses: string,
  channels: string[],
): string => {
  const selectedChannels = channels.length ? channels.join(', ') : 'social media and email marketing';
  return `STRATEGIC CAMPAIGN OVERVIEW

Campaign Objective: ${goalFocus}

This integrated campaign is designed to position ${productName} as the must-have solution for ${targetAudience}. Our strategy leverages your past successes—specifically ${wins}—while systematically avoiding previous pitfalls such as ${losses}.

Key Strategic Pillars:
• Audience Connection: We'll speak directly to ${targetAudience} using a ${tone} brand voice that builds trust and resonates with their values
• Value Proposition: Emphasizing that ${productDescription.slice(0, 100)}${productDescription.length > 100 ? '...' : ''}
• Multi-Channel Distribution: Executing across ${selectedChannels} to maximize reach and engagement
• Performance Optimization: Continuously refining based on real-time metrics and audience feedback

This campaign framework ensures consistent messaging while allowing for channel-specific optimization. By combining strategic storytelling with data-driven insights, we'll create momentum that drives measurable business results.`;
};

const generateDetailedIdeas = (
  productName: string,
  productDescription: string,
  targetAudience: string,
  tone: string,
  goalFocus: string,
  channels: string[],
): string[] => {
  const selectedChannels = channels.join(', ');
  
  return [
    `IDEA 1: Authority & Education Play
Create a content series that positions ${productName} as the expert solution. Develop 5-7 in-depth guides or webinars addressing pain points specific to ${targetAudience}. Each piece should highlight a different benefit of ${productName}, using a ${tone} voice that builds credibility. Distribute across ${selectedChannels} with a consistent "Learn from the experts" narrative. This builds authority while naturally showcasing product value without hard-selling, leading to higher-quality leads and improved conversion rates.`,

    `IDEA 2: Social Proof & Community Movement
Leverage real user stories and case studies to demonstrate impact. Create 3-4 detailed success stories from ${targetAudience} that show tangible results—specific metrics, before/after scenarios, and real testimonials. Package these into video clips, carousel posts, and email case studies. The key is authenticity and relatability. When ${targetAudience} see peers achieving results with ${productName}, skepticism dissolves. This approach typically generates 2-3x higher engagement and 40% better conversion than feature-focused messaging.`,

    `IDEA 3: Limited-Time Strategic Offer
Design a compelling launch or seasonal offer that creates urgency without devaluing your product. Rather than discounting, offer added value: extended trial period, bonus resources, exclusive community access, or implementation support. Frame it as a strategic investment in success. Launch across ${selectedChannels} with countdown messaging and early-bird positioning. This tactic drives immediate action while attracting committed customers who are more likely to succeed and advocate for ${productName}.`,
  ];
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
  const { wins, losses } = buildPerformanceInsight(successes, failures);
  const selectedChannels = channels.length ? channels.join(', ') : 'social media and email marketing';

  const overview = generateStrategicOverview(
    productLabel,
    productDescription,
    audienceLabel,
    tone,
    goalFocus,
    wins,
    losses,
    channels,
  );

  const ideas = generateDetailedIdeas(
    productLabel,
    productDescription,
    audienceLabel,
    tone,
    goalFocus,
    channels,
  );

  const adCopy = `PREMIUM AD COPY VARIATIONS

Variation A (Problem-Focused):
${audienceLabel} struggle with [pain point related to ${campaignGoals}]. ${productLabel} eliminates the friction by ${productDescription || 'providing an innovative solution'}. Join thousands who've already transformed their approach. See the difference in days, not months.

Variation B (Benefit-Focused):
Imagine achieving ${goalFocus.toLowerCase()} without the usual complexity. ${productLabel} does exactly that. Built for ${audienceLabel}, designed with a ${tone} approach, and proven to deliver results. Your competitive advantage is one click away.

Variation C (FOMO/Exclusivity):
${audienceLabel} in forward-thinking organizations are already using ${productLabel} to ${goalFocus.toLowerCase()}. Limited seats remain in our exclusive onboarding program. Early adopters get lifetime priority support. Don't let your competitors get ahead.

Pro Tip: A/B test these variations across different audience segments to identify which resonates strongest with your market.`; 

  const socialPost = `SOCIAL MEDIA CONTENT SUITE

Post 1 (Problem Recognition):
Are you ${audienceLabel}? You know the struggle: ${losses}. 

${productLabel} changes that. We built it specifically for people like you who refuse to settle.

[${campaignGoals}] in less time. Better results. Guaranteed.

#${productName.replace(/\s+/g, '')} #${audienceLabel.split(' ')[0]} #${goalFocus.split(' ')[0]}

---

Post 2 (Value Proposition):
What if ${goalFocus.toLowerCase()} was actually easy?

That's the ${productLabel} difference. ${tone} approach. Proven results. Real support.

Join the ${audienceLabel} community reshaping their approach to [industry].

---

Post 3 (Call to Action):
${productName} isn't just another tool—it's your ${goalFocus.toLowerCase()} solution designed for ${audienceLabel}.

🎯 See how in 2 minutes
🚀 Join 10k+ happy users  
💡 Get your first win today

[Link] 

#${productName.replace(/\s+/g, 'Hack')} #GrowthHacking`; 

  const emailSubject = `${audienceLabel}: Here's how to ${goalFocus.toLowerCase()}`; 

  const emailBody = `Subject: ${emailSubject}

Hi there,

We analyzed what works for ${audienceLabel} like you who want to ${goalFocus.toLowerCase()}. Here's what we found:

THE PROBLEM:
Most solutions fail because they don't account for ${losses}. They're generic, slow to implement, and rarely deliver promised results.

THE DIFFERENCE:
${productLabel} is built specifically for ${audienceLabel}. Every feature, every workflow, every interaction has been designed around your reality—not some imaginary "average" customer.

WHY IT WORKS:
✓ ${wins}
✓ Designed for your specific workflows and goals
✓ ${tone} approach that feels natural, not salesy
✓ Results in weeks, not months
✓ Dedicated support from people who get your industry

THE OPPORTUNITY:
We're opening limited seats in our exclusive onboarding program. Early participants get:
→ Custom implementation audit
→ Priority 1-on-1 support
→ Access to our private community
→ Lifetime pricing lock

THE NEXT STEP:
If you're serious about ${goalFocus.toLowerCase()}, let's talk. Book a 15-minute consultation with our team—no pressure, no sales pitch. Just a genuine conversation about your goals and whether ${productLabel} is the right fit.

[Schedule Your Consultation]

Questions? Reply directly to this email. We read every message.

To your success,
The ${productName} Team

P.S. Still not sure? Check out these ${audienceLabel} success stories to see real results: [Link]`; 

  return {
    overview,
    ideas,
    adCopy,
    socialPost,
    emailSubject,
    emailBody,
  };
};

export default function Generate() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandVoice, setBrandVoice] = useState('');
  const [campaignGoals, setCampaignGoals] = useState('');
  const [successes, setSuccesses] = useState('');
  const [failures, setFailures] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Social media', 'Email marketing']);
  const [result, setResult] = useState<MarketingResult | null>(null);

  const handleProfileSelect = (profile: BrandProfile | null) => {
    console.log('handleProfileSelect called with:', profile);
    if (profile) {
      // Auto-fill form fields with profile data
      setTargetAudience(profile.targetAudience);
      setBrandVoice(profile.tone);
      if (profile.description) {
        setProductDescription(profile.description);
      }
    }
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    // Save to history
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      inputs: {
        productName,
        productDescription,
        targetAudience,
        brandVoice,
        campaignGoals,
        successes,
        failures,
        selectedChannels,
      },
      result: generated,
    };
    const existing = localStorage.getItem('marketingHistory');
    const history = existing ? JSON.parse(existing) : [];
    history.push(entry);
    localStorage.setItem('marketingHistory', JSON.stringify(history));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Campaign Pilot</p>
          <p className="mt-2 text-3xl font-semibold text-white">Marketing idea generator</p>
          <p className="mt-3 max-w-2xl text-slate-400">
            Enter your product and campaign details, share past performance insights, and get tailored campaign ideas plus content drafts instantly.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/profiles"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Brand Profiles
          </Link>
          <Link
            href="/history"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            View history
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section id="generator" className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl shadow-black/30 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Campaign input</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Tell us about your product, audience, and goals.</h2>
              <p className="mt-3 text-slate-400">
                The more details you provide, the more tailored the campaign ideas and drafts will be.
              </p>
            </div>

            {/* Brand Profile Selector */}
            <Suspense fallback={<div>Loading...</div>}>
              <ProfileSelector onProfileSelect={handleProfileSelect} />
            </Suspense>

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

          <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-black/20 max-h-[800px] overflow-y-auto">
            <div className="rounded-3xl bg-slate-900 p-6 sticky top-0 bg-slate-900/95 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Generated Strategy</p>
              <p className="mt-3 text-slate-400">
                Comprehensive campaign strategy with multiple variations, detailed tactics, and ready-to-use content.
              </p>
            </div>

            {result ? (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Strategic Overview</p>
                  <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                    {result.overview}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Campaign Ideas</p>
                  {result.ideas.map((idea, index) => (
                    <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                        {idea}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Ad Copy Variations</p>
                    <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                      {result.adCopy}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Social Media Posts</p>
                    <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-200 font-mono text-xs">
                      {result.socialPost}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Email Campaign</p>
                    <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                      <p className="mb-3 font-semibold">Subject: {result.emailSubject}</p>
                      <div className="border-t border-slate-700 pt-3 font-mono text-xs">
                        {result.emailBody}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      const fullContent = `CAMPAIGN GENERATION RESULT\n\n${result.overview}\n\n${result.ideas.join('\n\n')}\n\nAD COPY:\n${result.adCopy}\n\nSOCIAL POSTS:\n${result.socialPost}\n\nEMAIL:\n${result.emailSubject}\n\n${result.emailBody}`;
                      navigator.clipboard.writeText(fullContent);
                      alert('Campaign content copied to clipboard!');
                    }}
                    className="flex-1 rounded-lg border border-cyan-400 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/30"
                  >
                    Copy All
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-950"
                  >
                    Print
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
                Fill out the campaign form and click "Generate marketing ideas" to see tailored suggestions and strategy.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
