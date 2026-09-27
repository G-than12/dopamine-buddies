import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemberMemory } from '../data/memoriesData';
import { AwaremindLogo, DopamineLogo } from './AwaremindLogos';
import { vintageAudio } from '../utils/audioPlayer';
import confetti from 'canvas-confetti';
import {
  Copy,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
  Pin,
  Heart,
  Mail,
} from 'lucide-react';

interface LetterEnvelopeProps {
  member: MemberMemory;
  className?: string;
}

export const LetterEnvelope: React.FC<LetterEnvelopeProps> = ({
  member,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [waxSealPopped, setWaxSealPopped] = useState(false);
  const [userNote, setUserNote] = useState(() => {
    return localStorage.getItem(`dopamine_custom_note_${member.id}`) || '';
  });
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleCopy = () => {
    const fullText = `Surat dari ${member.letterFrom} untuk ${member.letterTo}:\n\n${member.letterContent.join(
      '\n\n'
    )}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${member.letterFrom}. Untuk ${member.letterTo}. ${member.letterContent.join(
      ' '
    )}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleWaxSealClick = (e: React.MouseEvent) => {
    vintageAudio.playWaxSealSound();
    setWaxSealPopped(true);
    setTimeout(() => setWaxSealPopped(false), 800);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 65,
      origin: { x, y },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#facc15', '#f43f5e'],
      disableForReducedMotion: true,
    });
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`dopamine_custom_note_${member.id}`, userNote);
    setShowNoteInput(false);
    vintageAudio.playWaxSealSound();
  };

  return (
    <div className={`relative select-text w-full ${className}`}>
      {/* 1. White Scalloped Lace Doily Paper Sheet as in PDF right side */}
      <div className="relative bg-white rounded-3xl p-5 sm:p-8 sm:px-9 border-2 border-indigo-200/90 shadow-[0_15px_35px_rgba(99,102,241,0.2)] text-slate-900 overflow-hidden">
        {/* Subtle periwinkle polka dot / lace texture from PDF */}
        <div className="absolute inset-0 bg-dopamine-periwinkle opacity-20 pointer-events-none" />

        {/* Vintage Top Stamp & Postmark (Top-Left) & Logos (Top-Right) */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          {/* Post Envelope Icon Stamp from PDF */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-12 h-14 sm:w-14 sm:h-16 rounded-md p-1 bg-amber-50 shadow-md border border-amber-300 flex flex-col items-center justify-between">
              <span className="text-[7px] font-bold text-amber-800 tracking-wider">
                AMA BATCH 5
              </span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white">
                <Mail className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[6.5px] font-mono text-slate-500 font-bold">
                POST 2024
              </span>
              {/* Postmark wave stamp */}
              <div className="absolute -right-2 -top-1.5 w-8 h-8 rounded-full border-2 border-dashed border-indigo-400/50 pointer-events-none flex items-center justify-center rotate-12">
                <span className="text-[5.5px] font-bold text-indigo-700">DOPAMINE</span>
              </div>
            </div>

            <div className="washi-tape-cyan px-2.5 py-0.5 text-[9px] font-bold text-sky-900 rounded-sm transform -rotate-1 hidden sm:block">
              Surat Kenangan
            </div>
          </div>

          {/* Official Logos Header matching PDF */}
          <div className="flex items-center gap-2.5 bg-slate-50/90 px-3 py-1.5 rounded-xl border border-indigo-100 shadow-xs backdrop-blur-xs">
            <AwaremindLogo size={24} />
            <div className="h-4 w-px bg-indigo-200" />
            <DopamineLogo size={24} />
          </div>
        </div>

        {/* Soft Divider */}
        <div className="w-full flex items-center gap-2 mb-4">
          <div className="h-0.5 grow bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
          <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase font-sans">
            Kesan & Pesan Terakhir
          </span>
          <div className="h-0.5 grow bg-gradient-to-r from-indigo-200 via-indigo-200 to-transparent" />
        </div>

        {/* Letter Headers: From & To matching PDF format */}
        <div className="space-y-1.5 mb-5 relative z-10 border-b border-indigo-100 pb-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 font-sans">
              From:
            </span>
            <span className="text-base sm:text-xl font-extrabold text-slate-900 font-sans tracking-tight">
              {member.letterFrom}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-600 font-sans">
              To:
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 font-sans italic">
              {member.letterTo}
            </span>
          </div>
        </div>

        {/* Letter Body Text */}
        <div className="relative z-10 space-y-3 font-sans text-slate-800 leading-relaxed text-sm sm:text-[15px]">
          {member.letterContent.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-slate-700 font-normal leading-relaxed tracking-normal"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* User Attached Memo (if any) */}
        {userNote && (
          <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-200 relative transform -rotate-1">
            <div className="absolute -top-2 left-4 washi-tape-lilac px-2.5 py-0.5 text-[8px] text-purple-950 font-bold uppercase rounded-xs">
              Memo Pribadi Kamu
            </div>
            <p className="text-xs text-purple-950 font-sans italic pt-1">
              "{userNote}"
            </p>
          </div>
        )}

        {/* Letter Footer Actions & Golden Medallion Stamp matching PDF bottom-right */}
        <div className="mt-6 pt-3.5 border-t border-indigo-100 flex flex-wrap items-center justify-between gap-3 relative z-10">
          {/* Functional Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              title="Salin isi surat kenangan"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>

            {'speechSynthesis' in window && (
              <button
                type="button"
                onClick={handleSpeech}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'bg-purple-100 text-purple-700 border-purple-300 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
                title={isSpeaking ? 'Hentikan baca' : 'Dengarkan isi surat'}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Hening</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Bacakan</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowNoteInput(!showNoteInput)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors cursor-pointer"
              title="Tambahkan memo kecil untuk surat ini"
            >
              <Pin className="w-3.5 h-3.5 text-sky-600" />
              <span>Memo</span>
            </button>
          </div>

          {/* Golden Medallion Wax Seal Stamp from PDF */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans text-slate-500 italic hidden sm:inline">
              Sentuh segel emas ✨
            </span>
            <button
              type="button"
              onClick={handleWaxSealClick}
              className={`gold-medallion cursor-pointer transition-transform ${
                waxSealPopped ? 'scale-115' : 'hover:scale-108 active:scale-95'
              }`}
              title="Segel Emas Resmi Dopamine Team - Klik!"
            >
              <div className="flex flex-col items-center justify-center text-amber-900 select-none">
                <Heart className="w-4 h-4 fill-amber-800" />
                <span className="text-[7.5px] font-black tracking-wider mt-0.5">
                  AMA 5
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Collapsible Memo Form */}
        <AnimatePresence>
          {showNoteInput && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSaveNote}
              className="mt-3 pt-3 border-t border-indigo-100 flex gap-2"
            >
              <input
                type="text"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder={`Tulis memo kecil kenangan bersama ${member.nickname}...`}
                className="grow px-3 py-1.5 text-xs rounded-xl border border-indigo-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Simpan
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
