import React, { useState } from 'react';

/**
 * Authentic original logos:
 * - /img/LOGO AWAREMIND INDONESIA.jpg & /img/logo-awaremind-icon.jpg
 * - /img/LOGO TEAM DOPAMINE.jpeg & /img/logo-dopamine-icon.jpg
 */

export const AwaremindLogo: React.FC<{
  className?: string;
  size?: number;
  showText?: boolean;
}> = ({ className = '', size = 38, showText = true }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-2 select-none shrink-0 ${className}`}>
      {/* Official AwareMind Emblem */}
      <div
        className={`overflow-hidden flex items-center justify-center bg-white shadow-2xs border border-sky-100 shrink-0 ${
          showText ? 'rounded-lg p-0.5' : 'rounded-full p-1'
        }`}
        style={{ width: size, height: size }}
      >
        {!imgError ? (
          <img
            src="/img/logo-awaremind-icon.jpg"
            alt="AwareMind Indonesia"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src="/img/LOGO AWAREMIND INDONESIA.jpg"
            alt="AwareMind Indonesia"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[13px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] via-[#2563eb] to-[#7c3aed] font-sans">
            awaremind
          </span>
          <span className="text-[7.5px] font-bold tracking-[0.25em] text-[#4f46e5] uppercase">
            INDONESIA
          </span>
        </div>
      )}
    </div>
  );
};

export const DopamineLogo: React.FC<{
  className?: string;
  size?: number;
  showText?: boolean;
}> = ({ className = '', size = 38, showText = true }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-2 select-none shrink-0 ${className}`}>
      {/* Official Dopamine Team Molecule Emblem */}
      <div
        className={`overflow-hidden flex items-center justify-center bg-white shadow-2xs border border-indigo-100 shrink-0 ${
          showText ? 'rounded-lg p-0.5' : 'rounded-full p-1'
        }`}
        style={{ width: size, height: size }}
      >
        {!imgError ? (
          <img
            src="/img/logo-dopamine-icon.jpg"
            alt="Dopamine Team"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src="/img/LOGO TEAM DOPAMINE.jpeg"
            alt="Dopamine Team"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span className="text-[13px] font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 font-sans">
            DOPAMINE
          </span>
          <span className="text-[7.5px] font-black tracking-[0.25em] text-[#6366f1] uppercase mt-0.5">
            TEAM
          </span>
        </div>
      )}
    </div>
  );
};

export const AwaremindFullBadge: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 80,
}) => {
  return (
    <img
      src="/img/LOGO AWAREMIND INDONESIA.jpg"
      alt="AwareMind Indonesia Logo Asli"
      style={{ width: size, height: size }}
      className={`object-contain rounded-2xl shadow-md border border-white/60 bg-white ${className}`}
    />
  );
};

export const DopamineFullBadge: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 80,
}) => {
  return (
    <img
      src="/img/LOGO TEAM DOPAMINE.jpeg"
      alt="Dopamine Team Logo Asli"
      style={{ width: size, height: size }}
      className={`object-contain rounded-2xl shadow-md border border-white/60 bg-white ${className}`}
    />
  );
};

