import React from 'react';
import { motion } from 'motion/react';
import { AwaremindLogo, DopamineLogo } from './AwaremindLogos';
import { BookOpen, Sparkles, Compass, Heart, Users, Calendar } from 'lucide-react';
import { vintageAudio } from '../utils/audioPlayer';
import confetti from 'canvas-confetti';

interface CoverPageProps {
  onOpenBook: () => void;
  onExploreWall: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  onOpenBook,
  onExploreWall,
}) => {
  const handleOpenBook = () => {
    vintageAudio.playPageFlipSound();
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#f43f5e', '#fbbf24'],
    });
    onOpenBook();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 sm:my-8 px-3 sm:px-6 select-none">
      {/* Scrapbook Album Cover Outer Binding in PDF Style */}
      <div className="relative rounded-3xl p-5 sm:p-10 sm:py-14 bg-dopamine-cover border-4 border-indigo-500/40 shadow-[0_25px_60px_-10px_rgba(49,46,129,0.7)] text-white overflow-hidden">
        {/* Soft light beam streaks matching page 1 */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.07)_50%,transparent_75%)] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />

        {/* Inside Content Frame */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top Logo Pills as in PDF Page 1 */}
          <div className="w-full flex items-center justify-between gap-3 pb-6 border-b border-indigo-400/20">
            {/* Left Pill: Awaremind */}
            <div className="bg-white/95 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg border border-white/80">
              <AwaremindLogo size={32} />
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-400/30 text-xs font-semibold text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>AMA BATCH 5 MEMORIES</span>
            </div>

            {/* Right Pill: Dopamine Team */}
            <div className="bg-white/95 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg border border-white/80">
              <DopamineLogo size={32} />
            </div>
          </div>

          {/* Central Illuminated 3D Dopamine Molecule Icon from Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="my-8 sm:my-10 relative flex flex-col items-center justify-center"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-sky-400/30 via-indigo-500/30 to-purple-500/30 flex items-center justify-center border-2 border-indigo-300/40 shadow-[0_0_40px_rgba(129,140,248,0.4)] backdrop-blur-md">
              <DopamineLogo size={90} showText={false} />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-sky-300 animate-pulse" />
          </motion.div>

          {/* Album Title Typography matching PDF Cover */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider font-sans text-3d-dopamine uppercase drop-shadow-lg">
              DOPAMINE
            </h1>
            <p className="text-lg sm:text-2xl font-black tracking-[0.3em] uppercase text-indigo-200 font-sans -mt-1 sm:-mt-2">
              TEAM
            </p>

            <div className="pt-3 pb-1">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold font-sans tracking-tight text-white drop-shadow-[0_2px_8px_rgba(30,27,75,0.8)]">
                Kesan & Pesan Dari Dopamine Team
              </h2>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold font-sans tracking-tight text-purple-200 mt-1">
                Untuk Awaremind Indonesia
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto leading-relaxed pt-2">
              30 hari bersama AwareMind Ambassador (AMA) Batch 5. Mengarungi cerita, belajar digital well-being, tawa welcoming party, dan kehangatan yang tak terlupakan.
            </p>
          </div>

          {/* Milestone Stats */}
          <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 backdrop-blur-xs text-center shadow-md">
              <span className="text-2xl font-black text-sky-300 font-sans block">
                30 Hari
              </span>
              <span className="text-[11px] text-slate-300 font-sans">
                Perjalanan Indah
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 backdrop-blur-xs text-center shadow-md">
              <span className="text-2xl font-black text-purple-300 font-sans block">
                23 Buddies
              </span>
              <span className="text-[11px] text-slate-300 font-sans">
                Dopamine Family
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 backdrop-blur-xs text-center shadow-md">
              <span className="text-2xl font-black text-pink-300 font-sans block">
                1 Safespace
              </span>
              <span className="text-[11px] text-slate-300 font-sans">
                AwareMind Indonesia
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 backdrop-blur-xs text-center shadow-md">
              <span className="text-2xl font-black text-amber-300 font-sans block">
                Abadi
              </span>
              <span className="text-[11px] text-slate-300 font-sans">
                Memori & Cerita
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleOpenBook}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-900 bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-300 hover:from-sky-300 hover:to-purple-200 shadow-[0_4px_25px_rgba(56,189,248,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-slate-950" />
              <span>Buka Buku Scrapbook</span>
            </button>

            <button
              type="button"
              onClick={onExploreWall}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold text-sm text-purple-100 hover:text-white bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Lihat Meja Foto (23 Buddies)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
