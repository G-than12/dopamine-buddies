import React, { useState } from 'react';
import { DOPAMINE_MEMBERS, MemberMemory } from '../data/memoriesData';
import { MemberAvatar } from './MemberAvatar';
import { vintageAudio } from '../utils/audioPlayer';
import { Search, Sparkles, Star, Heart } from 'lucide-react';

interface MemoryWallProps {
  onSelectMember: (index: number) => void;
  onGoToCover: () => void;
}

export const MemoryWall: React.FC<MemoryWallProps> = ({
  onSelectMember,
  onGoToCover,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredMembers = DOPAMINE_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.nickname.toLowerCase().includes(search.toLowerCase()) ||
      m.letterContent.some((p) => p.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedTag === 'all') return true;
    if (selectedTag === 'Mind Captain') return m.role === 'Mind Captain';
    return m.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  const handleCardClick = (idx: number) => {
    vintageAudio.playPolaroidSnap();
    onSelectMember(idx);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 select-none">
      {/* Top Banner */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-400/30 text-sky-300 text-xs font-sans font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Galeri Polaroid Kenangan Dopamine Buddies</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 tracking-tight">
          23 Sahabat Dopamine Team
        </h2>

        <p className="text-slate-300 text-sm max-w-xl mx-auto font-sans leading-relaxed">
          Sentuh foto polaroid untuk langsung membuka lembar ID Card dan surat kesan pesan mereka di dalam buku kenangan.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
          <div className="relative grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
            <input
              type="text"
              placeholder="Cari teman atau pesan kenangan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400 shadow-md"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-indigo-950/80 rounded-2xl border border-indigo-500/30 shadow-md">
            {['all', 'Mind Captain'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tag === 'all' ? 'Semua (23)' : tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
        {filteredMembers.map((member, index) => {
          const originalIndex = DOPAMINE_MEMBERS.findIndex((m) => m.id === member.id);
          const rotationAngle = [-2, 1.5, -1, 2, -1.8, 1.2, -0.8][index % 7];
          const tapeClasses = [
            'washi-tape-cyan text-sky-950',
            'washi-tape-lilac text-purple-950',
            'washi-tape-yellow text-amber-950',
          ][index % 3];

          return (
            <div
              key={member.id}
              onClick={() => handleCardClick(originalIndex)}
              style={{ transform: `rotate(${rotationAngle}deg)` }}
              className="group relative cursor-pointer polaroid-frame rounded-2xl border border-indigo-100 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
            >
              {/* Realistic washi tape on top of the polaroid */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 text-[9px] font-black uppercase tracking-widest z-10 rounded-sm ${tapeClasses}`}
              >
                HALAMAN #{member.pageNumber}
              </div>

              {/* Photo Area */}
              <div className="relative overflow-hidden rounded-xl bg-slate-100 mb-3 border border-slate-200">
                <MemberAvatar member={member} size="xl" />

                {member.role === 'Mind Captain' && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-slate-950" />
                    <span>Mind Captain</span>
                  </div>
                )}
              </div>

              {/* Note underneath photo */}
              <div className="space-y-1.5 text-center font-sans">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {member.name}
                </h3>

                <p className="text-[11px] text-slate-600 italic line-clamp-2 px-1 leading-snug">
                  "{member.letterContent[0]}"
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-[10px] text-slate-500">
                  <span className="font-semibold text-indigo-700">
                    {member.nickname}
                  </span>
                  <span className="text-purple-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Buka Surat ➔
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <p className="text-base">Tidak ada teman yang cocok dengan pencarian.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedTag('all');
            }}
            className="mt-3 px-4 py-2 rounded-xl text-xs bg-sky-400 text-slate-950 font-bold"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};
