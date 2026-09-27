import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemberMemory } from '../data/memoriesData';
import { AwaremindLogo, DopamineLogo } from './AwaremindLogos';
import { MemberAvatar } from './MemberAvatar';
import { RotateCcw, Sparkles, Heart, Quote, Star, Eye, X, ZoomIn } from 'lucide-react';
import { vintageAudio } from '../utils/audioPlayer';

interface MemberLanyardBadgeProps {
  member: MemberMemory;
  className?: string;
}

export const MemberLanyardBadge: React.FC<MemberLanyardBadgeProps> = ({
  member,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'badge' | 'card'>('badge');
  const [showOriginalModal, setShowOriginalModal] = useState(false);
  const [isLiked, setIsLiked] = useState(() => {
    return localStorage.getItem(`dopamine_liked_${member.id}`) === 'true';
  });
  const [likeCount, setLikeCount] = useState(() => {
    const saved = localStorage.getItem(`dopamine_like_count_${member.id}`);
    return saved ? parseInt(saved, 10) : 15;
  });

  const handleToggleFlip = () => {
    if (viewMode === 'card') return;
    vintageAudio.playPageFlipSound();
    setIsFlipped(!isFlipped);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    vintageAudio.playWaxSealSound();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    const nextCount = nextLiked ? likeCount + 1 : likeCount - 1;
    setLikeCount(nextCount);
    localStorage.setItem(`dopamine_liked_${member.id}`, String(nextLiked));
    localStorage.setItem(`dopamine_like_count_${member.id}`, String(nextCount));
  };

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* View Mode Toggle: Interactive Badge vs Original Artwork */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-indigo-500/30 mb-2 shadow-md z-30">
        <button
          type="button"
          onClick={() => {
            vintageAudio.playPageFlipSound();
            setViewMode('badge');
          }}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            viewMode === 'badge'
              ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          ID Badge
        </button>
        <button
          type="button"
          onClick={() => {
            vintageAudio.playPageFlipSound();
            setViewMode('card');
          }}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
            viewMode === 'card'
              ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-slate-950 shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Desain Asli</span>
        </button>
        <button
          type="button"
          onClick={() => setShowOriginalModal(true)}
          className="p-1 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition-colors"
          title="Perbesar Desain Asli"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {viewMode === 'card' ? (
        /* Original Authentic Card Artwork directly from img */
        <div className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-2xl overflow-hidden border-2 border-indigo-400/50 shadow-2xl bg-slate-950 group">
          <img
            src={member.cardUrl}
            alt={`Desain Asli ${member.name}`}
            className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowOriginalModal(true)}
              className="px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black text-white text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1 shadow-md border border-white/20 cursor-pointer"
            >
              <ZoomIn className="w-3 h-3 text-sky-400" />
              <span>Perbesar</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 1. Authentic Blue Lanyard Strap & Silver Swivel Clip from PDF */}
          <div className="flex flex-col items-center z-20">
            {/* Navy woven lanyard fabric */}
            <div className="w-9 h-12 bg-gradient-to-b from-[#0369a1] via-[#0284c7] to-[#0369a1] rounded-t-sm shadow-md border-x border-sky-300/40 relative">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.18)_3px,rgba(255,255,255,0.18)_6px)]" />
              <div className="absolute bottom-1 inset-x-1.5 h-1.5 bg-sky-200/50 rounded-full" />
            </div>

            {/* Metallic clamp & swivel clip */}
            <div className="w-6 h-3.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-xs shadow-sm border border-slate-300" />
            <div className="w-8 h-4.5 border-[2.5px] border-slate-300 rounded-full -mt-1 bg-transparent shadow-xs" />
            <div className="w-4 h-3.5 bg-gradient-to-b from-slate-200 to-slate-400 rounded-xs -mt-1 shadow-sm" />
          </div>

          {/* 2. Hanging ID Card Holder */}
          <motion.div
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full max-w-[340px] sm:max-w-[370px] cursor-pointer"
            onClick={handleToggleFlip}
          >
            {/* Slot punch hole in the card */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-800/80 rounded-full z-30 shadow-inner" />

            {/* FRONT OF BADGE (Exact match with PDF, Real Logos & Directly Attached Photo) */}
            <div
              className={`w-full rounded-2xl p-4 sm:p-5 pt-6 bg-gradient-to-b from-[#38bdf8]/90 via-[#60a5fa]/90 to-[#818cf8]/90 border-2 border-white/80 shadow-[0_15px_35px_rgba(2,132,199,0.35)] backdrop-blur-md relative overflow-hidden transition-all ${
                isFlipped ? 'invisible' : 'visible'
              }`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Subtle light sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Badge Top Header: Authentic Awaremind & Dopamine Logos */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/30 relative z-10">
                <div className="bg-white/95 px-2.5 py-1 rounded-lg shadow-xs border border-white/80">
                  <AwaremindLogo size={24} />
                </div>
                <div className="bg-white/95 px-2.5 py-1 rounded-lg shadow-xs border border-white/80">
                  <DopamineLogo size={24} />
                </div>
              </div>

              {/* Title Banner: Dopamine Buddies as in PDF */}
              <div className="my-2.5 text-center relative z-10">
                <div className="inline-flex items-center justify-center gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold italic font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-100 drop-shadow-[0_2px_4px_rgba(30,58,138,0.7)]">
                    Dopamine
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-sans drop-shadow-[0_2px_4px_rgba(30,58,138,0.7)] ml-1">
                    Buddies
                  </span>
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300 ml-0.5 animate-pulse" />
                </div>
                {member.role && (
                  <p className="text-[11px] font-bold tracking-widest text-indigo-950 uppercase mt-0.5">
                    ★ {member.role} ★
                  </p>
                )}
              </div>

              {/* Member Photo Frame with Directly Attached Photo */}
              <div className="my-2 flex justify-center relative z-10">
                <div className="p-1.5 sm:p-2 bg-white rounded-xl shadow-md border border-sky-100 transform -rotate-1 hover:rotate-0 transition-transform">
                  <MemberAvatar member={member} size="md" />
                </div>
              </div>

              {/* Introduction Card Box */}
              <div className="mt-3 p-3.5 bg-white/95 rounded-xl shadow-md border border-sky-200/80 relative z-10 text-slate-800 font-sans">
                <Quote className="w-3.5 h-3.5 text-sky-500 mb-1 opacity-70" />
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 font-normal">
                  {member.badgeIntro}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">
                    AMA Batch 5
                  </span>
                  <button
                    type="button"
                    onClick={handleLike}
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                    title="Kirim apresiasi cinta"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isLiked ? 'fill-rose-500 text-rose-500' : 'text-rose-400'
                      }`}
                    />
                    <span>{likeCount}</span>
                  </button>
                </div>
              </div>

              {/* Flip Hint */}
              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium text-white/90 drop-shadow-xs">
                <RotateCcw className="w-3 h-3" />
                <span>Klik ID Card untuk melihat sisi belakang</span>
              </div>
            </div>

            {/* BACK OF BADGE */}
            <div
              className={`absolute inset-0 w-full h-full rounded-2xl p-5 pt-7 bg-gradient-to-b from-white via-indigo-50/70 to-sky-50 border-2 border-indigo-200 shadow-xl text-slate-800 flex flex-col justify-between overflow-hidden ${
                isFlipped ? 'visible' : 'invisible'
              }`}
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-indigo-100 pb-2 mb-3">
                  <div>
                    <span className="text-[10px] tracking-widest text-indigo-500 uppercase font-bold">
                      DOPAMINE PASSPORT
                    </span>
                    <h4 className="text-base font-bold text-slate-900 font-sans">
                      {member.name}
                    </h4>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-indigo-100 text-indigo-800 border border-indigo-200">
                    HALAMAN #{member.pageNumber}
                  </span>
                </div>

                {/* Favorite memory */}
                {member.favoriteMemory && (
                  <div className="mb-3 p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs">
                    <span className="text-[10px] font-bold text-indigo-700 uppercase block mb-0.5">
                      ⭐ Highlight Memori:
                    </span>
                    <p className="text-slate-700 italic">
                      "{member.favoriteMemory}"
                    </p>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Karakteristik:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100 text-[11px] text-purple-900">
                  <p className="font-bold">🌱 AwareMind Ambassador Batch 5</p>
                  <p className="text-slate-600 text-[10px] mt-0.5">
                    Menebar empati, mindfulness, dan cerita baik bersama Dopamine Team.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOriginalModal(true);
                  }}
                  className="text-[11px] font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Desain Asli</span>
                </button>
                <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Balik Kartu
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Lightbox Modal for Authentic Full-Page Scrapbook Design */}
      <AnimatePresence>
        {showOriginalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setShowOriginalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-indigo-500/40 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-3.5 px-5 bg-slate-950/80 border-b border-indigo-500/20 text-white">
                <div>
                  <h3 className="text-sm font-bold font-sans text-sky-300">
                    Desain Halaman Asli · {member.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Scrapbook Kenangan AMA Batch 5
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOriginalModal(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-auto p-4 flex items-center justify-center bg-slate-950">
                <img
                  src={member.cardUrl}
                  alt={`Halaman Asli ${member.name}`}
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg border border-white/10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

