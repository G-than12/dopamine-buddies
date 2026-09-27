import React, { useState, useEffect } from 'react';
import { vintageAudio } from '../utils/audioPlayer';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Sparkles,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export const AudioPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isVinylOn, setIsVinylOn] = useState(true);
  const [trackMode, setTrackMode] = useState<
    'ambient-piano' | 'lofi-sunset' | 'starry-night'
  >('ambient-piano');
  const [isExpanded, setIsExpanded] = useState(false);
  const [customTrackName, setCustomTrackName] = useState<string | null>(null);

  useEffect(() => {
    vintageAudio.setCallback((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  const handleTogglePlay = () => {
    vintageAudio.togglePlay();
    setIsPlaying(vintageAudio.getIsPlaying());
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    vintageAudio.setVolume(val);
  };

  const handleToggleVinyl = () => {
    const nextState = vintageAudio.toggleVinyl();
    setIsVinylOn(nextState);
  };

  const handleSelectTrack = (
    mode: 'ambient-piano' | 'lofi-sunset' | 'starry-night'
  ) => {
    setTrackMode(mode);
    setCustomTrackName(null);
    vintageAudio.setTrackMode(mode);
    if (!isPlaying) {
      vintageAudio.play();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomTrackName(file.name);
      vintageAudio.loadCustomFile(file);
      if (!isPlaying) {
        vintageAudio.play();
      }
    }
  };

  const trackTitles = {
    'ambient-piano': 'Memories in F Major (Soft Piano)',
    'lofi-sunset': 'Dopamine Sunset (Warm Lo-Fi)',
    'starry-night': 'Starlit Night (Ambient Felt)',
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 select-none">
      <div className="relative bg-[#0d0f22]/95 border-2 border-indigo-500/40 rounded-3xl shadow-[0_15px_35px_rgba(30,27,75,0.7)] backdrop-blur-md text-slate-200 p-2.5 sm:p-3.5 transition-all duration-300">
        {/* Compact Bar View */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Animated Spinning Vinyl Disk */}
          <div
            onClick={handleTogglePlay}
            className="relative w-10 h-10 rounded-full bg-slate-950 border border-indigo-400/40 flex items-center justify-center cursor-pointer shadow-md group shrink-0"
            title="Klik untuk Putar / Jeda Musik Latar"
          >
            {/* Vinyl record grooves */}
            <div
              className={`w-full h-full rounded-full border border-slate-700/60 flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-sky-400 to-purple-500 flex items-center justify-center border border-white/60 shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              </div>
            </div>

            {/* Play/Pause overlay indicator */}
            <div className="absolute inset-0 bg-slate-950/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? (
                <Pause className="w-4 h-4 text-sky-300 fill-sky-300" />
              ) : (
                <Play className="w-4 h-4 text-sky-300 fill-sky-300 ml-0.5" />
              )}
            </div>
          </div>

          {/* Track Info & Visualizer */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer max-w-[130px] sm:max-w-[190px]"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-black tracking-widest text-sky-400 font-sans">
                Musik Latar
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <div className="w-0.5 bg-sky-400 animate-pulse h-2" />
                  <div className="w-0.5 bg-purple-400 animate-pulse h-3 delay-100" />
                  <div className="w-0.5 bg-sky-300 animate-pulse h-1.5 delay-200" />
                </div>
              )}
            </div>
            <p className="text-xs font-bold text-slate-100 truncate font-sans">
              {customTrackName || trackTitles[trackMode]}
            </p>
          </div>

          {/* Quick Play/Pause button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-indigo-400 text-slate-950 flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik Lembut'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-slate-950" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
            )}
          </button>

          {/* Expand / Collapse toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
            title="Pengaturan Musik"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Expanded Controls Panel */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-indigo-500/20 space-y-3 font-sans">
            {/* Track Switcher */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Pilih Suasana Akustik:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {(['ambient-piano', 'lofi-sunset', 'starry-night'] as const).map(
                  (mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleSelectTrack(mode)}
                      className={`text-left px-2.5 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        trackMode === mode && !customTrackName
                          ? 'bg-gradient-to-r from-sky-500/20 to-purple-500/20 text-sky-200 font-bold border border-sky-400/40'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{trackTitles[mode]}</span>
                      {trackMode === mode && !customTrackName && (
                        <Sparkles className="w-3 h-3 text-sky-400 shrink-0 ml-1" />
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Volume & Vinyl Crackle */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 grow">
                <button
                  type="button"
                  onClick={() => {
                    const next = volume > 0 ? 0 : 0.35;
                    setVolume(next);
                    vintageAudio.setVolume(next);
                  }}
                  className="text-slate-400 hover:text-slate-200"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Vinyl needle crackle toggle */}
              <button
                type="button"
                onClick={handleToggleVinyl}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border transition-colors cursor-pointer shrink-0 ${
                  isVinylOn
                    ? 'bg-purple-900/40 text-purple-300 border-purple-500/50'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
                title="Efek kresek piringan hitam klasik"
              >
                Vinyl {isVinylOn ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Custom Song Upload */}
            <div className="pt-2 border-t border-indigo-500/20 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 truncate">
                Pakai lagu pilihan sendiri?
              </span>
              <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-sky-200 text-xs font-bold border border-indigo-400/40 cursor-pointer transition-colors">
                <Upload className="w-3 h-3" />
                <span>Upload MP3</span>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
