/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CoverPage } from './components/CoverPage';
import { BookPageFlip } from './components/BookPageFlip';
import { MemoryWall } from './components/MemoryWall';
import { GuestbookWall } from './components/GuestbookWall';
import { AboutPage } from './components/AboutPage';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';
import { vintageAudio } from './utils/audioPlayer';
import { DOPAMINE_MEMBERS } from './data/memoriesData';

export default function App() {
  const [currentView, setCurrentView] = useState<'cover' | 'book' | 'wall' | 'guestbook' | 'about'>('cover');
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number>(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  useEffect(() => {
    vintageAudio.setCallback((playing) => {
      setIsPlayingMusic(playing);
    });
  }, []);

  const handleToggleMusic = () => {
    vintageAudio.togglePlay();
  };

  const handleOpenBookAt = (index: number = 0) => {
    setSelectedMemberIndex(index);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0e23] text-slate-100 flex flex-col relative selection:bg-purple-500 selection:text-white">
      {/* Universal Top Bar Contract Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          vintageAudio.playPageFlipSound();
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Content Area */}
      <main className="grow flex flex-col justify-center py-2 sm:py-6">
        {currentView === 'cover' && (
          <CoverPage
            onOpenBook={() => handleOpenBookAt(0)}
            onExploreWall={() => {
              vintageAudio.playPageFlipSound();
              setCurrentView('wall');
            }}
          />
        )}

        {currentView === 'book' && (
          <BookPageFlip
            initialIndex={selectedMemberIndex}
            onGoToCover={() => {
              vintageAudio.playPageFlipSound();
              setCurrentView('cover');
            }}
            onOpenWall={() => {
              vintageAudio.playPageFlipSound();
              setCurrentView('wall');
            }}
          />
        )}

        {currentView === 'wall' && (
          <MemoryWall
            onSelectMember={(index) => handleOpenBookAt(index)}
            onGoToCover={() => setCurrentView('cover')}
          />
        )}

        {currentView === 'guestbook' && <GuestbookWall />}

        {currentView === 'about' && (
          <AboutPage
            onOpenMember={(index) => handleOpenBookAt(index)}
            onOpenBook={() => handleOpenBookAt(0)}
          />
        )}
      </main>

      {/* Floating Aesthetic Vinyl / Lo-Fi Audio Player Widget */}
      <AudioPlayerWidget />

      {/* Footer */}
      <footer className="w-full py-5 text-center text-xs text-slate-400 border-t border-indigo-500/20 bg-[#080918]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans font-medium text-slate-300">
            Dopamine Team · AwareMind Ambassador (AMA) Batch 5 · 2024
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-sans">
            <span className="text-sky-400 font-bold">23 Buddies</span>
            <span>·</span>
            <span className="text-purple-400 font-bold">30 Hari Bertumbuh</span>
            <span>·</span>
            <span>Kenangan Abadi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
