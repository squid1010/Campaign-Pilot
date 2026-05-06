'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

type ProfileSelectorProps = {
  onProfileSelect: (profile: BrandProfile | null) => void;
};

export function ProfileSelector({ onProfileSelect }: ProfileSelectorProps) {
  const searchParams = useSearchParams();
  const [brandProfiles, setBrandProfiles] = useState<BrandProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState('');

  // Load brand profiles from localStorage and check URL parameters
  useEffect(() => {
    const saved = localStorage.getItem('brandProfiles');
    if (saved) {
      const profiles = JSON.parse(saved);
      setBrandProfiles(profiles);

      // Check if a profile was selected via URL parameter
      const profileIdParam = searchParams.get('profileId');
      if (profileIdParam) {
        const profile = profiles.find((p: BrandProfile) => p.id === profileIdParam);
        if (profile) {
          setSelectedProfileId(profileIdParam);
          onProfileSelect(profile);
        }
      }
    }
  }, [searchParams, onProfileSelect]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const profileId = e.target.value;
    setSelectedProfileId(profileId);

    if (profileId) {
      const profile = brandProfiles.find((p) => p.id === profileId);
      if (profile) {
        console.log('Profile selected:', profile);
        onProfileSelect(profile);
      }
    } else {
      console.log('No profile selected');
      onProfileSelect(null);
    }
  };

  if (brandProfiles.length === 0) {
    return null; // No profiles yet, don't show selector
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Apply brand profile</p>
      <select
        value={selectedProfileId}
        onChange={handleProfileChange}
        className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 transition focus:border-cyan-400 focus:outline-none"
      >
        <option value="">Select a brand profile to auto-fill...</option>
        {brandProfiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-slate-500">
        Selecting a profile will auto-fill your target audience and brand voice for consistency.
      </p>
    </div>
  );
}
