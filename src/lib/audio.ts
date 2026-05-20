/**
 * Procedural Web Audio Synthesizer for Serene Focus Ambiance.
 * Generates beautiful, lightweight, royalty-free audio textures natively.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private mainGain: GainNode | null = null;
  private isMuted: boolean = false;
  private currentType: 'rain' | 'birds' | 'silence' | 'library' = 'silence';
  private intervals: number[] = [];
  private activeNodes: AudioNode[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.setValueAtTime(0.3, this.ctx.currentTime); // moderate default volume
      this.mainGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundscape(type: 'rain' | 'birds' | 'silence' | 'library') {
    this.initCtx();
    this.stopAll();
    this.currentType = type;

    if (!this.ctx || !this.mainGain || this.isMuted) return;

    if (type === 'rain') {
      this.startRain();
    } else if (type === 'birds') {
      this.startBirds();
    } else if (type === 'library') {
      this.startLibrary();
    }
  }

  private stopAll() {
    this.intervals.forEach(clearTimeout);
    this.intervals = [];

    this.activeNodes.forEach(node => {
      try {
        (node as any).stop?.();
        node.disconnect();
      } catch (e) {
        // Suppress errors for nodes that aren't actively running
      }
    });
    this.activeNodes = [];
  }

  /**
   * Rain Soundscape: Low-pass filtered pink noise with dynamic volume modulations.
   */
  private startRain() {
    if (!this.ctx || !this.mainGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate Pink Noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // normalise
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter to make it warmer/atmospheric (rain is soft!)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    // LFO modulator to simulate waves/winds of rain
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow 12-second cycles

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.6, this.ctx.currentTime);

    // Direct connections
    lfo.connect(lfoGain);
    lfoGain.connect(rainGain.gain);

    noiseSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.mainGain);

    lfo.start();
    noiseSource.start();

    this.activeNodes.push(noiseSource, filter, rainGain, lfo);

    // Generate randomized soft raindrops
    const dropRain = () => {
      if (this.currentType !== 'rain' || !this.ctx || !this.mainGain) return;
      
      // Make synthetic droplet (high passed filtered click)
      const dropOsc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      
      dropOsc.type = 'triangle';
      const baseFreq = 80 + Math.random() * 120;
      dropOsc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      dropOsc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.05);

      dropGain.gain.setValueAtTime(0.015 * Math.random(), this.ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      dropOsc.connect(dropGain);
      dropGain.connect(this.mainGain);

      dropOsc.start();
      dropOsc.stop(this.ctx.currentTime + 0.06);

      const nextDrop = 120 + Math.random() * 400; // random rhythm
      const timer = window.setTimeout(dropRain, nextDrop);
      this.intervals.push(timer);
    };

    dropRain();
  }

  /**
   * Birds Soundscape: Synthesized procedural forest bird whistles using sine sweeps.
   */
  private startBirds() {
    if (!this.ctx || !this.mainGain) return;

    // Soft breeze background
    const windOsc = this.ctx.createOscillator();
    const windGain = this.ctx.createGain();
    windOsc.type = 'sine';
    windOsc.frequency.setValueAtTime(120, this.ctx.currentTime);
    windGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    windOsc.connect(windGain);
    windGain.connect(this.mainGain);
    
    windOsc.start();
    this.activeNodes.push(windOsc, windGain);

    const singBird = () => {
      if (this.currentType !== 'birds' || !this.ctx || !this.mainGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      
      const startFreq = 1500 + Math.random() * 1500;
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      
      // Multi-sweep bird whistle
      const count = 3 + Math.floor(Math.random() * 3);
      let time = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0, time);
      
      for (let i = 0; i < count; i++) {
        gain.gain.linearRampToValueAtTime(0.05 + Math.random() * 0.04, time + 0.05);
        osc.frequency.exponentialRampToValueAtTime(startFreq + 500 * Math.random(), time + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
        time += 0.15 + Math.random() * 0.05;
      }

      osc.connect(gain);
      gain.connect(this.mainGain);

      osc.start();
      osc.stop(time + 0.1);

      // Repeat singing in 3-8 seconds
      const delay = 3000 + Math.random() * 5000;
      const timer = window.setTimeout(singBird, delay);
      this.intervals.push(timer);
    };

    singBird();
  }

  /**
   * Library Soundscape: Low brownian rumble with distant page shuffles.
   */
  private startLibrary() {
    if (!this.ctx || !this.mainGain) return;

    // Cozy fireplace / distant rumble (Brown noise)
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain adjustment
    }

    const brownSource = this.ctx.createBufferSource();
    brownSource.buffer = noiseBuffer;
    brownSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, this.ctx.currentTime); // heavy low hum

    const libraryGain = this.ctx.createGain();
    libraryGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    brownSource.connect(filter);
    filter.connect(libraryGain);
    libraryGain.connect(this.mainGain);

    brownSource.start();
    this.activeNodes.push(brownSource, filter, libraryGain);

    // Random distant page turns/book thuds
    const thudBook = () => {
      if (this.currentType !== 'library' || !this.ctx || !this.mainGain) return;

      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();

      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(60 + Math.random() * 40, this.ctx.currentTime);
      thudOsc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.4);

      thudGain.gain.setValueAtTime(0.03 * Math.random(), this.ctx.currentTime);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      thudOsc.connect(thudGain);
      thudGain.connect(this.mainGain);

      thudOsc.start();
      thudOsc.stop(this.ctx.currentTime + 0.5);

      const delay = 8000 + Math.random() * 15000;
      const timer = window.setTimeout(thudBook, delay);
      this.intervals.push(timer);
    };

    thudBook();
  }

  public stop() {
    this.stopAll();
    this.currentType = 'silence';
  }

  public setVolume(vol: number) {
    this.initCtx();
    if (this.mainGain && this.ctx) {
      this.mainGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }
}

export const soundscapeEngine = new AudioSynthesizer();
