import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vintageAudio } from '../utils/audioPlayer';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Pin, Trash2, MessageSquareHeart } from 'lucide-react';

interface GuestbookNote {
  id: string;
  sender: string;
  message: string;
  color: string;
  sticker: string;
  rotation: number;
  timestamp: string;
}

const INITIAL_NOTES: GuestbookNote[] = [
  {
    id: 'note-1',
    sender: 'Mind Captain Fellika',
    message:
      'Terima kasih semuanya untuk sebulan yang luar biasa! Sound horeg welcoming dopamine bakal jadi kenangan abadi kita selamanya! 🎵✨',
    color: '#e0e7ff', // soft indigo
    sticker: '👑',
    rotation: -1.5,
    timestamp: 'Dopamine Leader',
  },
  {
    id: 'note-2',
    sender: 'Gathan Hilabi',
    message:
      'AwareMind telah menjadi safespace yang luar biasa. Sukses terus untuk teman-teman semua, tetap saling terhubung ya! 💙',
    color: '#e0f2fe', // soft sky
    sticker: '🌟',
    rotation: 1.5,
    timestamp: 'Stay in touch',
  },
  {
    id: 'note-3',
    sender: 'Cecil',
    message:
      'Ngl joining this was the best decision! Panik bareng sebelum deadline dan random chats di grup bakal ngangenin banget 🥹💜',
    color: '#f3e8ff', // soft purple
    sticker: '💜',
    rotation: -1,
    timestamp: 'Dopamine Fam',
  },
  {
    id: 'note-4',
    sender: 'Dinkaa',
    message:
      'Terima kasih Dopamine Team & AwareMind sudah narik aku keluar dari doomscrolling! Tetap mindful dan luangkan waktu untuk bernafas 🍃',
    color: '#dcfce7', // soft mint
    sticker: '🍃',
    rotation: 2,
    timestamp: 'Mindful Morning',
  },
];

export const GuestbookWall: React.FC = () => {
  const [notes, setNotes] = useState<GuestbookNote[]>(() => {
    const saved = localStorage.getItem('dopamine_guestbook_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_NOTES;
  });

  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('#e0e7ff');
  const [selectedSticker, setSelectedSticker] = useState('✨');

  useEffect(() => {
    localStorage.setItem('dopamine_guestbook_notes', JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    vintageAudio.playWaxSealSound();
    const newNote: GuestbookNote = {
      id: `note-${Date.now()}`,
      sender: senderName.trim(),
      message: message.trim(),
      color: selectedColor,
      sticker: selectedSticker,
      rotation: (Math.random() - 0.5) * 5,
      timestamp: 'Baru saja',
    };

    setNotes([newNote, ...notes]);
    setSenderName('');
    setMessage('');

    confetti({
      particleCount: 35,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#facc15', '#f43f5e'],
    });
  };

  const handleDelete = (id: string) => {
    vintageAudio.playPageFlipSound();
    setNotes(notes.filter((n) => n.id !== id));
  };

  const colorOptions = [
    { label: 'Indigo Impian', value: '#e0e7ff' },
    { label: 'Biru Awan', value: '#e0f2fe' },
    { label: 'Lilac Dopamine', value: '#f3e8ff' },
    { label: 'Mint Segar', value: '#dcfce7' },
    { label: 'Mawar Pastel', value: '#ffe4e6' },
  ];

  const stickerOptions = ['✨', '💌', '🌸', '☕', '🌟', '💜', '🍃', '🫶🏻', '🎉'];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 select-none">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-400/30 text-sky-300 text-xs font-semibold">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Pojok Curhat & Doa Kenangan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-300">
          Tinggalkan Pesan Untuk Dopamine Buddies
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto font-sans">
          Tuliskan kesan, ucapan terima kasih, atau doa baik untuk sahabat Dopamine Team dan keluarga besar AwareMind Indonesia.
        </p>
      </div>

      {/* Input Note Form in Crisp White & Lavender Scrapbook */}
      <div className="max-w-2xl mx-auto mb-10 p-5 sm:p-7 rounded-3xl bg-white border-2 border-indigo-200 shadow-2xl text-slate-800 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape-lilac px-5 py-1 text-xs font-bold uppercase tracking-wider text-purple-950 rounded-sm">
          Tulis Memo Kenangan ✍️
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Nama Kamu:
            </label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Contoh: Gathan, Cecil, atau Rekan Batch 5..."
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-indigo-200 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Pesan / Kenangan Hangat:
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan terima kasih atau momen paling berkesan bagimu..."
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-indigo-200 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400 leading-relaxed"
            />
          </div>

          {/* Color & Sticker pickers */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Warna Kertas:
              </span>
              <div className="flex items-center gap-1.5">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setSelectedColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    className={`w-6 h-6 rounded-full border border-slate-300 transition-transform cursor-pointer ${
                      selectedColor === c.value
                        ? 'scale-125 ring-2 ring-indigo-600'
                        : 'hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Pilih Stiker:
              </span>
              <div className="flex items-center gap-1">
                {stickerOptions.map((stk) => (
                  <button
                    key={stk}
                    type="button"
                    onClick={() => setSelectedSticker(stk)}
                    className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-transform cursor-pointer ${
                      selectedSticker === stk
                        ? 'bg-purple-200 scale-120'
                        : 'hover:scale-110'
                    }`}
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 shadow-md transition-all flex items-center gap-2 cursor-pointer ml-auto"
            >
              <Pin className="w-3.5 h-3.5" />
              <span>Tempel Memo</span>
            </button>
          </div>
        </form>
      </div>

      {/* Pinned Sticky Notes Wall */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                backgroundColor: note.color,
                transform: `rotate(${note.rotation}deg)`,
              }}
              className="relative p-5 rounded-2xl shadow-xl border border-indigo-200/60 text-slate-900 group select-text transition-transform hover:scale-103 hover:z-20 duration-200"
            >
              {/* Pin on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border border-indigo-800 shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Note sticker badge */}
              <div className="absolute top-2 right-2 text-xl select-none">
                {note.sticker}
              </div>

              {/* Note Message */}
              <p className="text-sm sm:text-base font-sans text-slate-800 leading-snug my-2 pr-6">
                "{note.message}"
              </p>

              {/* Footer Sender */}
              <div className="mt-4 pt-2 border-t border-slate-900/10 flex items-center justify-between text-xs font-sans">
                <span className="font-bold text-slate-900 truncate">
                  ~ {note.sender}
                </span>
                <span className="text-[10px] text-slate-600 font-mono">
                  {note.timestamp}
                </span>
              </div>

              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-600 transition-opacity"
                title="Hapus memo ini"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
