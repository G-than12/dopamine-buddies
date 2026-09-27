import React from 'react';
import { AwaremindLogo, DopamineLogo } from './AwaremindLogos';
import { DOPAMINE_MEMBERS } from '../data/memoriesData';
import { Sparkles, Heart, Shield, BookOpen, Star } from 'lucide-react';

interface AboutPageProps {
  onOpenMember: (index: number) => void;
  onOpenBook: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenMember,
  onOpenBook,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 select-none font-sans text-slate-100">
      {/* Hero Badge */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-400/30 text-sky-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Kilas Balik Perjalanan 30 Hari</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300 tracking-tight">
          Tentang Dopamine Team & AwareMind
        </h2>

        <p className="text-slate-300 text-sm max-w-xl mx-auto font-sans leading-relaxed">
          Ruang aman bagi 23 sahabat bertalenta untuk saling mendukung, berproses, dan merawat kesehatan mental generasi muda Indonesia.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* AwareMind Indonesia */}
        <div className="p-6 rounded-3xl bg-indigo-950/70 border border-indigo-500/30 shadow-xl relative overflow-hidden backdrop-blur-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-2xl shadow-sm">
              <AwaremindLogo size={36} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">
                AwareMind Indonesia
              </h3>
              <p className="text-xs text-sky-300 font-sans">
                Komunitas & Platform Mental Health
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-3">
            AwareMind Indonesia adalah ruang aman (safe space) bagi generasi muda untuk memahami diri sendiri, merawat kesehatan emosional, mengurangi kebiasaan doomscrolling lewat digital well-being, dan berani bersuara tentang kesehatan mental.
          </p>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-indigo-500/20 text-xs text-slate-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Memberikan validasi emosi dan ruang bertumbuh yang inklusif.</span>
          </div>
        </div>

        {/* Dopamine Team */}
        <div className="p-6 rounded-3xl bg-indigo-950/70 border border-indigo-500/30 shadow-xl relative overflow-hidden backdrop-blur-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-2xl shadow-sm">
              <DopamineLogo size={36} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">
                Dopamine Team · AMA Batch 5
              </h3>
              <p className="text-xs text-purple-300 font-sans">
                Dopamine Buddies Family
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-3">
            Dinamai dari neurotransmitter motivasi dan kebahagiaan, Dopamine Team mengukir 30 hari penuh kenangan tak tergantikan. Dari kehebohan yel-yel "Sound Horeg" di welcoming party, vlogging mindful morning, hingga saling menyemangati saat deadline tiba.
          </p>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-indigo-500/20 text-xs text-slate-300 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 shrink-0" />
            <span>"The journey may end, but the memories will stay."</span>
          </div>
        </div>
      </div>

      {/* Roster of 23 Members */}
      <div className="p-6 sm:p-8 rounded-3xl bg-indigo-950/80 border border-indigo-500/30 shadow-2xl mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-indigo-500/20">
          <div>
            <h3 className="text-xl font-bold text-sky-300 font-sans">
              Daftar 23 Sahabat Dopamine Buddies
            </h3>
            <p className="text-xs text-slate-400">
              Klik nama untuk langsung membuka halaman pesan kenangan mereka
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBook}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Buka dari Halaman #2</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {DOPAMINE_MEMBERS.map((member, index) => (
            <button
              key={member.id}
              type="button"
              onClick={() => onOpenMember(index)}
              className="text-left p-3 rounded-2xl bg-slate-900/80 hover:bg-indigo-900/80 border border-indigo-500/30 hover:border-sky-400/60 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate mr-2">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-9 h-9 rounded-full object-cover border border-sky-400/40 shrink-0 shadow-xs group-hover:border-sky-300 group-hover:scale-105 transition-all"
                />
                <div className="truncate">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-sky-300 block truncate font-sans">
                    {member.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {member.role || 'Dopamine Buddy'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-sky-300 bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-500/30 shrink-0">
                #{member.pageNumber}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
