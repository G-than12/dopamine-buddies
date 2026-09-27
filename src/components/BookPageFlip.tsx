import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOPAMINE_MEMBERS, MemberMemory } from '../data/memoriesData';
import { MemberLanyardBadge } from './MemberLanyardBadge';
import { LetterEnvelope } from './LetterEnvelope';
import { vintageAudio } from '../utils/audioPlayer';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Sparkles,
  Search,
  BookOpen,
  Home,
  Check,
  Star,
} from 'lucide-react';

interface BookPageFlipProps {
  initialIndex?: number;
  onGoToCover: () => void;
  onOpenWall: () => void;
}

export const BookPageFlip: React.FC<BookPageFlipProps> = ({
  initialIndex = 0,
  onGoToCover,
  onOpenWall,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shareToast, setShareToast] = useState(false);
  const [activeTabMobile, setActiveTabMobile] = useState<'badge' | 'letter'>('badge');
  const [stickersOnPage, setStickersOnPage] = useState<
    Array<{ id: number; icon: string; x: number; y: number }>
  >([]);

  const currentMember = DOPAMINE_MEMBERS[currentIndex];

  const goToNextPage = useCallback(() => {
    if (currentIndex < DOPAMINE_MEMBERS.length - 1) {
      vintageAudio.playPageFlipSound();
      setDirection('next');
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex]);

  const goToPrevPage = useCallback(() => {
    if (currentIndex > 0) {
      vintageAudio.playPageFlipSound();
      setDirection('prev');
      setCurrentIndex((prev) => prev - 1);
    } else {
      vintageAudio.playPageFlipSound();
      onGoToCover();
    }
  }, [currentIndex, onGoToCover]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  const handleSelectMember = (idx: number) => {
    vintageAudio.playPageFlipSound();
    setDirection(idx > currentIndex ? 'next' : 'prev');
    setCurrentIndex(idx);
    setIsSearchOpen(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2200);
  };

  const addSticker = (icon: string) => {
    vintageAudio.playWaxSealSound();
    const newSticker = {
      id: Date.now(),
      icon,
      x: 35 + Math.random() * 30,
      y: 20 + Math.random() * 40,
    };
    setStickersOnPage((prev) => [...prev, newSticker]);
  };

  const filteredMembers = DOPAMINE_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 3D Page turn variants
  const pageVariants = {
    enter: (dir: 'next' | 'prev') => ({
      rotateY: dir === 'next' ? 20 : -20,
      opacity: 0,
      scale: 0.97,
      x: dir === 'next' ? 60 : -60,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: 'next' | 'prev') => ({
      rotateY: dir === 'next' ? -20 : 20,
      opacity: 0,
      scale: 0.97,
      x: dir === 'next' ? -60 : 60,
      transition: {
        duration: 0.35,
        ease: 'easeIn' as const,
      },
    }),
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-2 sm:py-4 select-none">
      {/* 1. Top Shelf Bar in Dopamine Palette */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 px-3 sm:px-4 py-2.5 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md text-slate-200 shadow-xl">
        {/* Left: Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onGoToCover}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-sky-200 bg-indigo-900/70 hover:bg-indigo-800/80 border border-indigo-400/30 transition-colors cursor-pointer"
            title="Kembali ke Halaman Sampul"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sampul</span>
          </button>

          <button
            type="button"
            onClick={onOpenWall}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-200 hover:text-white bg-indigo-900/70 hover:bg-indigo-800/80 border border-indigo-400/30 transition-colors cursor-pointer"
            title="Lihat Meja Foto Semua Anggota"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Galeri Foto</span>
          </button>

          {/* Quick jump search trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-indigo-950 border border-indigo-500/40 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Cari Teman</span>
            </button>

            {/* Dropdown list */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-slate-900 border border-indigo-500/50 rounded-2xl shadow-2xl p-2 z-50">
                <input
                  type="text"
                  placeholder="Ketik nama atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 mb-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
                  autoFocus
                />
                <div className="space-y-1">
                  {filteredMembers.map((m) => {
                    const originalIdx = DOPAMINE_MEMBERS.findIndex(
                      (item) => item.id === m.id
                    );
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectMember(originalIdx)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          originalIdx === currentIndex
                            ? 'bg-purple-600 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{m.name}</span>
                        <span className="text-[10px] text-purple-300 ml-2">
                          Hal #{m.pageNumber}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Member Name & Page */}
        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="text-sky-300 font-bold uppercase tracking-wider">
            {currentMember.name}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-purple-200 text-[11px] font-semibold">
            Halaman {currentMember.pageNumber} dari 24
          </span>
        </div>

        {/* Right: Fun Stickers & Share */}
        <div className="flex items-center gap-2">
          {/* Add interactive sticker */}
          <div className="hidden lg:flex items-center gap-1 text-xs">
            <span className="text-[10px] text-slate-400 mr-1">Tempel Stiker:</span>
            {['✨', '💙', '💜', '🌟', '💌', '🌸'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addSticker(emoji)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-sm hover:scale-115 transition-transform cursor-pointer"
                title={`Tempel stiker ${emoji} ke halaman`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white bg-indigo-950 border border-indigo-500/40 transition-colors cursor-pointer"
            title="Bagikan tautan album"
          >
            {shareToast ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Bagikan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher for Responsive View */}
      <div className="flex lg:hidden items-center justify-center gap-1 mb-3 p-1 bg-indigo-950/80 rounded-xl border border-indigo-500/30 max-w-xs mx-auto shadow-md">
        <button
          type="button"
          onClick={() => setActiveTabMobile('badge')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTabMobile === 'badge'
              ? 'bg-sky-400 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          📇 ID Card Lanyard
        </button>
        <button
          type="button"
          onClick={() => setActiveTabMobile('letter')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTabMobile === 'letter'
              ? 'bg-purple-400 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          💌 Surat Kesan Pesan
        </button>
      </div>

      {/* 2. THE AUTHENTIC OPEN SCRAPBOOK ALBUM SPREAD */}
      <div className="relative perspective-1200 min-h-[640px]">
        {/* Interactive custom dropped stickers */}
        {stickersOnPage.map((stk) => (
          <motion.div
            key={stk.id}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            className="absolute z-40 text-3xl cursor-grab active:cursor-grabbing drop-shadow-md select-none"
            style={{ left: `${stk.x}%`, top: `${stk.y}%` }}
          >
            {stk.icon}
          </motion.div>
        ))}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full rounded-3xl p-3 sm:p-7 md:p-8 bg-slate-900 border-2 sm:border-4 border-indigo-400/40 shadow-[0_25px_65px_rgba(15,16,38,0.8)] relative overflow-hidden"
          >
            {/* Center Book Spine Crease & Shadow */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-slate-950/40 to-transparent pointer-events-none z-30" />
            <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-r border-indigo-300/30 z-30" />

            {/* Spread Grid: Left Page (Locker Blue) + Right Page (Periwinkle Lace) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* LEFT PAGE: LOCKER BLUE WITH LANYARD BADGE */}
              <div
                className={`rounded-2xl p-4 sm:p-6 bg-locker-blue border-2 border-sky-400/40 shadow-inner flex flex-col items-center justify-between ${
                  activeTabMobile === 'badge' ? 'flex' : 'hidden lg:flex'
                }`}
              >
                <div className="w-full flex items-center justify-between mb-2 px-1 text-white">
                  <span className="text-[11px] font-black font-sans uppercase tracking-widest text-sky-200">
                    Dopamine Buddies
                  </span>
                  <span className="text-xs font-semibold text-sky-100 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>Hal #{currentMember.pageNumber}</span>
                  </span>
                </div>

                <div className="w-full my-auto flex justify-center py-2">
                  <MemberLanyardBadge member={currentMember} />
                </div>

                <div className="w-full text-center mt-3 pt-2 border-t border-sky-400/30 text-sky-100/80 text-[11px]">
                  AwareMind Ambassador Batch 5 · 2024
                </div>
              </div>

              {/* RIGHT PAGE: DREAMY PERIWINKLE LACE WITH LETTER */}
              <div
                className={`rounded-2xl p-4 sm:p-6 bg-dopamine-periwinkle border-2 border-indigo-300/50 shadow-inner flex flex-col items-center justify-between ${
                  activeTabMobile === 'letter' ? 'flex' : 'hidden lg:flex'
                }`}
              >
                <div className="w-full flex items-center justify-between mb-2 px-1 text-indigo-950">
                  <span className="text-[11px] font-black font-sans uppercase tracking-widest text-indigo-900">
                    Kesan & Pesan Kenangan
                  </span>
                  <span className="text-xs font-bold text-indigo-800">
                    Batch 5
                  </span>
                </div>

                <div className="w-full my-auto py-2">
                  <LetterEnvelope member={currentMember} />
                </div>

                <div className="w-full text-center mt-3 pt-2 border-t border-indigo-300/40 text-indigo-950/70 text-[11px] font-semibold">
                  "The journey may end, but the memories will stay."
                </div>
              </div>
            </div>

            {/* Bottom Footer inside the page spread */}
            <div className="mt-6 pt-3 border-t border-indigo-500/20 flex flex-wrap items-center justify-between text-xs text-slate-400 font-sans">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="font-bold text-sky-300">AwareMind Indonesia</span>
                <span>× Dopamine Team</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline italic text-slate-400">
                  Gunakan tombol panah untuk membalik halaman
                </span>
                <span className="font-bold text-white bg-indigo-600/80 px-2.5 py-0.5 rounded-full">
                  Hal. {currentMember.pageNumber} / 24
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. Floating Next & Prev Page Flip Buttons */}
        <button
          type="button"
          onClick={goToPrevPage}
          className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-indigo-950 hover:bg-indigo-900 text-sky-300 border-2 border-sky-400/50 shadow-2xl flex items-center justify-center z-40 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title="Halaman Sebelumnya (Panah Kiri)"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentIndex === DOPAMINE_MEMBERS.length - 1}
          className={`absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-indigo-950 hover:bg-indigo-900 text-sky-300 border-2 border-sky-400/50 shadow-2xl flex items-center justify-center z-40 transition-all hover:scale-110 active:scale-95 cursor-pointer ${
            currentIndex === DOPAMINE_MEMBERS.length - 1
              ? 'opacity-40 cursor-not-allowed'
              : ''
          }`}
          title="Halaman Selanjutnya (Panah Kanan)"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>

      {/* 4. Bottom Page Thumbnail Ribbon Slider */}
      <div className="mt-6 p-3 rounded-2xl bg-indigo-950/70 border border-indigo-500/30 backdrop-blur-xs">
        <div className="flex items-center justify-between mb-2 px-1 text-xs text-slate-300">
          <span className="font-semibold text-sky-300">Daftar Halaman Sahabat:</span>
          <span className="text-[11px] text-slate-400">
            Klik nama untuk langsung membuka halaman mereka
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {DOPAMINE_MEMBERS.map((m, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMember(idx)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold border-white shadow-md scale-105'
                    : 'bg-indigo-900/60 hover:bg-indigo-800 text-slate-200 border-indigo-400/30'
                }`}
              >
                <span>{m.nickname}</span>
                <span className="ml-1 text-[10px] opacity-75 font-mono">
                  #{m.pageNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
