'use client';

import Link from 'next/link';
import { useState, useEffect, FormEvent } from 'react';

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

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<BrandProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    values: '',
    personality: '',
    targetAudience: '',
    brandColors: '',
    story: '',
    tone: '',
  });

  // Load profiles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('brandProfiles');
    if (saved) {
      setProfiles(JSON.parse(saved));
    }
  }, []);

  // Save profiles to localStorage
  const saveProfiles = (updated: BrandProfile[]) => {
    localStorage.setItem('brandProfiles', JSON.stringify(updated));
    setProfiles(updated);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      // Update existing profile
      const updated = profiles.map((p) =>
        p.id === editingId
          ? {
              ...p,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : p
      );
      saveProfiles(updated);
    } else {
      // Create new profile
      const newProfile: BrandProfile = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveProfiles([...profiles, newProfile]);
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      values: '',
      personality: '',
      targetAudience: '',
      brandColors: '',
      story: '',
      tone: '',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (profile: BrandProfile) => {
    setFormData({
      name: profile.name,
      description: profile.description,
      values: profile.values,
      personality: profile.personality,
      targetAudience: profile.targetAudience,
      brandColors: profile.brandColors,
      story: profile.story,
      tone: profile.tone,
    });
    setEditingId(profile.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this brand profile?')) {
      saveProfiles(profiles.filter((p) => p.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      values: '',
      personality: '',
      targetAudience: '',
      brandColors: '',
      story: '',
      tone: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Campaign Pilot
          </p>
          <p className="mt-1 text-2xl font-semibold text-white">Brand Profiles</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/generate" className="transition hover:text-white">
            Generate
          </Link>
          <Link href="/history" className="transition hover:text-white">
            History
          </Link>
          <Link href="/profiles" className="text-cyan-300 transition hover:text-white">
            Profiles
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Brand Profiles</h1>
            <p className="mt-2 text-slate-400">
              Create and manage brand profiles to maintain consistent messaging across campaigns
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              + New Profile
            </button>
          )}
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {editingId ? 'Edit Brand Profile' : 'Create New Brand Profile'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-300">
                    Profile Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury Fashion Brand"
                    required
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300">
                    Brand Tone *
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tone: e.target.value }))
                    }
                    required
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 transition focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="">Select tone...</option>
                    <option value="friendly">Friendly and Approachable</option>
                    <option value="professional">Professional and Confident</option>
                    <option value="luxury">Luxurious and Refined</option>
                    <option value="energetic">Energetic and Bold</option>
                    <option value="clear">Clear and Compelling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300">
                  Brand Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What does your brand do? What makes it unique?"
                  required
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-300">
                    Brand Values
                  </label>
                  <textarea
                    name="values"
                    value={formData.values}
                    onChange={handleInputChange}
                    placeholder="e.g., Sustainability, Innovation, Customer-first"
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300">
                    Brand Personality
                  </label>
                  <textarea
                    name="personality"
                    value={formData.personality}
                    onChange={handleInputChange}
                    placeholder="e.g., Modern, Trustworthy, Playful, Minimalist"
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-300">
                    Target Audience
                  </label>
                  <textarea
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="e.g., Women 25-45, eco-conscious, high income"
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300">
                    Brand Colors
                  </label>
                  <textarea
                    name="brandColors"
                    value={formData.brandColors}
                    onChange={handleInputChange}
                    placeholder="e.g., #FF6B35, #004E89, #F7F7F7"
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300">
                  Brand Story &amp; History
                </label>
                <textarea
                  name="story"
                  value={formData.story}
                  onChange={handleInputChange}
                  placeholder="Tell your brand's story. How did it start? What's your mission?"
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-100 placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  {editingId ? 'Update Profile' : 'Create Profile'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Profiles List */}
        {profiles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {profile.tone && (
                        <span className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-200">
                          {profile.tone}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-slate-300">{profile.description}</p>

                {profile.values && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">Values</p>
                    <p className="mt-1 text-sm text-slate-300">{profile.values}</p>
                  </div>
                )}

                {profile.personality && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase text-slate-400">Personality</p>
                    <p className="mt-1 text-sm text-slate-300">{profile.personality}</p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-950 hover:text-cyan-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile.id)}
                    className="flex-1 rounded-lg border border-red-900/50 bg-red-950/20 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-950/40"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/generate?profileId=${profile.id}`}
                    className="flex-1 rounded-lg bg-cyan-500/20 px-4 py-2 text-center text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/30"
                  >
                    Use Profile
                  </Link>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Updated {new Date(profile.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <p className="text-slate-400">No brand profiles yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Create Your First Profile
            </button>
          </div>
        )}
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
