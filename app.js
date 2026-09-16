/**
 * SUPER NITZ & THE HYROX QUEST
 * Interactive Logic, Mini-Games, Web Audio, Emoji Particle Bursts, and Canvas Confetti
 */

class HyroxApp {
  constructor() {
    this.soundEnabled = true;
    this.audioCtx = null;
    this.hugCount = 0;
    this.energyScore = 0;
    this.completedStations = new Set(); // Station 1 unlocked initially, stations 2-8 locked
    this.totalStations = 8;
    
    // Mini game states
    this.sledTaps = 0;
    this.sledMax = 10;
    this.sledDone = false;

    this.burpeeJumps = 0;
    this.burpeeMax = 4;
    this.burpeeDone = false;

    this.wallBallHits = 0;
    this.wallBallMax = 3;
    this.wallBallDone = false;

    // Deeply Loving, Motivating & Race-Day Pep Talks from Dora (Zero em-dashes)
    this.pepQuotes = [
      { text: "Bhondu, remember how hard you trained for this! Take a deep breath, keep that cute chin up, and show that turf what you are made of!", tag: "CHAMPION MINDSET", emoji: "⭐" },
      { text: "Even if your legs feel heavy, remember: you are 90% determination, 10% pure cuteness, and 100% unstoppable!", tag: "BEAST MODE", emoji: "🔥" },
      { text: "I am cheering for you so loud, even the judges in the Roxzone can hear my heart beating for you, meri jaan!", tag: "PURE LOVE", emoji: "🥰" },
      { text: "Pacing is key, meri Bhondu! Smooth running, steady stations, and that signature mischievous smile that lights up my whole world!", tag: "PACING WISDOM", emoji: "👟" },
      { text: "Fun fact: When you cross the finish line, you officially get 10,000 Dora points, endless fruit smoothies, and unlimited foot rubs forever!", tag: "CHEEKY DORA", emoji: "🍓" },
      { text: "Look at that runner bib: #01 Athlete! You are already my champion, now just go out there and have the time of your life!", tag: "CHAMPION MINDSET", emoji: "🥇" },
      { text: "Thakna mana hai, haar maanna impossible hai, and looking insanely adorable while lifting heavy is your superpower!", tag: "BEAST MODE", emoji: "💪" },
      { text: "Whenever you feel the burn, imagine each repetition is a warm squeeze from me waiting to scoop you up at the finish line!", tag: "PURE LOVE", emoji: "🫂" },
      { text: "Wall balls? Sleds? SkiErg? Nothing in this arena is as fierce as my Bhondu when she sets her mind to conquer something!", tag: "BEAST MODE", emoji: "🦁" },
      { text: "Breathe in bravery, breathe out nerves. You are doing something 99% of people only dream of doing. I could not be prouder of you!", tag: "COURAGE", emoji: "✨" },
      { text: "Tu meri sabse strong, sabse fearless, aur sabse pyaari rockstar hai. Jab tu turf par utarti hai, arena roshan ho jata hai!", tag: "PURE LOVE", emoji: "💖" },
      { text: "Every drop of sweat today is proof of your dedication. Run like the wind, breathe deep, and know Dora's eyes are always watching you with pure awe.", tag: "PACING WISDOM", emoji: "💨" },
      { text: "Whenever self-doubt whispers in your ear, remember: Dora believes in you 1000 times more than you can ever doubt yourself!", tag: "COURAGE", emoji: "🛡️" },
      { text: "Station 4, Station 6, Station 8: take it one station at a time, Bhondu! Don't race the whole clock, just win the rep right in front of you!", tag: "SUB-1.5H MISSION", emoji: "🎯" },
      { text: "Teri yeh fighting spirit dekh kar mera dil har roz tere pyaar mein dubara girta hai. Go shine today, my brave superhero!", tag: "PURE LOVE", emoji: "💘" },
      { text: "Feeling that lactic acid burn? That is just your inner beast waking up! Smile at the pain and keep those feet dancing!", tag: "BEAST MODE", emoji: "🔥" },
      { text: "Finish line par clock time jo bhi dikhaye, meri nazar mein tu pehle hi gold standard set kar chuki hai. Bas enjoy kar aur udaan bhar!", tag: "CHAMPION MINDSET", emoji: "👑" },
      { text: "Sub-1.5 hours is not just a dream, it is the result of every early morning and every rep you did. It belongs to you, Bhondu!", tag: "SUB-1.5H MISSION", emoji: "⏱️" },
      { text: "Your legs are strong, your lungs are ready, your heart is pure gold, and you have Dora cheering in your corner forever!", tag: "PURE LOVE", emoji: "❤️" },
      { text: "When the sled feels heavy, lean in lower, drive through the turf, and whisper: 'Dora is waiting with the warmest hug!'", tag: "SLED POWER", emoji: "🏋️‍♀️" },
      { text: "Bhondu, you are not just participating today, you are writing your own inspiring story. Hold your head high and own every single meter!", tag: "COURAGE", emoji: "📖" },
      { text: "If you need strength in the middle of a run, take a deep breath and feel my hand in yours. I am right there running alongside your spirit!", tag: "PURE LOVE", emoji: "🤝" },
      { text: "No one has your heart, no one has your grit, and definitely no one looks that cute while conquering 8 kilometers of sheer grind!", tag: "CHEEKY DORA", emoji: "🐰" },
      { text: "Remember to relax your shoulders, unclench your jaw, and let your rhythm take over. Flow like water, strike like lightning!", tag: "PACING WISDOM", emoji: "⚡" },
      { text: "Tu meri favorite human hai aur hamesha rahegi. Win or learn, you are my ultimate hero, meri jaan!", tag: "PURE LOVE", emoji: "🌹" },
      { text: "The pain is temporary, but the feeling of conquering HYROX and hearing your name called will last forever. Go get it, champ!", tag: "CHAMPION MINDSET", emoji: "🏆" },
      { text: "Whenever you pass a cheering crowd, remember the loudest cheer in that entire building is coming straight from Dora's soul for you!", tag: "PURE LOVE", emoji: "📢" },
      { text: "Burpees getting spicy? Count to four: hands down, chest flat, pop up, leap! Robotic perfection, just like we practiced!", tag: "BURPEE RHYTHM", emoji: "🐸" },
      { text: "Dora's official race contract: After this, all grocery carrying, heavy lifting, and cooking duties are 100% mine for the next month!", tag: "CHEEKY DORA", emoji: "🥐" },
      { text: "You turned fear into focus and sweat into strength. Look at how far you have come, Bhondu. Now go claim your victory lap!", tag: "COURAGE", emoji: "🌈" },
      { text: "Sub-90 minutes is calling your name! Keep those transitions sharp, breathe through the nose, and keep that fiery spirit blazing!", tag: "SUB-1.5H MISSION", emoji: "🚀" },
      { text: "Tu fearless hai, tu powerful hai, aur tu meri sabse pyari Bhondu hai. Bas dil khol ke daud, baaki sab Dora sambhal lega!", tag: "PURE LOVE", emoji: "✨" },
      { text: "Every wall ball that hits the center of the target is a kiss from Dora waiting for you at the finish arch!", tag: "TARGET LOCK", emoji: "💋" },
      { text: "Never look at what others are doing. This is YOUR race, YOUR pace, and YOUR moment to shine bright like the sun!", tag: "CHAMPION MINDSET", emoji: "☀️" },
      { text: "One kilometer at a time, one rep at a time. Before you know it, you will hear the finish crowd roaring for Super Nitz!", tag: "PACING WISDOM", emoji: "🏁" },
      { text: "Bhondu, jab tu thakne lage, bas aankhein band karke sochna: Dora finish line par khada hai, dono baazu khole hue, sirf tere liye!", tag: "PURE LOVE", emoji: "🫂" },
      { text: "You have survived 100% of your hardest training days, and today you are going to thrive. Trust yourself like I trust you!", tag: "COURAGE", emoji: "💎" },
      { text: "When you feel like stopping, remember why you started. Every step is bringing you closer to glory, and Dora is so proud!", tag: "CHAMPION MINDSET", emoji: "🔥" },
      { text: "Dora's promise: No matter how sweaty or exhausted you are at the end, the biggest, warmest bear hug is waiting right for you!", tag: "PURE LOVE", emoji: "🧸" },
      { text: "Head up, shoulders back, smile on your face. You are the baddest, bravest, and most beautiful athlete in this entire arena!", tag: "CHAMPION MINDSET", emoji: "🌸" }
    ];

    // Real Warm Hug states and Dora whispers
    this.doraWhispers = [
      "Dora is squeezing you super tight right now!",
      "Take a deep breath... Dora's got you, Bhondu.",
      "Infinite warmth sent straight to your heart!",
      "Holding you close until all the butterflies disappear!",
      "Breathe in bravery, breathe out nerves. You're loved!",
      "Wrapped in Dora's arms, you're 100% unstoppable!",
      "Whenever you feel the burn, remember Dora is holding your hand!"
    ];
    this.whisperIdx = 0;
    this.hugHoldTimer = null;
    this.hugPulseInterval = null;
    this.warmthTimeout = null;
    this.isHoldingHug = false;
    this.holdPressActive = false;
    this.holdStartTime = 0;
    this.activePointerId = null;

    // Creative, Fun & Modern Scribbly Heart Popup Messages on Hug Completion (4 rotating variations with custom vector SVGs)
    this.hugVariations = [
      {
        tag: "DORA TURBO BATTERY",
        svgIcon: `<svg viewBox="0 0 48 48" class="theme-svg"><circle cx="24" cy="24" r="22" fill="#FFE866" stroke="#1E1E24" stroke-width="2.5"/><path d="M26 6L12 26h11l-2 16 16-22H24l2-14z" fill="#FF7A00" stroke="#1E1E24" stroke-width="2" stroke-linejoin="round"/><path d="M25 8L15 24h9l-1 12 11-16h-9l2-12z" fill="#FFCF36"/></svg>`,
        title: "10,000% RECHARGED!",
        msg: "“Bhondu's heart is now loaded with infinite beast-mode cuddle energy!”",
        stamp: "MAX TURBO POWER"
      },
      {
        tag: "RACE-DAY BUFF",
        svgIcon: `<svg viewBox="0 0 48 48" class="theme-svg"><circle cx="24" cy="24" r="22" fill="#E8F4FD" stroke="#1E1E24" stroke-width="2.5"/><path d="M24 8L10 14v11c0 10.5 6 15.5 14 17 8-1.5 14-6.5 14-17V14L24 8z" fill="#3A86FF" stroke="#1E1E24" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 16c-2.8-3.2-8.5-.8-8.5 3.5 0 4.8 8.5 9.5 8.5 9.5s8.5-4.7 8.5-9.5c0-4.3-5.7-6.7-8.5-3.5z" fill="#FFE866" stroke="#1E1E24" stroke-width="1.8"/><path d="M22 18l-1.5 4h3l-1 5 4-6h-3l1.5-3z" fill="#FF2A54"/></svg>`,
        title: "BURPEE-PROOF SHIELD!",
        msg: "“No sled is heavy enough and no turf is tough enough for my Bhondu now!”",
        stamp: "100% UNSTOPPABLE"
      },
      {
        tag: "VIP FINISH LINE PERK",
        svgIcon: `<svg viewBox="0 0 48 48" class="theme-svg"><circle cx="24" cy="24" r="22" fill="#FFF2F6" stroke="#1E1E24" stroke-width="2.5"/><path d="M28 6l-3 8" stroke="#FF5C8A" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="16" rx="13" ry="3.5" fill="#FF8FAB" stroke="#1E1E24" stroke-width="2"/><path d="M12 16l3.5 22h17l3.5-22z" fill="#FF5C8A" stroke="#1E1E24" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 20l2.5 16h15l2.5-16c-3 1.5-7-1-10 1s-7-1-10-1z" fill="#FFB3C6"/><path d="M24 25c-1.3-1.6-4-.4-4 1.7 0 2.4 4 4.8 4 4.8s4-2.4 4-4.8c0-2.1-2.7-3.3-4-1.7z" fill="#FFE866" stroke="#1E1E24" stroke-width="1.2"/></svg>`,
        title: "UNLIMITED CUDDLE PASS!",
        msg: "“Entitles Bhondu to endless mango smoothies and unlimited Dora foot rubs!”",
        stamp: "LIFETIME VIP PASS"
      },
      {
        tag: "NO.1 FAN FOREVER",
        svgIcon: `<svg viewBox="0 0 48 48" class="theme-svg"><circle cx="24" cy="24" r="22" fill="#FFF9E6" stroke="#1E1E24" stroke-width="2.5"/><path d="M17 40h14v-3H17v3zm2-3l1.5-6h7l1.5 6H19z" fill="#FF9E00" stroke="#1E1E24" stroke-width="2" stroke-linejoin="round"/><path d="M14 16H9c0 7 4 9 7 9.5M34 16h5c0 7-4 9-7 9.5" fill="none" stroke="#1E1E24" stroke-width="2.5" stroke-linecap="round"/><path d="M14 12h20v11c0 6-4 10-10 10s-10-4-10-10V12z" fill="#FFCF36" stroke="#1E1E24" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 16.5l1.2 2.8 3 .4-2.2 2 .6 3-2.6-1.5-2.6 1.5.6-3-2.2-2 3-.4z" fill="#FF2A54" stroke="#1E1E24" stroke-width="1"/></svg>`,
        title: "OFFICIALLY DORA'S HERO!",
        msg: "“Finish line or not, in Dora's eyes you've already won the whole universe, meri jaan!”",
        stamp: "GOLD STANDARD LOVE"
      }
    ];
    this.hugVariationIdx = 0;
    this.hugPopupTimeout = null;

    this.initAudio();
    this.bindEvents();
    this.initStations();
    this.initConfetti();
    this.updateProgress();
  }

