import React, { useState } from 'react';
import { Camera, Sparkles, RotateCcw } from 'lucide-react';
import { MemberMemory } from '../data/memoriesData';

interface MemberAvatarProps {
  member: MemberMemory;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export const MemberAvatar: React.FC<MemberAvatarProps> = ({
  member,
  className = '',
  size = 'md',
  showLabel = true,
}) => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem(`dopamine_photo_${member.id}`);
  });
  const [imgError, setImgError] = useState(false);

  // Directly attach the real photo by default, custom uploaded photo takes priority if user set one
  const effectivePhoto = customPhotoUrl || (!imgError ? member.photoUrl : null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomPhotoUrl(result);
        localStorage.setItem(`dopamine_photo_${member.id}`, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem(`dopamine_photo_${member.id}`);
    setCustomPhotoUrl(null);
    setImgError(false);
  };

  const sizeClasses = {
    sm: 'w-16 h-20 text-xs',
    md: 'w-48 h-60 text-sm',
    lg: 'w-64 h-80 text-base',
    xl: 'w-full h-80 sm:h-96 text-base',
  }[size];

  // Artistic background colors per member
  const bgHue = member.themeColor || '#7c5ce6';

  return (
    <div
      className={`relative group overflow-hidden rounded-md border-2 border-stone-200/80 bg-stone-100 flex flex-col items-center justify-center select-none shadow-inner ${sizeClasses} ${className}`}
    >
      {effectivePhoto ? (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-stone-900">
          <img
            src={effectivePhoto}
            alt={member.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient vignette & name caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          {showLabel && size !== 'sm' && (
            <span className="absolute bottom-1.5 left-2 right-2 text-center text-[11px] font-bold text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-sans truncate">
              {member.name}
            </span>
          )}
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-between p-3 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${bgHue}18 0%, #fbf6ec 55%, ${bgHue}28 100%)`,
          }}
        >
          {/* Subtle vintage photo grain overlay */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-[radial-gradient(#4a3828_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Top pin/accent */}
          <div className="w-full flex items-center justify-between z-10 opacity-70">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-600 font-sans">
              AMA 5 · #{member.pageNumber}
            </span>
            <Sparkles className="w-3.5 h-3.5" style={{ color: bgHue }} />
          </div>

          {/* Central Portrait Vector Illustration */}
          <div className="relative my-auto flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 120 130"
              className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="65" r="48" fill={bgHue} fillOpacity="0.18" />
              <path
                d="M20 120 C 24 95, 40 85, 60 85 C 80 85, 96 95, 100 120 Z"
                fill={member.gender === 'male' ? '#334155' : bgHue}
                fillOpacity="0.85"
              />
              <rect x="52" y="68" width="16" height="20" rx="4" fill="#fed7aa" />
              <ellipse cx="60" cy="52" rx="22" ry="26" fill="#ffedd5" />
              <circle cx="53" cy="52" r="2.2" fill="#292524" />
              <circle cx="67" cy="52" r="2.2" fill="#292524" />
              <ellipse cx="49" cy="57" rx="3.5" ry="2" fill="#fca5a5" fillOpacity="0.6" />
              <ellipse cx="71" cy="57" rx="3.5" ry="2" fill="#fca5a5" fillOpacity="0.6" />
              <path
                d="M54 62 Q 60 67 66 62"
                stroke="#78350f"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <span className="mt-2 text-xs font-bold text-stone-800 tracking-wide text-center font-display">
              {member.nickname}
            </span>
          </div>

          <div className="z-10 w-full text-center px-1">
            <p className="text-[10px] text-stone-500 italic line-clamp-1">
              {member.photoDescription}
            </p>
          </div>
        </div>
      )}

      {/* Hover action to customize with custom photo if desired */}
      <label
        className="absolute inset-0 bg-stone-900/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white p-2 text-center backdrop-blur-xs z-20"
        title="Ganti foto atau unggah foto kustom"
      >
        <Camera className="w-5 h-5 mb-1 text-sky-300" />
        <span className="text-[11px] font-semibold leading-tight text-white">
          {customPhotoUrl ? 'Ganti Foto Kustom' : 'Ganti Foto'}
        </span>
        {customPhotoUrl && (
          <button
            type="button"
            onClick={handleResetPhoto}
            className="mt-1 px-2 py-0.5 rounded text-[9px] bg-white/20 hover:bg-white/30 text-stone-100 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Kembali ke Foto Asli</span>
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />
      </label>
    </div>
  );
};

