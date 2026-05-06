import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Campaign Pilot
          </p>
          <p className="mt-1 text-2xl font-semibold text-white">Campaign Pilot</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
          <Link href="#how-it-works" className="transition hover:text-white">
            How it works
          </Link>
          <Link href="/generate" className="transition hover:text-white">
            Try it now
          </Link>
          <Link href="/profiles" className="transition hover:text-white">
            Brand Profiles
          </Link>
          <Link href="/history" className="transition hover:text-white">
            History
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="grid gap-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-10 shadow-2xl shadow-cyan-500/10 sm:grid-cols-[1.2fr_0.8fr] sm:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              AI-powered marketing campaigns
            </span>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Campaign Pilot
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Campaign Pilot helps you generate creative, effective marketing campaigns in minutes. Whether you&apos;re a small business owner or a marketing professional, our AI-powered tool makes it easier to brainstorm ideas, draft content, and build strategies that work.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Try it now
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
              >
                See how it works
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-black/20">
            <div className="rounded-3xl bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Campaign analytics
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Conversion uplift</p>
                  <p className="mt-2 text-3xl font-semibold text-white">+32%</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Customer reach</p>
                  <p className="mt-2 text-3xl font-semibold text-white">1.2M</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Automated workflows</p>
                  <p className="mt-2 text-3xl font-semibold text-white">72+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mt-16 rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl shadow-black/20">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                How it works
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                From campaign concept to conversion, all steps are automated.
              </h2>
              <p className="max-w-xl text-slate-400">
                Plan, launch, and optimize campaigns with a single platform that understands your audience, your offers, and what converts.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Define goals",
                  detail: "Choose your objective, audience, and channels in one intuitive workspace.",
                },
                {
                  step: "2",
                  title: "Build campaigns",
                  detail: "Let AI generate assets, suggestions, and templates tailored to your brand.",
                },
                {
                  step: "3",
                  title: "Optimize continually",
                  detail: "Track performance in real time and let automation optimize budgets and creatives.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-sm font-semibold text-slate-950">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/90 py-8 text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Campaign Pilot. Built for data-driven marketing teams.</p>
          <p>Privacy · Terms · Support</p>
        </div>
      </footer>
    </div>
  );
}