  // Web Audio Synthesizer (Zero external file dependencies)
  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }

    // Global iOS Safari user-gesture unlockers (unlocks Web Audio on first touch/click)
    const unlockAudio = () => {
      this.resumeAudio();
    };
    ['touchstart', 'touchend', 'pointerdown', 'click'].forEach(evt => {
      window.addEventListener(evt, unlockAudio, { capture: true, passive: true });
    });
  }

  resumeAudio() {
    if (!this.audioCtx) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.audioCtx = new AudioContext();
      } catch (e) {}
    }
    if (this.audioCtx) {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      // Safari silent buffer kick-start to unlock audio hardware output pipeline
      try {
        if (!this._audioUnlocked) {
          const buf = this.audioCtx.createBuffer(1, 1, 22050);
          const src = this.audioCtx.createBufferSource();
          src.buffer = buf;
          src.connect(this.audioCtx.destination);
          src.start(0);
          this._audioUnlocked = true;
        }
      } catch (e) {}
    }
  }

  playSound(type) {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.resumeAudio();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'boing') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const noteOsc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        noteOsc.connect(noteGain);
        noteGain.connect(this.audioCtx.destination);
        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.1);
        noteGain.gain.setValueAtTime(0.28, now + idx * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.45);
        noteOsc.start(now + idx * 0.1);
        noteOsc.stop(now + idx * 0.1 + 0.45);
      });
    } else if (type === 'warmHug') {
      // Comforting acoustic pad: F2 deep root, F3, A3, C4, E4, G4 with gentle swell
      const chord = [87.31, 174.61, 220.00, 261.63, 329.63, 392.00];
      chord.forEach((freq, idx) => {
        const noteOsc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, now);
        filter.frequency.exponentialRampToValueAtTime(280, now + 1.8);

        noteOsc.type = idx === 0 ? 'sine' : (idx % 2 === 0 ? 'sine' : 'triangle');
        noteOsc.frequency.setValueAtTime(freq, now);

        noteGain.gain.setValueAtTime(0.001, now);
        // Soft warm swell attack
        noteGain.gain.linearRampToValueAtTime(0.20 / (idx + 1), now + 0.16);
        // Lingering gentle decay
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        noteOsc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.audioCtx.destination);

        noteOsc.start(now);
        noteOsc.stop(now + 1.8);
      });
    }
  }

  // Trigger iOS Native Taptic Engine (Works on iOS 18+ Safari via switch hack)
  triggerIOSTaptic() {
    try {
      if (!this.iosSwitchEl) {
        this.iosSwitchEl = document.getElementById('ios-taptic-switch');
      }
      if (this.iosSwitchEl) {
        this.iosSwitchEl.click();
      }
    } catch (e) {}
  }

  // Acoustic Sub-Bass Physical Rumble Engine (Physically vibrates mobile phone bodies on iPhone + Android)
  playHapticRumble(intensity = 1.0, duration = 0.35, freq = 74) {
    if (!this.soundEnabled) return;
    this.resumeAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);
      osc1.frequency.exponentialRampToValueAtTime(Math.max(42, freq * 0.7), now + duration);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(freq * 1.06, now);
      osc2.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.65), now + duration);

      const peak = Math.min(1.4, 0.95 * intensity);
      gain.gain.setValueAtTime(peak, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {}
  }

  // =========================================================================
  // MULTI-LAYERED HUG WEB AUDIO SYNTHESIZER (100% CODE-SYNTHESIZED, ZERO FILES)
  // =========================================================================

  /**
   * Single unified play function that safely unlocks browser audio context on user interaction
   * and dispatches charging, cancel, or 100% completion impact layers.
   * @param {'start'|'stop'|'impact'} action
   * @param {number} durationSec - Crescendo duration parameter (default 3.5s)
   */
  playHugSFX(action, durationSec = 3.5) {
    this.resumeAudio();
    if (!this.soundEnabled || !this.audioCtx) return;

    if (action === 'start' || action === 'charge') {
      this.startHugChargingSFX(durationSec);
    } else if (action === 'stop' || action === 'cancel') {
      this.stopHugChargingSFX();
    } else if (action === 'impact' || action === 'complete') {
      this.stopHugChargingSFX();
      this.playHugCompletionImpact();
    }
  }

  /**
   * The Charging Phase Layers (0% to 99% crescendo over 3-5 seconds):
   * - Layer A (The Organic Fabric Whoosh): White noise generator -> dynamically opening low-pass filter (100Hz -> 1200Hz)
   * - Layer B (The Deep Core Glow): Low triangle wave oscillator sliding 100Hz -> 200Hz with volume swell
   * - Layer C (The Melodic Shimmer): Soft sine chord pad + emotional rising arpeggio adding glowing warmth
   */
  startHugChargingSFX(durationSec = 3.5) {
    if (!this.soundEnabled) return;
    this.resumeAudio();
    if (!this.audioCtx) return;

    // Dispose any previous charging nodes to avoid overlap
    this.stopHugChargingSFX();

    try {
      const now = this.audioCtx.currentTime;
      const sampleRate = this.audioCtx.sampleRate || 44100;

      // Master Gain for charging phase (enables clean anti-click disposal)
      const chargingMasterGain = this.audioCtx.createGain();
      chargingMasterGain.gain.setValueAtTime(1.0, now);
      chargingMasterGain.connect(this.audioCtx.destination);

      const activeNodes = {
        masterGain: chargingMasterGain,
        sources: [],
        oscs: [],
        gains: [],
        filters: [],
        stopped: false
      };

      // -----------------------------------------------------------------------
      // LAYER A: THE ORGANIC FABRIC WHOOSH
      // Simulates soft, texturally warm rustle of open arms coming together
      // White noise generator routed through dynamically opening low-pass filter (100Hz -> 1200Hz)
      // -----------------------------------------------------------------------
      const bufferLength = Math.floor(sampleRate * Math.max(durationSec + 0.5, 3.0));
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferLength, sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);

      // Warm organic noise with soft texture
      let prevNoise = 0.0;
      for (let i = 0; i < bufferLength; i++) {
        const white = Math.random() * 2 - 1;
        prevNoise = (prevNoise * 0.35) + (white * 0.65);
        noiseData[i] = prevNoise;
      }

      const noiseSource = this.audioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const fabricFilter = this.audioCtx.createBiquadFilter();
      fabricFilter.type = 'lowpass';
      fabricFilter.Q.setValueAtTime(1.1, now);
      // Sweep dynamically upward from 100Hz to 1200Hz
      fabricFilter.frequency.setValueAtTime(100, now);
      fabricFilter.frequency.exponentialRampToValueAtTime(1200, now + durationSec);

      const fabricGain = this.audioCtx.createGain();
      fabricGain.gain.setValueAtTime(0.001, now);
      // Swell in volume as arms sweep closer
      fabricGain.gain.exponentialRampToValueAtTime(0.25, now + durationSec);

      noiseSource.connect(fabricFilter);
      fabricFilter.connect(fabricGain);
      fabricGain.connect(chargingMasterGain);

      noiseSource.start(now);
      activeNodes.sources.push(noiseSource);
      activeNodes.filters.push(fabricFilter);
      activeNodes.gains.push(fabricGain);

      // -----------------------------------------------------------------------
      // LAYER B: THE DEEP CORE GLOW
      // Low triangle wave oscillator sliding up in frequency (from 100Hz to 200Hz)
      // Creates a warm, grounding base hum that swells in volume
      // -----------------------------------------------------------------------
      const coreOsc = this.audioCtx.createOscillator();
      coreOsc.type = 'triangle';
      coreOsc.frequency.setValueAtTime(100, now);
      coreOsc.frequency.exponentialRampToValueAtTime(200, now + durationSec);

      const coreGain = this.audioCtx.createGain();
      coreGain.gain.setValueAtTime(0.001, now);
      coreGain.gain.exponentialRampToValueAtTime(0.36, now + durationSec);

      coreOsc.connect(coreGain);
      coreGain.connect(chargingMasterGain);

      coreOsc.start(now);
      activeNodes.oscs.push(coreOsc);
      activeNodes.gains.push(coreGain);

      // -----------------------------------------------------------------------
      // LAYER C: THE MELODIC SHIMMER
      // Emotional glowing warmth: rising chord pad + subtle ascending sine arpeggio
      // -----------------------------------------------------------------------
      const shimmerMaster = this.audioCtx.createGain();
      shimmerMaster.gain.setValueAtTime(0.001, now);
      shimmerMaster.gain.exponentialRampToValueAtTime(0.32, now + durationSec);
      shimmerMaster.connect(chargingMasterGain);
      activeNodes.gains.push(shimmerMaster);

      // C1: Warm glowing chord pad (F3, A3, C4, E4)
      const chordFrequencies = [174.61, 220.00, 261.63, 329.63];
      chordFrequencies.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.08 / (idx * 0.25 + 1), now + durationSec);

        osc.connect(noteGain);
        noteGain.connect(shimmerMaster);

        osc.start(now);
        activeNodes.oscs.push(osc);
        activeNodes.gains.push(noteGain);
      });

      // C2: Rising gentle sine wave arpeggio (ascending glowing warmth)
      const arpeggioNotes = [
        { timeRatio: 0.06, freq: 261.63 }, // C4
        { timeRatio: 0.20, freq: 329.63 }, // E4
        { timeRatio: 0.35, freq: 392.00 }, // G4
        { timeRatio: 0.50, freq: 440.00 }, // A4
        { timeRatio: 0.63, freq: 523.25 }, // C5
        { timeRatio: 0.75, freq: 659.25 }, // E5
        { timeRatio: 0.86, freq: 783.99 }, // G5
        { timeRatio: 0.95, freq: 880.00 }  // A5
      ];

      arpeggioNotes.forEach(note => {
        const noteStart = now + note.timeRatio * durationSec;
        if (noteStart < now + durationSec) {
          const arpOsc = this.audioCtx.createOscillator();
          const arpGain = this.audioCtx.createGain();
          arpOsc.type = 'sine';
          arpOsc.frequency.setValueAtTime(note.freq, noteStart);

          arpGain.gain.setValueAtTime(0.0001, noteStart);
          arpGain.gain.linearRampToValueAtTime(0.12, noteStart + 0.04);
          arpGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.38);

          arpOsc.connect(arpGain);
          arpGain.connect(shimmerMaster);

          arpOsc.start(noteStart);
          arpOsc.stop(noteStart + 0.40);

          activeNodes.oscs.push(arpOsc);
          activeNodes.gains.push(arpGain);
        }
      });

      this.hugChargingGraph = activeNodes;
    } catch (e) {
      console.warn("Failed to start hug charging SFX", e);
    }
  }

  /**
   * Handles clean nodes disposal on stop to avoid memory leaks.
   * Cancels scheduled ramps with smooth 50ms anti-pop fade, then disconnects all nodes.
   */
  stopHugChargingSFX() {
    if (!this.hugChargingGraph) return;
    const graph = this.hugChargingGraph;
    this.hugChargingGraph = null;
    if (graph.stopped) return;
    graph.stopped = true;

    try {
      if (this.audioCtx && graph.masterGain) {
        const now = this.audioCtx.currentTime;
        graph.masterGain.gain.cancelScheduledValues(now);
        graph.masterGain.gain.setValueAtTime(graph.masterGain.gain.value, now);
        graph.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.05);
      }

      setTimeout(() => {
        try {
          graph.sources.forEach(src => {
            try { src.stop(); src.disconnect(); } catch (e) {}
          });
          graph.oscs.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
          graph.gains.forEach(gain => {
            try { gain.disconnect(); } catch (e) {}
          });
          graph.filters.forEach(filter => {
            try { filter.disconnect(); } catch (e) {}
          });
          if (graph.masterGain) {
            try { graph.masterGain.disconnect(); } catch (e) {}
          }
        } catch (e) {}
      }, 70);
    } catch (e) {}
  }

  /**
   * The 100% Impact Layers (Triggered together at completion):
   * - Layer D (The Deep Heartbeat Release): Low-frequency double thud (sine wave at 50Hz, quickly dropping pitch)
   * - Layer E (The Bright Chime): Delicate, resonant crystal bell (sine wave at 880Hz with long, smooth decay)
   */
  playHugCompletionImpact() {
    if (!this.soundEnabled) return;
    this.resumeAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const nodesToDispose = [];

      // Impact Master Gain
      const impactMaster = this.audioCtx.createGain();
      impactMaster.gain.setValueAtTime(1.0, now);
      impactMaster.connect(this.audioCtx.destination);
      nodesToDispose.push(impactMaster);

      // -----------------------------------------------------------------------
      // LAYER D: THE DEEP HEARTBEAT RELEASE
      // Low-frequency double thud (sine wave at 50Hz quickly dropping pitch)
      // Representing the physical embrace
      // -----------------------------------------------------------------------
      // Thud 1 (Lub) at t = 0
      const thud1Osc = this.audioCtx.createOscillator();
      const thud1Gain = this.audioCtx.createGain();
      thud1Osc.type = 'sine';
      thud1Osc.frequency.setValueAtTime(50, now);
      thud1Osc.frequency.exponentialRampToValueAtTime(22, now + 0.12);

      thud1Gain.gain.setValueAtTime(0.85, now);
      thud1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      thud1Osc.connect(thud1Gain);
      thud1Gain.connect(impactMaster);
      thud1Osc.start(now);
      thud1Osc.stop(now + 0.16);

      nodesToDispose.push(thud1Osc, thud1Gain);

      // Thud 2 (Dub) at t = 0.16s (slightly heavier chest embrace)
      const t2 = now + 0.16;
      const thud2Osc = this.audioCtx.createOscillator();
      const thud2Gain = this.audioCtx.createGain();
      thud2Osc.type = 'sine';
      thud2Osc.frequency.setValueAtTime(48, t2);
      thud2Osc.frequency.exponentialRampToValueAtTime(20, t2 + 0.14);

      thud2Gain.gain.setValueAtTime(0.95, t2);
      thud2Gain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.20);

      thud2Osc.connect(thud2Gain);
      thud2Gain.connect(impactMaster);
      thud2Osc.start(t2);
      thud2Osc.stop(t2 + 0.22);

      nodesToDispose.push(thud2Osc, thud2Gain);

      // -----------------------------------------------------------------------
      // LAYER E: THE BRIGHT CHIME
      // Delicate, resonant crystal bell (sine wave at 880Hz with long, smooth decay)
      // Leaves a positive, premium emotional trailing tail
      // -----------------------------------------------------------------------
      // Fundamental 880Hz (A5)
      const chimeOsc = this.audioCtx.createOscillator();
      const chimeGain = this.audioCtx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(880, now);

      chimeGain.gain.setValueAtTime(0.0001, now);
      chimeGain.gain.linearRampToValueAtTime(0.34, now + 0.006);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(impactMaster);
      chimeOsc.start(now);
      chimeOsc.stop(now + 2.85);

      nodesToDispose.push(chimeOsc, chimeGain);

      // Crystal Overtone 1 (1760Hz - Octave bell shimmer)
      const overtone1Osc = this.audioCtx.createOscillator();
      const overtone1Gain = this.audioCtx.createGain();
      overtone1Osc.type = 'sine';
      overtone1Osc.frequency.setValueAtTime(1760, now);

      overtone1Gain.gain.setValueAtTime(0.0001, now);
      overtone1Gain.gain.linearRampToValueAtTime(0.10, now + 0.005);
      overtone1Gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      overtone1Osc.connect(overtone1Gain);
      overtone1Gain.connect(impactMaster);
      overtone1Osc.start(now);
      overtone1Osc.stop(now + 1.85);

      nodesToDispose.push(overtone1Osc, overtone1Gain);

      // Crystal Overtone 2 (2640Hz - Pure crystal glass sparkle)
      const overtone2Osc = this.audioCtx.createOscillator();
      const overtone2Gain = this.audioCtx.createGain();
      overtone2Osc.type = 'sine';
      overtone2Osc.frequency.setValueAtTime(2640, now);

      overtone2Gain.gain.setValueAtTime(0.0001, now);
      overtone2Gain.gain.linearRampToValueAtTime(0.045, now + 0.004);
      overtone2Gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      overtone2Osc.connect(overtone2Gain);
      overtone2Gain.connect(impactMaster);
      overtone2Osc.start(now);
      overtone2Osc.stop(now + 1.25);

      nodesToDispose.push(overtone2Osc, overtone2Gain);

      // Clean node disposal after audio decay completes to prevent memory leaks
      setTimeout(() => {
        nodesToDispose.forEach(node => {
          try { node.disconnect(); } catch (e) {}
        });
      }, 3000);

    } catch (e) {
      console.warn("Failed to play hug completion impact SFX", e);
    }
  }

  // =========================================================================
  // ANIMATED SCRIBBLY HEART POPUP (On Hug Completion)
  // =========================================================================

  showHugHeartPopup() {
    const backdrop = document.getElementById('hug-popup-backdrop');
    const card = document.getElementById('hug-popup-card');
    const tag = document.getElementById('hug-popup-tag');
    const iconWrap = document.getElementById('hug-popup-icon-wrap');
    const title = document.getElementById('hug-popup-title');
    const msg = document.getElementById('hug-popup-msg');
    const stamp = document.getElementById('hug-popup-stamp-text');
    const timerFill = document.getElementById('hug-popup-timer-fill');

    if (!backdrop || !card) return;

    // Pick next creative variation
    const data = this.hugVariations[this.hugVariationIdx];
    this.hugVariationIdx = (this.hugVariationIdx + 1) % this.hugVariations.length;

    if (tag) tag.textContent = data.tag;
    if (iconWrap && data.svgIcon) iconWrap.innerHTML = data.svgIcon;
    if (title) title.textContent = data.title;
    if (msg) msg.textContent = data.msg;
    if (stamp) stamp.textContent = data.stamp;

    // Reset reading timer fill bar animation
    if (timerFill) {
      timerFill.style.animation = 'none';
      void timerFill.offsetWidth; // force reflow
      timerFill.style.animation = '';
    }

    // Show backdrop and trigger bouncy spring entrance immediately
    backdrop.classList.add('visible');
    backdrop.setAttribute('aria-hidden', 'false');
    card.classList.remove('popping-out');
    void card.offsetWidth; // Force reflow
    card.classList.add('popping-in');

    this.playSound('pop');

    // Extra burst of floating heart particles around the heart popup
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    this.burstHearts(cx, cy, 14);

    // Auto-dismiss smoothly after reading duration (6.5s) - plenty of time to enjoy!
    clearTimeout(this.hugPopupTimeout);
    this.hugPopupTimeout = setTimeout(() => {
      this.closeHugHeartPopup();
    }, 6500);
  }

  closeHugHeartPopup() {
    const backdrop = document.getElementById('hug-popup-backdrop');
    const card = document.getElementById('hug-popup-card');
    if (!backdrop || !backdrop.classList.contains('visible')) return;

    clearTimeout(this.hugPopupTimeout);
    if (card) {
      card.classList.remove('popping-in');
      card.classList.add('popping-out');
    }

    setTimeout(() => {
      if (backdrop) {
        backdrop.classList.remove('visible');
        backdrop.setAttribute('aria-hidden', 'true');
      }
      if (card) card.classList.remove('popping-out');
    }, 280);
  }

  // --- Dedicated Continuous Vibration Methods (ZERO PAUSES) ---
  startContinuousHoldVibration() {
    // 1) Android / Chrome hardware vibration motor (solid 10s duration)
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10000);
      } catch (e) {}
    }

    // 2) iOS Safari native Taptic Engine contact click
    this.triggerIOSTaptic();
  }

  keepContinuousHoldVibration() {
    // Re-arm Android vibration every 400ms so it never cuts out
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(4000);
      } catch (e) {}
    }
  }

  celebrateHugVibration() {
    // 1) Android hardware motor (solid 1.5s continuous)
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(1500);
      } catch (e) {}
    }

    // 2) iOS native Taptic Engine celebratory pulse
    this.triggerIOSTaptic();
    setTimeout(() => this.triggerIOSTaptic(), 140);
    setTimeout(() => this.triggerIOSTaptic(), 280);

    // 3) Powerful sustained physical chassis rumble for iPhone & Android (1.2s solid unbroken)
    this.playHapticRumble(1.4, 1.2, 74);
  }

  stopContinuousHoldVibration() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(0);
      } catch (e) {}
    }
  }

  triggerHaptic(ms = 35) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch (e) {}
    }
    this.triggerIOSTaptic();
    this.playHapticRumble(0.7, 0.08, 80);
  }

  // General single-pulse haptics for buttons and mini-games (never interrupts hold)
  triggerHeartbeatHaptic(level = 1) {
    if (this.holdPressActive) return;

    if ('vibrate' in navigator) {
      try {
        if (level === 1) {
          navigator.vibrate(100);
        } else if (level === 2) {
          navigator.vibrate(180);
        } else if (level === 3) {
          navigator.vibrate(280);
        } else if (level >= 4) {
          navigator.vibrate(450);
        }
      } catch (e) {}
    }

    this.triggerIOSTaptic();

    // Acoustic Speaker Transducer Physical Rumble
    if (level === 1) {
      this.playHapticRumble(0.85, 0.25, 76);
    } else if (level === 2) {
      this.playHapticRumble(1.0, 0.36, 70);
    } else if (level === 3) {
      this.playHapticRumble(1.3, 0.45, 64);
    } else if (level >= 4) {
      this.playHapticRumble(1.8, 0.90, 58);
    }
  }

  // Floating Emoji Particle on user tap
  createHeartParticle(x, y, emoji = '💖') {
    const particle = document.createElement('div');
    particle.className = 'floating-heart-particle';
    particle.textContent = emoji;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const randX = (Math.random() - 0.5) * 120;
    const randRot = (Math.random() - 0.5) * 60;
    particle.style.setProperty('--rand-x', `${randX}px`);
    particle.style.setProperty('--rand-rot', `${randRot}deg`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1400);
  }

  burstHearts(x, y, count = 6) {
    const emojis = ['💖', '✨', '🐾', '⭐', '🥰', '🔥', '💪', '💋', '🐰'];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const randEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const offsetX = x + (Math.random() - 0.5) * 40;
        const offsetY = y + (Math.random() - 0.5) * 30;
        this.createHeartParticle(offsetX, offsetY, randEmoji);
      }, i * 60);
    }
  }

  // Event Listeners
  bindEvents() {
    // First Page: Interactive "Accept The Gift" Love Experience
    const giftYesBtn = document.getElementById('gift-yes-btn');
    const giftNoBtn = document.getElementById('gift-no-btn');
    const giftCardMain = document.getElementById('gift-card-main');
    const giftDareCard = document.getElementById('gift-dare-card');
    const giftYayCard = document.getElementById('gift-yay-card');
    const giftTryAgainBtn = document.getElementById('gift-try-again-btn');
    const giftHintText = document.getElementById('gift-hint-text');
    const backToPortalBtn = document.getElementById('back-to-portal-btn');
    const portalView = document.getElementById('portal-view');
    const questView = document.getElementById('quest-view');
    const floatingPepWrap = document.getElementById('floating-pep-wrap');

    let noAttempts = 0;
    const noPleadingMessages = [
      "NO 🙈",
      "Are you sure? 🥺",
      "Really really sure?? 💔",
      "Think of all the smoothies! 🥤",
      "Dora will cry! 😿",
      "Free foot rubs though! 🦶✨",
      "You can't say no! 😤",
      "Last chance, Bhondu! 🚨"
    ];

    const hintPleadingMessages = [
      "Psst: There's only one right answer, Bhondu! 😉",
      "Wait, why are you tapping NO?! 🥺",
      "Dora is watching your fingers very closely... 👀",
      "The YES button is looking greener and juicier! 💖",
      "Smoothies, cuddles, and cheerleading at stake! 🥤",
      "Resistance is futile, you love Dora too much! 🥰"
    ];

    const showDareCard = () => {
      this.resumeAudio();
      this.playSound('boing');
      this.triggerHaptic(50);
      if (giftCardMain) giftCardMain.style.display = 'none';
      if (giftDareCard) giftDareCard.style.display = 'flex';
    };

    const resetNoButton = () => {
      noAttempts = 0;
      const arena = document.getElementById('gift-btn-arena');
      if (arena) arena.classList.remove('dodging');
      if (giftNoBtn) {
        giftNoBtn.textContent = 'NO 🙈';
        giftNoBtn.style.transform = 'translate(0px, 0px) scale(1)';
      }
      if (giftYesBtn) {
        giftYesBtn.style.setProperty('--yes-scale', 1);
        giftYesBtn.style.transform = 'scale(1)';
      }
      if (giftHintText) {
        giftHintText.textContent = "Psst: There's only one right answer, Bhondu! 😉";
      }
    };

    const dodgeNoButton = (e) => {
      if (e) e.preventDefault();
      noAttempts++;

      const arena = document.getElementById('gift-btn-arena');
      if (arena) arena.classList.add('dodging');

      this.resumeAudio();
      this.playSound('boing');
      this.triggerHaptic(25);

      // If she tapped it 5+ times, trigger the Gangster Cat meme
      if (noAttempts >= 5) {
        showDareCard();
        return;
      }

      // Update text on NO button
      if (giftNoBtn) {
        giftNoBtn.textContent = noPleadingMessages[noAttempts % noPleadingMessages.length];
      }

      // Update hint text
      if (giftHintText) {
        giftHintText.textContent = hintPleadingMessages[noAttempts % hintPleadingMessages.length];
      }

      // Grow the YES button on top
      const scale = 1 + Math.min(noAttempts * 0.14, 0.7);
      if (giftYesBtn) {
        giftYesBtn.style.setProperty('--yes-scale', scale);
        giftYesBtn.style.transform = `scale(${scale})`;
      }

      // Playfully dodge the NO button below YES without ever colliding or hiding behind
      if (giftNoBtn) {
        const dodgeOffsets = [
          { x: -35, y: 0 },
          { x: 38, y: 3 },
          { x: -45, y: -2 },
          { x: 42, y: 4 }
        ];
        const offset = dodgeOffsets[(noAttempts - 1) % dodgeOffsets.length];
        const shrink = Math.max(0.82, 1 - noAttempts * 0.04);

        giftNoBtn.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${shrink})`;
      }
    };

    if (giftNoBtn) {
      // Mobile-optimized: reacts strictly on intentional tap / click (never on hover!)
      giftNoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dodgeNoButton(e);
      });
    }

    if (giftTryAgainBtn) {
      giftTryAgainBtn.addEventListener('click', () => {
        this.playSound('pop');
        this.triggerHaptic(20);
        if (giftDareCard) giftDareCard.style.display = 'none';
        if (giftCardMain) giftCardMain.style.display = 'flex';
        resetNoButton();
        if (giftYesBtn) {
          giftYesBtn.style.setProperty('--yes-scale', 1.25);
          giftYesBtn.style.transform = 'scale(1.25)';
        }
        if (giftNoBtn) {
          giftNoBtn.textContent = 'Think twice! 😼';
        }
      });
    }

    if (giftYesBtn) {
      giftYesBtn.addEventListener('click', () => {
        this.resumeAudio();
        this.playSound('fanfare');
        this.triggerHaptic(60);

        const rect = giftYesBtn.getBoundingClientRect();
        this.burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
        this.triggerConfetti(45);

        // Show celebratory yay screen briefly
        if (giftCardMain) giftCardMain.style.display = 'none';
        if (giftDareCard) giftDareCard.style.display = 'none';
        if (giftYayCard) giftYayCard.style.display = 'flex';

        setTimeout(() => {
          portalView.style.display = 'none';
          questView.style.display = 'flex';
          backToPortalBtn.style.display = 'inline-flex';
          if (floatingPepWrap) floatingPepWrap.style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
          }
        }, 950);
      });
    }

    if (backToPortalBtn) {
      backToPortalBtn.addEventListener('click', () => {
        this.playSound('pop');
        this.triggerHaptic(20);

        portalView.style.display = 'flex';
        questView.style.display = 'none';
        backToPortalBtn.style.display = 'none';
        if (floatingPepWrap) floatingPepWrap.style.display = 'none';

        // Reset to initial stage
        if (giftCardMain) giftCardMain.style.display = 'flex';
        if (giftDareCard) giftDareCard.style.display = 'none';
        if (giftYayCard) giftYayCard.style.display = 'none';
        resetNoButton();

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Sound Toggle
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const soundState = document.getElementById('sound-state');

    soundToggle.addEventListener('click', (e) => {
      this.soundEnabled = !this.soundEnabled;
      soundIcon.textContent = this.soundEnabled ? '🔊' : '🔇';
      soundState.textContent = this.soundEnabled ? 'ON' : 'OFF';
      this.playSound('pop');
      this.triggerHaptic(20);
      this.createHeartParticle(e.clientX || 50, e.clientY || 50, this.soundEnabled ? '🎵' : '💤');
    });

    // REAL WARM HUG EXPERIENCE (HOLD-ONLY, NO TAPPING, POWERFUL CHARGE + ESCALATING HAPTICS)
    const hugZone = document.querySelector('.hug-zone');
    const hugBtn = document.getElementById('hug-btn');
    const hugCounter = document.getElementById('hug-counter');
    const hugFill = document.getElementById('hug-hold-fill');
    const hugWhisper = document.getElementById('hug-whisper');
    const hugWhisperText = document.getElementById('hug-whisper-text');
    const hugBtnText = document.getElementById('hug-btn-text');
    const hugMeterText = document.getElementById('hug-meter-text');
    const hugPctBadge = document.getElementById('hug-pct-badge');
    const warmthOverlay = document.getElementById('warmth-overlay');

    const HUG_FULL_MS = 3500; // 3.5s for rich, multi-layered crescendo (within requested 3-5 seconds)
    const MIN_HOLD_MS = 3000; // Must hold at least 3.0s to complete full hug

    const updateWhisper = () => {
      this.whisperIdx = (this.whisperIdx + 1) % this.doraWhispers.length;
      if (hugWhisperText) {
        hugWhisperText.textContent = this.doraWhispers[this.whisperIdx];
      }
      if (hugWhisper) {
        hugWhisper.classList.remove('whisper-pop');
        void hugWhisper.offsetWidth;
        hugWhisper.classList.add('whisper-pop');
      }
    };

    const triggerHugGlow = (isActive = true) => {
      if (warmthOverlay) {
        warmthOverlay.classList.remove('warmth-holding');
        if (isActive) {
          warmthOverlay.classList.add('warmth-active');
          clearTimeout(this.warmthTimeout);
          this.warmthTimeout = setTimeout(() => {
            warmthOverlay.classList.remove('warmth-active');
          }, 2800);
        } else {
          warmthOverlay.classList.remove('warmth-active');
        }
      }
    };

    if (hugBtn) {
      hugBtn.addEventListener('contextmenu', (e) => e.preventDefault());

      // Touchstart guarantee on iOS Safari to safely unlock Web Audio on physical contact
      hugBtn.addEventListener('touchstart', () => {
        this.resumeAudio();
      }, { passive: true });

      hugBtn.addEventListener('pointerdown', (e) => {
        this.holdPressActive = true;
        this.holdStartTime = Date.now();

        try {
          hugBtn.setPointerCapture(e.pointerId);
          this.activePointerId = e.pointerId;
        } catch (err) {}

        clearInterval(this.hugPulseInterval);
        clearTimeout(this.hugResetTimer);

        hugBtn.classList.remove('shaking', 'blooming', 'fully-charged');
        hugBtn.classList.add('squeezing');
        if (hugZone) hugZone.classList.add('holding');
        if (warmthOverlay) warmthOverlay.classList.add('warmth-holding');

        document.documentElement.style.setProperty('--hug-charge', '0');

        // Start synchronized multi-layered charging SFX (Layer A: Fabric Whoosh, Layer B: Core Glow, Layer C: Melodic Shimmer)
        const durationSec = HUG_FULL_MS / 1000;
        this.playHugSFX('start', durationSec);

        // Optional subtle haptic start
        this.triggerIOSTaptic();

        // Smoothly charge progress and sync phase text to audio crescendo
        this.hugPulseInterval = setInterval(() => {
          if (!this.holdPressActive) return;
          const elapsed = Date.now() - this.holdStartTime;
          const pct = Math.min(100, Math.round((elapsed / HUG_FULL_MS) * 100));
          if (hugFill) hugFill.style.width = `${pct}%`;
          if (hugPctBadge) hugPctBadge.textContent = `${pct}%`;

          // Update full-screen CSS custom property to dynamically drive screen vignette and arms
          const progressRatio = (pct / 100).toFixed(3);
          document.documentElement.style.setProperty('--hug-charge', progressRatio);

          // Progressive phase feedback synchronized to audio layers
          if (pct < 25) {
            if (hugBtnText) hugBtnText.textContent = 'Dora is reaching out...';
            if (hugMeterText) hugMeterText.textContent = 'Soft fabric rustle begins...';
          } else if (pct < 55) {
            if (hugBtnText) hugBtnText.textContent = 'Wrapping you up warm...';
            if (hugMeterText) hugMeterText.textContent = 'Deep core warmth rising...';
          } else if (pct < 85) {
            if (hugBtnText) hugBtnText.textContent = 'Squeezing super tight...';
            if (hugMeterText) hugMeterText.textContent = 'Melodic shimmer crescendo...';
          } else if (pct < 100) {
            if (hugBtnText) hugBtnText.textContent = 'Almost 100% warmth...';
            if (hugMeterText) hugMeterText.textContent = 'Peak harmony swelling...';
          } else {
            // 100% Fully Charged Warm Hug!
            hugBtn.classList.add('fully-charged');
            if (hugBtnText) hugBtnText.textContent = '100% WARMTH! Release now!';
            if (hugMeterText) hugMeterText.textContent = 'Release for heartbeat embrace!';
          }

          // Auto-trigger completion if user holds slightly past 100%
          if (elapsed >= HUG_FULL_MS + 250) {
            handleRelease();
            return;
          }

          // Warm emoji stream floating up from button
          const rect = hugBtn.getBoundingClientRect();
          const holdEmojis = ['💖', '🥰', '🫂', '✨'];
          this.createHeartParticle(
            rect.left + rect.width / 2 + (Math.random() - 0.5) * 60,
            rect.top + 10,
            holdEmojis[Math.floor(Math.random() * holdEmojis.length)]
          );

          // Ambient full-screen floating particles (sparks drifting from edges across viewport)
          if (Math.random() < 0.60) {
            const side = Math.floor(Math.random() * 4);
            let px, py;
            if (side === 0) { // Left edge
              px = 15 + Math.random() * 40;
              py = Math.random() * window.innerHeight;
            } else if (side === 1) { // Right edge
              px = window.innerWidth - 15 - Math.random() * 40;
              py = Math.random() * window.innerHeight;
            } else if (side === 2) { // Bottom edge
              px = Math.random() * window.innerWidth;
              py = window.innerHeight - 25 - Math.random() * 40;
            } else { // Top edge
              px = Math.random() * window.innerWidth;
              py = 30 + Math.random() * 40;
            }
            const ambientEmojis = ['💖', '✨', '🥰', '⭐', '🌸'];
            this.createHeartParticle(px, py, ambientEmojis[Math.floor(Math.random() * ambientEmojis.length)]);
          }
        }, 50);
      });

      const handleRelease = (e) => {
        if (!this.holdPressActive) return;
        this.holdPressActive = false;

        if (e && e.pointerId !== undefined) {
          try {
            if (hugBtn.hasPointerCapture(e.pointerId)) {
              hugBtn.releasePointerCapture(e.pointerId);
            }
          } catch (err) {}
        } else if (this.activePointerId !== null && this.activePointerId !== undefined) {
          try {
            if (hugBtn.hasPointerCapture(this.activePointerId)) {
              hugBtn.releasePointerCapture(this.activePointerId);
            }
          } catch (err) {}
        }
        this.activePointerId = null;

        clearInterval(this.hugPulseInterval);

        hugBtn.classList.remove('squeezing', 'fully-charged');
        if (hugZone) hugZone.classList.remove('holding');
        if (warmthOverlay) warmthOverlay.classList.remove('warmth-holding');

        const elapsed = Date.now() - this.holdStartTime;

        // DID NOT HOLD LONG ENOUGH -> CANCEL CHARGING SFX & SHAKE
        if (elapsed < MIN_HOLD_MS) {
          this.playHugSFX('stop'); // Clean anti-click disposal of charging audio graph

          document.documentElement.style.setProperty('--hug-charge', '0');

          if (hugFill) hugFill.style.width = '0%';
          if (hugPctBadge) hugPctBadge.textContent = '0%';
          hugBtn.classList.add('shaking');
          setTimeout(() => hugBtn.classList.remove('shaking'), 450);

          if (hugBtnText) hugBtnText.textContent = 'Hold longer for a real hug! 🫂';
          if (hugMeterText) hugMeterText.textContent = 'Hold 3-4s to hear the full crescendo!';
          this.playSound('boing');

          clearTimeout(this.hugResetTimer);
          this.hugResetTimer = setTimeout(() => {
            if (hugBtnText) hugBtnText.textContent = 'Press & Hold for a Warm Hug';
            if (hugMeterText) hugMeterText.textContent = 'Hold down to feel the squeeze...';
            if (hugPctBadge) hugPctBadge.textContent = '0%';
          }, 1800);
          return;
        }

        // HELD TO COMPLETION -> FULL-SCREEN PHYSICAL EMBRACE & SHOCKWAVES!
        this.hugCount++;
        if (hugCounter) {
          hugCounter.textContent = `${this.hugCount} warm hug${this.hugCount === 1 ? '' : 's'} sent!`;
        }

        if (hugFill) {
          hugFill.style.width = '100%';
          setTimeout(() => { if (hugFill) hugFill.style.width = '0%'; }, 350);
        }

        hugBtn.classList.add('blooming');
        setTimeout(() => hugBtn.classList.remove('blooming'), 650);

        if (hugBtnText) hugBtnText.textContent = 'Warm Hug Sent with All My Love!';
        if (hugMeterText) hugMeterText.textContent = "Wrapped in Dora's love!";
        if (hugPctBadge) hugPctBadge.textContent = '100% ✓';

        // Play 100% Impact Layers simultaneously: Layer D (Heartbeat Thud) + Layer E (Crystal Chime)
        this.playHugSFX('impact');
        triggerHugGlow(true);

        const shockwaveEl = document.getElementById('screen-shockwave');
        if (shockwaveEl) {
          shockwaveEl.classList.remove('fire-shockwave-1', 'fire-shockwave-2');
          void shockwaveEl.offsetWidth; // Reflow
          shockwaveEl.classList.add('fire-shockwave-1');
        }

        // Second Thud physical screen pulse (synced with Dub at t=160ms)
        setTimeout(() => {
          if (shockwaveEl) {
            shockwaveEl.classList.remove('fire-shockwave-1');
            void shockwaveEl.offsetWidth;
            shockwaveEl.classList.add('fire-shockwave-2');
          }
        }, 160);

        // Full-screen burst of hearts across the entire display
        const rect = hugBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        this.burstHearts(centerX, centerY, 22);
        // Additional screen-wide bursts across viewport
        this.burstHearts(window.innerWidth * 0.2, window.innerHeight * 0.35, 8);
        this.burstHearts(window.innerWidth * 0.8, window.innerHeight * 0.35, 8);
        this.burstHearts(window.innerWidth * 0.5, window.innerHeight * 0.65, 12);
        this.triggerConfetti(65);
        updateWhisper();

        // Trigger Big, Modern, Scribbly Animated Heart Popup immediately on impact!
        setTimeout(() => {
          this.showHugHeartPopup();
        }, 30);

        clearTimeout(this.hugResetTimer);
        this.hugResetTimer = setTimeout(() => {
          document.documentElement.style.setProperty('--hug-charge', '0');
          if (hugBtnText) hugBtnText.textContent = 'Press & Hold for a Warm Hug';
          if (hugMeterText) hugMeterText.textContent = 'Hold down to feel the squeeze...';
          if (hugPctBadge) hugPctBadge.textContent = '0%';
        }, 2800);
      };

      hugBtn.addEventListener('pointerup', handleRelease);
      hugBtn.addEventListener('pointercancel', handleRelease);

      // Animated Scribbly Heart Popup Dismiss Handlers (read & auto-dismiss, or tap anywhere to close early)
      const popupBackdrop = document.getElementById('hug-popup-backdrop');
      const popupCard = document.getElementById('hug-popup-card');

      if (popupBackdrop) {
        popupBackdrop.addEventListener('click', () => {
          this.playSound('pop');
          this.closeHugHeartPopup();
        });
      }

      if (popupCard) {
        popupCard.addEventListener('click', (e) => {
          e.stopPropagation();
          this.playSound('pop');
          this.closeHugHeartPopup();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeHugHeartPopup();
        }
      });

      // Keyboard support: holding Space or Enter
      hugBtn.addEventListener('keydown', (e) => {
        if ((e.key === ' ' || e.key === 'Enter') && !this.holdPressActive) {
          e.preventDefault();
          hugBtn.dispatchEvent(new PointerEvent('pointerdown'));
        }
      });

      hugBtn.addEventListener('keyup', (e) => {
        if ((e.key === ' ' || e.key === 'Enter') && this.holdPressActive) {
          e.preventDefault();
          handleRelease();
        }
      });
    }

    // Interactive Checklist Tracker
    const checkboxes = document.querySelectorAll('.doodle-checkbox');
    const checklistStatus = document.getElementById('checklist-status');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        this.playSound('pop');
        this.triggerHaptic(25);
        const checkedCount = document.querySelectorAll('.doodle-checkbox:checked').length;
        if (checkedCount === checkboxes.length) {
          checklistStatus.textContent = '🎉 100% Ready! Bhondu is an unstoppable beast!';
          this.playSound('fanfare');
          this.triggerConfetti(30);
        } else {
          checklistStatus.textContent = `⚡ ${checkedCount} of ${checkboxes.length} ready! Keep going, champ!`;
        }
      });
    });

    // MINI GAME 1: SLED PUSH (LINE CLEARANCE PENALTY SIMULATOR)
    const sledBtn = document.getElementById('sled-push-btn');
    const sledTurnBtn = document.getElementById('sled-turn-btn');
    const sledRunner = document.getElementById('sled-runner');
    const sledFill = document.getElementById('sled-fill');
    const sledTaps = document.getElementById('sled-taps');
    const sledMsg = document.getElementById('sled-msg');

    if (sledBtn) {
      sledBtn.addEventListener('click', () => {
        if (this.sledDone) return;
        this.sledTaps = Math.min(this.sledMax, this.sledTaps + 1);
        this.playSound('pop');
        this.triggerHaptic(25);

        const percent = Math.min(100, (this.sledTaps / this.sledMax) * 100);
        if (sledFill) sledFill.style.width = `${percent}%`;
        if (sledRunner) sledRunner.style.left = `calc(${percent}% * 0.72 + 10px)`;
        if (sledTaps) sledTaps.textContent = this.sledTaps;

        const rect = sledBtn.getBoundingClientRect();
        this.burstHearts(rect.left + rect.width / 2, rect.top, 2);

        if (this.sledTaps >= this.sledMax) {
          if (sledMsg) sledMsg.textContent = '⚡ All 4 skids have crossed the white boundary line! Now tap "Turn Sled Around"!';
        } else {
          if (sledMsg) sledMsg.textContent = `Pushing across turf... (${this.sledTaps}/${this.sledMax} lengths)`;
        }
      });
    }

    if (sledTurnBtn) {
      sledTurnBtn.addEventListener('click', () => {
        if (this.sledDone) return;
        if (this.sledTaps < this.sledMax) {
          // EARLY TURN PENALTY!
          this.playSound('boing');
          this.triggerHaptic(60);
          if (sledMsg) sledMsg.textContent = "NO REP! Rear skids haven't cleared the white tape! In HYROX, all 4 skids must completely cross before turning!";
          // Penalty: Sled pushed back 2 steps
          this.sledTaps = Math.max(0, this.sledTaps - 2);
          const percent = Math.min(100, (this.sledTaps / this.sledMax) * 100);
          if (sledFill) sledFill.style.width = `${percent}%`;
          if (sledRunner) sledRunner.style.left = `calc(${percent}% * 0.72 + 10px)`;
          if (sledTaps) sledTaps.textContent = this.sledTaps;
        } else {
          // Clean turn validated!
          this.sledDone = true;
          sledTurnBtn.classList.add('completed-game');
          sledTurnBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>CLEAN TURN VALIDATED</span>';
          sledBtn.classList.add('completed-game');
          sledBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>50m SLED CRUSHED</span>';
          if (sledMsg) sledMsg.textContent = 'GOOD REP! All 4 skids cleared the line cleanly! Zero penalty minutes for Bhondu!';
          this.stampStation(2);
          this.playSound('fanfare');
          const rect = sledTurnBtn.getBoundingClientRect();
          this.burstHearts(rect.left + rect.width / 2, rect.top, 10);
        }
      });
    }

    // MINI GAME 2: BURPEE BROAD JUMPS (CHEST-TO-TURF & 2-FOOT LEAP SIMULATOR)
    const burpeeDropBtn = document.getElementById('burpee-drop-btn');
    const burpeeJumpBtn = document.getElementById('burpee-jump-btn');
    const burpeeJumper = document.getElementById('burpee-jumper');
    const burpeeJumpsEl = document.getElementById('burpee-jumps');
    const burpeeMsg = document.getElementById('burpee-msg');
    const chestTouchIndicator = document.getElementById('chest-touch-indicator');
    let chestTouched = false;

    if (burpeeDropBtn) {
      burpeeDropBtn.addEventListener('click', () => {
        if (this.burpeeDone) return;
        chestTouched = true;
        this.playSound('pop');
        this.triggerHaptic(30);

        burpeeDropBtn.classList.add('chest-touched');
        burpeeDropBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Chest on Turf</span>';
        if (chestTouchIndicator) {
          chestTouchIndicator.textContent = 'Chest on Turf: YES';
          chestTouchIndicator.classList.add('active');
        }
        if (burpeeJumper) burpeeJumper.style.transform = 'translateY(12px) scale(1.15, 0.8)';
        if (burpeeMsg) burpeeMsg.textContent = 'Chest touch verified by judge! Now tap "2. Two-Foot Leap"!';
      });
    }

    if (burpeeJumpBtn) {
      burpeeJumpBtn.addEventListener('click', () => {
        if (this.burpeeDone) return;

        if (!chestTouched) {
          // NO REP: Jumped without chest on turf
          this.playSound('boing');
          this.triggerHaptic(60);
          if (burpeeMsg) burpeeMsg.textContent = "NO REP! Chest didn't touch the turf! Both hands and chest must make full turf contact before jumping!";
          return;
        }

        // Clean Two-Foot Leap!
        this.burpeeJumps++;
        chestTouched = false;
        if (burpeeDropBtn) {
          burpeeDropBtn.classList.remove('chest-touched');
          burpeeDropBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg><span>1. Drop Chest to Turf</span>';
        }
        if (chestTouchIndicator) {
          chestTouchIndicator.textContent = 'Chest on Turf: NO';
          chestTouchIndicator.classList.remove('active');
        }

        this.playSound('boing');
        this.triggerHaptic(35);

        // Leap animation
        if (burpeeJumper) {
          burpeeJumper.style.transform = 'translateY(-26px) scale(1.35) rotate(-10deg)';
          setTimeout(() => {
            if (burpeeJumper) burpeeJumper.style.transform = 'translateY(0px) scale(1) rotate(0deg)';
          }, 240);

          const percent = (this.burpeeJumps / this.burpeeMax) * 100;
          burpeeJumper.style.left = `calc(${percent * 0.72}% + 14px)`;
        }
        if (burpeeJumpsEl) burpeeJumpsEl.textContent = this.burpeeJumps;

        const rect = burpeeJumpBtn.getBoundingClientRect();
        this.burstHearts(rect.left + rect.width / 2, rect.top, 2);

        if (this.burpeeJumps >= this.burpeeMax) {
          this.burpeeDone = true;
          burpeeJumpBtn.classList.add('completed-game');
          burpeeJumpBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>80m JUMPS COMPLETED</span>';
          if (burpeeDropBtn) {
            burpeeDropBtn.classList.add('completed-game');
            burpeeDropBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>4 REPS DONE</span>';
          }
          if (burpeeMsg) burpeeMsg.textContent = 'GOOD REP! 80m burpee broad jumps conquered with flawless movement standards!';
          this.stampStation(4);
          this.playSound('fanfare');
          this.burstHearts(rect.left + rect.width / 2, rect.top, 10);
        } else {
          if (burpeeMsg) burpeeMsg.textContent = `Step ${this.burpeeJumps}/4 completed! Tap "Drop Chest to Turf" for the next rep!`;
        }
      });
    }

    // ROXZONE ARCH PENALTY DEFENSE SIMULATOR
    const archInBtn = document.getElementById('arch-choice-in');
    const archOutBtn = document.getElementById('arch-choice-out');
    const archResult = document.getElementById('arch-quiz-result');

    if (archInBtn) {
      archInBtn.addEventListener('click', () => {
        this.playSound('boing');
        this.triggerHaptic(80);
        if (archResult) {
          archResult.className = 'arch-quiz-result penalty-flash';
          archResult.textContent = '2-MINUTE TIME PENALTY! Exiting through the IN arch is an automatic 2-minute penalty. ALWAYS exit through the OUT arch!';
        }
      });
    }

    if (archOutBtn) {
      archOutBtn.addEventListener('click', () => {
        this.playSound('fanfare');
        this.triggerHaptic(35);
        if (archResult) {
          archResult.className = 'arch-quiz-result success-flash';
          archResult.textContent = 'PERFECT NAVIGATION! You exited cleanly through the OUT arch. 0 penalty seconds, Sub-1.5h pacing protected!';
        }
      });
    }

    // MINI GAME 3: WALL BALLS (SQUAT DEPTH & TARGET SIMULATOR)
    const wbSquatToggle = document.getElementById('wallball-squat-toggle-btn');
    const wbBtn = document.getElementById('wallball-toss-btn');
    const wbBall = document.getElementById('wallball-ball');
    const wbHitsEl = document.getElementById('wb-hits');
    const wbMsg = document.getElementById('wb-msg');
    const depthNeedle = document.getElementById('depth-needle');
    const athleteSquatEmoji = document.getElementById('athlete-squat-emoji');
    let squatIsDeep = false;

    if (wbSquatToggle) {
      wbSquatToggle.addEventListener('click', () => {
        if (this.wallBallDone) return;
        squatIsDeep = !squatIsDeep;
        this.playSound('pop');
        this.triggerHaptic(30);

        if (squatIsDeep) {
          wbSquatToggle.classList.add('deep-active');
          wbSquatToggle.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Squat Deep</span>';
          if (depthNeedle) depthNeedle.style.left = '80%';
          if (athleteSquatEmoji) athleteSquatEmoji.classList.add('squatting-deep');
          if (wbMsg) wbMsg.textContent = 'Hip crease is below knee line (valid rep depth)! Now tap "2. Toss to Target!"';
        } else {
          wbSquatToggle.classList.remove('deep-active');
          wbSquatToggle.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg><span>1. Squat Deep (Below Parallel)</span>';
          if (depthNeedle) depthNeedle.style.left = '18%';
          if (athleteSquatEmoji) athleteSquatEmoji.classList.remove('squatting-deep');
          if (wbMsg) wbMsg.textContent = 'Standing upright. Tap "Squat Deep" before tossing!';
        }
      });
    }

    if (wbBtn) {
      wbBtn.addEventListener('click', () => {
        if (this.wallBallDone) return;

        if (!squatIsDeep) {
          // NO REP: Squat too shallow!
          this.playSound('boing');
          this.triggerHaptic(60);
          if (depthNeedle) depthNeedle.style.left = '18%';
          if (wbMsg) wbMsg.textContent = 'NO REP! Squat too shallow! In HYROX, hip crease must break parallel below the knee line on every rep!';
          return;
        }

        // Clean Wall Ball Rep!
        this.wallBallHits++;
        this.playSound('chime');
        this.triggerHaptic(40);

        // Projectile animation
        if (wbBall) {
          wbBall.classList.add('tossed');
          setTimeout(() => {
            if (wbBall) wbBall.classList.remove('tossed');
          }, 350);
        }

        if (wbHitsEl) wbHitsEl.textContent = this.wallBallHits;
        const rect = wbBtn.getBoundingClientRect();
        this.burstHearts(rect.left + rect.width / 2, rect.top, 3);

        // Reset squat depth for next rep
        squatIsDeep = false;
        if (wbSquatToggle) {
          wbSquatToggle.classList.remove('deep-active');
          wbSquatToggle.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg><span>1. Squat Deep (Below Parallel)</span>';
        }
        if (depthNeedle) depthNeedle.style.left = '18%';
        if (athleteSquatEmoji) athleteSquatEmoji.classList.remove('squatting-deep');

        if (this.wallBallHits >= this.wallBallMax) {
          this.wallBallDone = true;
          wbBtn.classList.add('completed-game');
          wbBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>100 WALL BALLS CRUSHED</span>';
          if (wbSquatToggle) {
            wbSquatToggle.classList.add('completed-game');
            wbSquatToggle.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>SQUATS CLEAN</span>';
          }
          if (wbMsg) wbMsg.textContent = 'FINAL BOSS DOWN! Flawless squat depth, zero no-reps, and the Red Carpet awaits our Champion!';
          this.stampStation(8);
          this.playSound('fanfare');
          this.triggerConfetti(65);

          // Smooth scroll down to the finish line arch
          setTimeout(() => {
            const finishSec = document.getElementById('finish-section');
            if (finishSec) finishSec.scrollIntoView({ behavior: 'smooth' });
          }, 650);
        } else {
          if (wbMsg) wbMsg.textContent = `Rep ${this.wallBallHits}/3 counted! Squat deep below parallel for rep ${this.wallBallHits + 1}!`;
        }
      });
    }

    // WAX SEAL LOVE LETTER OPEN
    const waxSeal = document.getElementById('wax-seal');
    const envelopePocket = document.querySelector('.envelope-pocket');
    const unfoldedLetter = document.getElementById('unfolded-letter');

    waxSeal.addEventListener('click', (e) => {
      this.playSound('fanfare');
      this.triggerHaptic(60);
      const rect = waxSeal.getBoundingClientRect();
      this.burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
      this.triggerConfetti(50);

      waxSeal.style.transform = 'scale(1.4) rotate(15deg)';
      setTimeout(() => {
        envelopePocket.style.display = 'none';
        unfoldedLetter.classList.add('opened');
      }, 350);
    });

    // REPLAY CONFETTI
    const confettiBtn = document.getElementById('confetti-btn');
    confettiBtn.addEventListener('click', (e) => {
      this.playSound('fanfare');
      this.triggerHaptic(35);
      const rect = confettiBtn.getBoundingClientRect();
      this.burstHearts(rect.left + rect.width / 2, rect.top, 8);
      this.triggerConfetti(50);
    });

    // PEP TALK MODAL & FLOATING BUTTON
    const pepTrigger = document.getElementById('pep-talk-trigger');
    const pepModal = document.getElementById('pep-modal');
    const pepClose = document.getElementById('pep-close');
    const newPepBtn = document.getElementById('new-pep-btn');
    const pepKissBtn = document.getElementById('pep-kiss-btn');

    pepTrigger.addEventListener('click', () => {
      this.playSound('chime');
      this.triggerHaptic(30);
      pepModal.classList.add('active');
      this.showRandomPepTalk();
    });

    pepClose.addEventListener('click', () => {
      this.playSound('pop');
      pepModal.classList.remove('active');
    });

    pepModal.addEventListener('click', (e) => {
      if (e.target === pepModal) {
        pepModal.classList.remove('active');
      }
    });

    newPepBtn.addEventListener('click', (e) => {
      this.playSound('pop');
      this.triggerHaptic(20);
      this.showRandomPepTalk();
      const rect = newPepBtn.getBoundingClientRect();
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, '🎲');
    });

    pepKissBtn.addEventListener('click', (e) => {
      this.playSound('chime');
      this.triggerHaptic(50);
      const rect = pepKissBtn.getBoundingClientRect();
      const kissEmojis = ['💋', '💖', '🥰', '✨'];
      for (let i = 0; i < 14; i++) {
        setTimeout(() => {
          const randEmoji = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
          const offsetX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
          const offsetY = rect.top + (Math.random() - 0.5) * 30;
          this.createHeartParticle(offsetX, offsetY, randEmoji);
        }, i * 50);
      }
      this.triggerConfetti(25);
    });

    // HYROX RULES VAULT & PENALTY BIBLE MODAL
    const rulesTrigger = document.getElementById('rules-vault-trigger');
    const rulesModal = document.getElementById('rules-modal');
    const rulesClose = document.getElementById('rules-modal-close');
    const rulesBottomClose = document.getElementById('rules-modal-bottom-close');
    const rulesTabs = document.querySelectorAll('.rules-tab-btn');
    const rulesCards = document.querySelectorAll('.rule-bible-card');
    const rulesBody = document.getElementById('rules-modal-body');

    const openRulesModal = () => {
      if (!rulesModal) return;
      this.playSound('fanfare');
      this.triggerHaptic(40);
      rulesModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (rulesBody) rulesBody.scrollTop = 0;
    };

    const closeRulesModal = () => {
      if (!rulesModal) return;
      this.playSound('pop');
      rulesModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (rulesTrigger) {
      rulesTrigger.addEventListener('click', openRulesModal);
    }

    if (rulesClose) {
      rulesClose.addEventListener('click', closeRulesModal);
    }

    if (rulesBottomClose) {
      rulesBottomClose.addEventListener('click', closeRulesModal);
    }

    if (rulesModal) {
      rulesModal.addEventListener('click', (e) => {
        if (e.target === rulesModal) {
          closeRulesModal();
        }
      });
    }

    // Filter tabs logic
    rulesTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        rulesTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.playSound('pop');
        this.triggerHaptic(20);

        const tabCategory = tab.getAttribute('data-tab');
        rulesCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (tabCategory === 'all' || cardCat === tabCategory) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });

        if (rulesBody) rulesBody.scrollTop = 0;
      });
    });

    // Escape key listener for modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && rulesModal && rulesModal.classList.contains('active')) {
        closeRulesModal();
      }
    });
  }

  showRandomPepTalk() {
    const pepMessageText = document.getElementById('pep-message-text');
    const pepCardDoodle = document.getElementById('pep-card-doodle');
    const pepTagPill = document.getElementById('pep-tag-pill');

    if (!pepMessageText || !this.pepQuotes || this.pepQuotes.length === 0) return;

    // Pick a new quote ensuring no immediate repeat
    let newIdx = Math.floor(Math.random() * this.pepQuotes.length);
    if (this.lastPepIdx !== undefined && this.pepQuotes.length > 1) {
      while (newIdx === this.lastPepIdx) {
        newIdx = Math.floor(Math.random() * this.pepQuotes.length);
      }
    }
    this.lastPepIdx = newIdx;

    const item = this.pepQuotes[newIdx];
    const text = typeof item === 'string' ? item : item.text;
    const tag = (typeof item === 'object' && item.tag) ? item.tag : 'DORA\'S LOVE';
    const emoji = (typeof item === 'object' && item.emoji) ? item.emoji : '🌟';

    pepMessageText.classList.remove('quote-pop');
    void pepMessageText.offsetWidth;
    pepMessageText.textContent = `"${text}"`;
    pepMessageText.classList.add('quote-pop');

    if (pepCardDoodle) pepCardDoodle.textContent = emoji;
    if (pepTagPill) pepTagPill.textContent = tag;
  }

  initStations() {
    const stationsList = document.querySelector('.stations-list');
    if (!stationsList) return;

    // Check if any stations are completed and ensure their next stations are unlocked
    for (let i = 1; i <= this.totalStations; i++) {
      if (this.completedStations.has(i) && i < this.totalStations) {
        this.unlockStation(i + 1);
      }
    }

    // Direct click listeners on all stamp buttons to guarantee execution
    document.querySelectorAll('.stamp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('.station-card');
        if (card) {
          const sNum = parseInt(card.getAttribute('data-station'), 10);
          if (!isNaN(sNum)) {
            this.stampStation(sNum);
          }
        }
      });
    });

    // Tapping on locked stations gives playful shake OR unlocks if prerequisite is done!
    stationsList.addEventListener('click', (e) => {
      const lockedCard = e.target.closest('.station-card.locked');
      if (lockedCard) {
        e.preventDefault();
        e.stopPropagation();
        const sNum = parseInt(lockedCard.getAttribute('data-station'), 10);
        if (sNum === 1 || this.completedStations.has(sNum - 1)) {
          // Self-healing: prerequisite is done! Unlock it now!
          this.unlockStation(sNum);
        } else {
          this.shakeLockedStation(lockedCard);
        }
      }
    });
  }

  shakeLockedStation(card) {
    this.playSound('boing');
    this.triggerHaptic(45);
    card.classList.remove('station-shake');
    void card.offsetWidth; // Force reflow
    card.classList.add('station-shake');
    setTimeout(() => {
      card.classList.remove('station-shake');
    }, 450);
  }

  stampStation(num) {
    num = parseInt(num, 10);
    if (isNaN(num)) return;

    // Sequential prerequisite check: previous station must be completed!
    if (num > 1 && !this.completedStations.has(num - 1)) {
      const card = document.getElementById(`st-${num}`);
      if (card) this.shakeLockedStation(card);
      return;
    }

    if (!this.completedStations.has(num)) {
      this.completedStations.add(num);
      this.energyScore += 50;
      this.playSound('chime');
      this.triggerHaptic(30);
    }

    const card = document.getElementById(`st-${num}`);
    if (card) {
      card.classList.remove('locked');
      card.classList.add('completed');
      const pill = card.querySelector('.station-status-pill');
      if (pill) {
        pill.className = 'station-status-pill pill-stamped';
        pill.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Stamped & Completed';
      }
      const stampBtn = card.querySelector('.stamp-btn');
      if (stampBtn) {
        stampBtn.classList.add('completed-stamp');
        stampBtn.innerHTML = '<svg class="c-icon c-icon-sm" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Stamped & Verified</span>';
      }
      const rect = card.getBoundingClientRect();
      this.burstHearts(rect.left + rect.width / 2, rect.top + 40, 5);
    }

    this.updateProgress();

    // Progression: Unlock next station and smoothly move to it
    if (num < this.totalStations) {
      const nextNum = num + 1;
      this.unlockStation(nextNum);
    } else if (num === this.totalStations) {
      this.triggerAllStationsCompleted();
    }
  }

  unlockStation(num) {
    num = parseInt(num, 10);
    if (isNaN(num)) return;

    const card = document.getElementById(`st-${num}`);
    if (!card) return;

    card.classList.remove('locked');
    card.classList.add('just-unlocked');

    // Remove the locked overlay so it NEVER blocks interactions
    const overlay = card.querySelector('.station-locked-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      overlay.remove();
    }

    const pill = card.querySelector('.station-status-pill');
    if (pill) {
      pill.className = 'station-status-pill';
      if (num === 2 || num === 4 || num === 8) {
        pill.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg> Ready to Play!';
      } else {
        pill.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Ready to Stamp';
      }
    }

    // Play subtle fanfare sound
    setTimeout(() => {
      this.playSound('fanfare');
    }, 150);

    // Smoothly scroll athlete to the newly unlocked next station
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const rect = card.getBoundingClientRect();
      this.burstHearts(rect.left + rect.width / 2, rect.top + 35, 6);
    }, 350);

    setTimeout(() => {
      card.classList.remove('just-unlocked');
    }, 1400);
  }

  triggerAllStationsCompleted() {
    this.playSound('fanfare');
    this.triggerConfetti(90);
    setTimeout(() => {
      const finishSec = document.getElementById('finish-section');
      if (finishSec) finishSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
  }

  updateProgress() {
    const fill = document.getElementById('quest-progress-fill');
    const stationCount = document.getElementById('progress-station-count');
    const energyCount = document.getElementById('energy-count');

    const count = this.completedStations.size;
    const pct = Math.min(100, Math.round((count / this.totalStations) * 100));

    if (fill) fill.style.width = `${pct}%`;
    if (stationCount) stationCount.textContent = `Completed: ${count} of ${this.totalStations} Stations`;
    if (energyCount) {
      energyCount.innerHTML = `<svg class="c-icon c-icon-sm" viewBox="0 0 24 24"><path fill="#FFA800" d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.9 17.55 11 21 11 21z"/></svg> ${this.energyScore} Energy Points`;
    }
  }

  // Built-in Mobile Canvas Confetti
  initConfetti() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;

    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  triggerConfetti(amount = 40) {
    const colors = ['#FF4D6D', '#FFD000', '#10B981', '#C4B5FD', '#FB923C', '#38BDF8'];
    const w = this.canvas.width;

    for (let i = 0; i < amount; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: -10,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: (Math.random() - 0.5) * 4,
        velY: Math.random() * 4 + 2,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    if (!this.animationId) {
      this.renderConfetti();
    }
  }

  renderConfetti() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.velX;
      p.y += p.velY;
      p.rot += p.rotSpeed;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rot * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.ctx.restore();

      if (p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.renderConfetti());
    } else {
      this.animationId = null;
    }
  }
}

// Instantiate on load or immediately if DOM is already ready
let app;
function launchApp() {
  app = new HyroxApp();
  window.app = app;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchApp);
} else {
  launchApp();
}
