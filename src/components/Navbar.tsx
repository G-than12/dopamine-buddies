import React from 'react';
import { Music, BookOpen, Sparkles } from 'lucide-react';
import { DopamineLogo } from './AwaremindLogos';

interface NavbarProps {
  currentView: 'cover' | 'book' | 'wall' | 'guestbook' | 'about';
  onNavigate: (view: 'cover' | 'book' | 'wall' | 'guestbook' | 'about') => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isPlayingMusic,
  onToggleMusic,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0f22]/90 border-b border-indigo-500/20 backdrop-blur-md px-3 sm:px-8 py-2.5 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('cover')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <DopamineLogo size={28} showText={false} />
          <span className="text-base sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-300 font-sans group-hover:from-sky-300 group-hover:to-purple-200 transition-all">
            Dopamine Buddies
          </span>
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button
            type="button"
            onClick={() => onNavigate('cover')}
            className={`transition-colors cursor-pointer hover:text-sky-300 ${
              currentView === 'cover'
                ? 'text-sky-400 border-b-2 border-sky-400 pb-0.5'
                : 'text-slate-300'
            }`}
          >
            Sampul
          </button>
          <button
            type="button"
            onClick={() => onNavigate('book')}
            className={`transition-colors cursor-pointer hover:text-sky-300 ${
              currentView === 'book'
                ? 'text-sky-400 border-b-2 border-sky-400 pb-0.5'
                : 'text-slate-300'
            }`}
          >
            Buku Kenangan
          </button>
          <button
            type="button"
            onClick={() => onNavigate('wall')}
            className={`transition-colors cursor-pointer hover:text-sky-300 ${
              currentView === 'wall'
                ? 'text-sky-400 border-b-2 border-sky-400 pb-0.5'
                : 'text-slate-300'
            }`}
          >
            Galeri Foto
          </button>
          <button
            type="button"
            onClick={() => onNavigate('guestbook')}
            className={`transition-colors cursor-pointer hover:text-sky-300 ${
              currentView === 'guestbook'
                ? 'text-sky-400 border-b-2 border-sky-400 pb-0.5'
                : 'text-slate-300'
            }`}
          >
            Pojok Pesan
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer hover:text-sky-300 ${
              currentView === 'about'
                ? 'text-sky-400 border-b-2 border-sky-400 pb-0.5'
                : 'text-slate-300'
            }`}
          >
            Tentang Batch 5
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Music Quick Toggle */}
          <button
            type="button"
            onClick={onToggleMusic}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isPlayingMusic
                ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold shadow-xs'
                : 'bg-indigo-950 hover:bg-indigo-900 text-sky-200 border border-indigo-500/40'
            }`}
            title={isPlayingMusic ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isPlayingMusic ? 'Musik Aktif' : 'Putar Musik'}
            </span>
          </button>

          {/* Book action */}
          {currentView !== 'book' && (
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-300 hover:to-sky-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buka Album</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
