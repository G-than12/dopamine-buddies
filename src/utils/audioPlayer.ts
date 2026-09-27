/**
 * Audio Engine for Vintage Scrapbook
 * Generates warm, gentle nostalgic background music and authentic scrapbook sound effects
 * using the Web Audio API without relying on external media hosts.
 */

class VintageAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.35;
  private timerId: number | null = null;
  private vinylNode: AudioNode | null = null;
  private masterGain: GainNode | null = null;
  private vinylGain: GainNode | null = null;
  private isVinylEnabled: boolean = true;
  private customAudio: HTMLAudioElement | null = null;
  private currentMode: 'ambient-piano' | 'lofi-sunset' | 'starry-night' | 'custom' = 'ambient-piano';
  private chordIndex: number = 0;
  private onStateChange: ((isPlaying: boolean) => void) | null = null;

  // Chord frequencies (Hz) for nostalgic progression
  // Progression 1: Fmaj9 -> Am9 -> Dm9 -> Bbmaj7 (Soothing, sentimental)
  private readonly pianoChords = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9 (F3, A3, C4, E4, G4)
    [110.00, 164.81, 220.00, 261.63, 329.63], // Am9 (A2, E3, A3, C4, E4)
    [146.83, 220.00, 261.63, 293.66, 349.23], // Dm9 (D3, A3, C4, D4, F4)
    [116.54, 174.61, 233.08, 293.66, 349.23], // Bbmaj7 (Bb2, F3, Bb3, D4, F4)
    [130.81, 196.00, 246.94, 293.66, 392.00], // C6/9 (C3, G3, B3, D4, G4)
    [110.00, 164.81, 196.00, 246.94, 329.63], // Am7 (A2, E3, G3, B3, E4)
    [87.31, 130.81, 174.61, 220.00, 261.63],  // Fmaj7/A
    [98.00, 146.83, 196.00, 246.94, 293.66],  // Gsus4 -> G
  ];

  // Progression 2: Warm sunset lo-fi chords
  private readonly lofiChords = [
    [155.56, 196.00, 233.08, 311.13, 349.23], // Ebmaj9
    [130.81, 196.00, 233.08, 261.63, 311.13], // Cm9
    [116.54, 174.61, 207.65, 261.63, 311.13], // Fm9
    [116.54, 174.61, 233.08, 277.18, 349.23], // Bb13
  ];

  constructor() {
    // Lazy audio context creation on user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.vinylGain = this.ctx.createGain();
      this.vinylGain.gain.setValueAtTime(this.isVinylEnabled ? 0.04 : 0, this.ctx.currentTime);
      this.vinylGain.connect(this.masterGain);

      this.startVinylNoise();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private startVinylNoise() {
    if (!this.ctx || !this.vinylGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter approximation
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        let val = (b0 + b1 + b2 + white * 0.5362) * 0.08;
        // Vinyl crackle spikes randomly
        if (Math.random() < 0.0015) {
          val += (Math.random() - 0.5) * 0.6;
        }
        output[i] = val;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass for warm needle sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 1.2;

      whiteNoise.connect(filter);
      filter.connect(this.vinylGain);
      whiteNoise.start();
      this.vinylNode = whiteNoise;
    } catch (e) {
      console.warn('Vinyl noise init error:', e);
    }
  }

  public setCallback(cb: (playing: boolean) => void) {
    this.onStateChange = cb;
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public play() {
    this.initContext();
    this.isPlaying = true;
    if (this.onStateChange) this.onStateChange(true);

    if (this.currentMode === 'custom' && this.customAudio) {
      this.customAudio.play().catch(console.warn);
      return;
    }

    this.chordIndex = 0;
    this.scheduleNextChord();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleVinyl(enabled?: boolean) {
    this.isVinylEnabled = enabled !== undefined ? enabled : !this.isVinylEnabled;
    if (this.vinylGain && this.ctx) {
      this.vinylGain.gain.setValueAtTime(this.isVinylEnabled ? 0.04 : 0, this.ctx.currentTime);
    }
    return this.isVinylEnabled;
  }

  public getIsVinylEnabled(): boolean {
    return this.isVinylEnabled;
  }

  public setTrackMode(mode: 'ambient-piano' | 'lofi-sunset' | 'starry-night') {
    this.currentMode = mode;
    this.chordIndex = 0;
    if (this.isPlaying) {
      if (this.timerId) clearTimeout(this.timerId);
      this.scheduleNextChord();
    }
  }

  public getTrackMode() {
    return this.currentMode;
  }

  public loadCustomFile(file: File) {
    const url = URL.createObjectURL(file);
    if (!this.customAudio) {
      this.customAudio = new Audio();
      this.customAudio.loop = true;
    }
    this.customAudio.src = url;
    this.customAudio.volume = this.volume;
    this.currentMode = 'custom';
    if (this.isPlaying) {
      if (this.timerId) clearTimeout(this.timerId);
      this.customAudio.play().catch(console.warn);
    }
  }

  private scheduleNextChord() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const chords = this.currentMode === 'lofi-sunset' ? this.lofiChords : this.pianoChords;
    const chord = chords[this.chordIndex % chords.length];
    this.chordIndex++;

    this.playChord(chord, 3.8);

    // Arpeggiate gentle high notes
    const delayStep = 4500; // ms
    this.timerId = window.setTimeout(() => {
      this.scheduleNextChord();
    }, delayStep);
  }

  private playChord(frequencies: number[], duration: number) {
    if (!this.ctx || !this.masterGain) return;

    frequencies.forEach((freq, idx) => {
      const stagger = idx * 0.12; // Gentle strum / arpeggio feel
      const noteTime = this.ctx!.currentTime + stagger;

      // Soft tone oscillator (mix of sine + soft triangle)
      const osc = this.ctx!.createOscillator();
      const osc2 = this.ctx!.createOscillator();
      const noteGain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.002, noteTime); // subtle warm chorus

      // Warm low-pass filter for vintage lo-fi felt piano
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(this.currentMode === 'starry-night' ? 650 : 850, noteTime);
      filter.Q.value = 1.0;

      // ADSR Envelope
      noteGain.gain.setValueAtTime(0, noteTime);
      noteGain.gain.linearRampToValueAtTime(0.12 / frequencies.length, noteTime + 0.15); // soft attack
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + duration); // long acoustic release

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain!);

      osc.start(noteTime);
      osc2.start(noteTime);
      osc.stop(noteTime + duration + 0.1);
      osc2.stop(noteTime + duration + 0.1);

      // Add a tiny upper harmonic chime occasionally
      if (idx === frequencies.length - 1 && Math.random() > 0.4) {
        this.playHighChime(freq * 2, noteTime + 0.4);
      }
    });
  }

  private playHighChime(freq: number, startTime: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.015, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.0);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 2.1);
    } catch {
      // ignore
    }
  }

  // --- Sound Effects ---

  /** Soft paper page flip sound */
  public playPageFlipSound() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const duration = 0.28;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const progress = i / bufferSize;
        // Envelope curve: gentle swoosh
        const env = Math.sin(progress * Math.PI) * (1 - progress * 0.4);
        data[i] = (Math.random() * 2 - 1) * env;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + duration);
      filter.Q.value = 1.8;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      console.warn(e);
    }
  }

  /** Vintage wax seal stamp / thud sound */
  public playWaxSealSound() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.22);
    } catch (e) {
      console.warn(e);
    }
  }

  /** Polaroid vintage camera click */
  public playPolaroidSnap() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const time = this.ctx.currentTime;
      // High click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, time);
      osc.frequency.exponentialRampToValueAtTime(600, time + 0.04);
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.06);

      // Shutter release mechanic click
      setTimeout(() => {
        if (!this.ctx) return;
        const t2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const g2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(450, t2);
        osc2.frequency.exponentialRampToValueAtTime(80, t2 + 0.08);
        g2.gain.setValueAtTime(0.22, t2);
        g2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.09);
        osc2.connect(g2);
        g2.connect(this.ctx.destination);
        osc2.start(t2);
        osc2.stop(t2 + 0.1);
      }, 70);
    } catch (e) {
      console.warn(e);
    }
  }
}

export const vintageAudio = new VintageAudioEngine();
