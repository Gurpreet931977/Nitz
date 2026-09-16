/**
 * SUPER NITZ & THE HYROX QUEST
 * Interactive Logic, Mini-Games, Web Audio, Emoji Particle Bursts, and Canvas Confetti
 */

class HyroxApp {
  constructor() {
    this.soundEnabled = true;
    this.audioCtx = null;
    this.hugCount = 0;
    this.energyScore = 100;
    this.completedStations = new Set([1]); // Station 1 unlocked initially
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
      { text: "Bhondu, remember how hard you trained for this! Take a deep breath, keep that cute chin up, and show that turf what you are made of!", tag: "👑 CHAMPION MINDSET", emoji: "⭐" },
      { text: "Even if your legs feel heavy, remember: you are 90% determination, 10% pure cuteness, and 100% unstoppable!", tag: "⚡ BEAST MODE", emoji: "🔥" },
      { text: "I am cheering for you so loud, even the judges in the Roxzone can hear my heart beating for you, meri jaan!", tag: "💖 PURE LOVE", emoji: "🥰" },
      { text: "Pacing is key, meri Bhondu! Smooth running, steady stations, and that signature mischievous smile that lights up my whole world!", tag: "🏃 PACING WISDOM", emoji: "👟" },
      { text: "Fun fact: When you cross the finish line, you officially get 10,000 Dora points, endless fruit smoothies, and unlimited foot rubs forever!", tag: "🥰 CHEEKY DORA", emoji: "🍓" },
      { text: "Look at that runner bib: #01 Athlete! You are already my champion, now just go out there and have the time of your life!", tag: "👑 CHAMPION MINDSET", emoji: "🥇" },
      { text: "Thakna mana hai, haar maanna impossible hai, and looking insanely adorable while lifting heavy is your superpower!", tag: "⚡ BEAST MODE", emoji: "💪" },
      { text: "Whenever you feel the burn, imagine each repetition is a warm squeeze from me waiting to scoop you up at the finish line!", tag: "💖 PURE LOVE", emoji: "🫂" },
      { text: "Wall balls? Sleds? SkiErg? Nothing in this arena is as fierce as my Bhondu when she sets her mind to conquer something!", tag: "⚡ BEAST MODE", emoji: "🦁" },
      { text: "Breathe in bravery, breathe out nerves. You are doing something 99% of people only dream of doing. I could not be prouder of you!", tag: "🌟 COURAGE", emoji: "✨" },
      { text: "Tu meri sabse strong, sabse fearless, aur sabse pyaari rockstar hai. Jab tu turf par utarti hai, arena roshan ho jata hai!", tag: "💖 PURE LOVE", emoji: "💖" },
      { text: "Every drop of sweat today is proof of your dedication. Run like the wind, breathe deep, and know Dora's eyes are always watching you with pure awe.", tag: "🏃 PACING WISDOM", emoji: "💨" },
      { text: "Whenever self-doubt whispers in your ear, remember: Dora believes in you 1000 times more than you can ever doubt yourself!", tag: "🌟 COURAGE", emoji: "🛡️" },
      { text: "Station 4, Station 6, Station 8: take it one station at a time, Bhondu! Don't race the whole clock, just win the rep right in front of you!", tag: "⏱️ SUB-1.5H MISSION", emoji: "🎯" },
      { text: "Teri yeh fighting spirit dekh kar mera dil har roz tere pyaar mein dubara girta hai. Go shine today, my brave superhero!", tag: "💖 PURE LOVE", emoji: "💘" },
      { text: "Feeling that lactic acid burn? That is just your inner beast waking up! Smile at the pain and keep those feet dancing!", tag: "⚡ BEAST MODE", emoji: "🔥" },
      { text: "Finish line par clock time jo bhi dikhaye, meri nazar mein tu pehle hi gold standard set kar chuki hai. Bas enjoy kar aur udaan bhar!", tag: "👑 CHAMPION MINDSET", emoji: "👑" },
      { text: "Sub-1.5 hours is not just a dream, it is the result of every early morning and every rep you did. It belongs to you, Bhondu!", tag: "⏱️ SUB-1.5H MISSION", emoji: "⏱️" },
      { text: "Your legs are strong, your lungs are ready, your heart is pure gold, and you have Dora cheering in your corner forever!", tag: "💖 PURE LOVE", emoji: "❤️" },
      { text: "When the sled feels heavy, lean in lower, drive through the turf, and whisper: 'Dora is waiting with the warmest hug!'", tag: "🚜 SLED POWER", emoji: "🏋️‍♀️" },
      { text: "Bhondu, you are not just participating today, you are writing your own inspiring story. Hold your head high and own every single meter!", tag: "🌟 COURAGE", emoji: "📖" },
      { text: "If you need strength in the middle of a run, take a deep breath and feel my hand in yours. I am right there running alongside your spirit!", tag: "💖 PURE LOVE", emoji: "🤝" },
      { text: "No one has your heart, no one has your grit, and definitely no one looks that cute while conquering 8 kilometers of sheer grind!", tag: "🥰 CHEEKY DORA", emoji: "🐰" },
      { text: "Remember to relax your shoulders, unclench your jaw, and let your rhythm take over. Flow like water, strike like lightning!", tag: "🏃 PACING WISDOM", emoji: "⚡" },
      { text: "Tu meri favorite human hai aur hamesha rahegi. Win or learn, you are my ultimate hero, meri jaan!", tag: "💖 PURE LOVE", emoji: "🌹" },
      { text: "The pain is temporary, but the feeling of conquering HYROX and hearing your name called will last forever. Go get it, champ!", tag: "👑 CHAMPION MINDSET", emoji: "🏆" },
      { text: "Whenever you pass a cheering crowd, remember the loudest cheer in that entire building is coming straight from Dora's soul for you!", tag: "💖 PURE LOVE", emoji: "📢" },
      { text: "Burpees getting spicy? Count to four: hands down, chest flat, pop up, leap! Robotic perfection, just like we practiced!", tag: "🐸 BURPEE RHYTHM", emoji: "🐸" },
      { text: "Dora's official race contract: After this, all grocery carrying, heavy lifting, and cooking duties are 100% mine for the next month!", tag: "🥰 CHEEKY DORA", emoji: "🥐" },
      { text: "You turned fear into focus and sweat into strength. Look at how far you have come, Bhondu. Now go claim your victory lap!", tag: "🌟 COURAGE", emoji: "🌈" },
      { text: "Sub-90 minutes is calling your name! Keep those transitions sharp, breathe through the nose, and keep that fiery spirit blazing!", tag: "⏱️ SUB-1.5H MISSION", emoji: "🚀" },
      { text: "Tu fearless hai, tu powerful hai, aur tu meri sabse pyari Bhondu hai. Bas dil khol ke daud, baaki sab Dora sambhal lega!", tag: "💖 PURE LOVE", emoji: "✨" },
      { text: "Every wall ball that hits the center of the target is a kiss from Dora waiting for you at the finish arch!", tag: "🎯 TARGET LOCK", emoji: "💋" },
      { text: "Never look at what others are doing. This is YOUR race, YOUR pace, and YOUR moment to shine bright like the sun!", tag: "👑 CHAMPION MINDSET", emoji: "☀️" },
      { text: "One kilometer at a time, one rep at a time. Before you know it, you will hear the finish crowd roaring for Super Nitz!", tag: "🏃 PACING WISDOM", emoji: "🏁" },
      { text: "Bhondu, jab tu thakne lage, bas aankhein band karke sochna: Dora finish line par khada hai, dono baazu khole hue, sirf tere liye!", tag: "💖 PURE LOVE", emoji: "🫂" },
      { text: "You have survived 100% of your hardest training days, and today you are going to thrive. Trust yourself like I trust you!", tag: "🌟 COURAGE", emoji: "💎" },
      { text: "When you feel like stopping, remember why you started. Every step is bringing you closer to glory, and Dora is so proud!", tag: "👑 CHAMPION MINDSET", emoji: "🔥" },
      { text: "Dora's promise: No matter how sweaty or exhausted you are at the end, the biggest, warmest bear hug is waiting right for you!", tag: "💖 PURE LOVE", emoji: "🧸" },
      { text: "Head up, shoulders back, smile on your face. You are the baddest, bravest, and most beautiful athlete in this entire arena!", tag: "👑 CHAMPION MINDSET", emoji: "🌸" }
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

    this.initAudio();
    this.bindEvents();
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
  }

  resumeAudio() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
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

  // Acoustic Sub-Bass Physical Rumble Engine (Physically vibrates mobile phone bodies on iPhone + Android)
  playHapticRumble(intensity = 1.0, duration = 0.35, freq = 65) {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.resumeAudio();

    try {
      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);
      osc1.frequency.exponentialRampToValueAtTime(Math.max(38, freq * 0.65), now + duration);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 1.08, now);
      osc2.frequency.exponentialRampToValueAtTime(Math.max(35, freq * 0.60), now + duration);

      const peak = Math.min(1.0, 0.75 * intensity);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(peak, now + 0.02);
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

  // Continuous Sustained Hug Rumble Engine (Runs continuously while button is held with zero audio pauses)
  startContinuousHugRumble() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.resumeAudio();

    try {
      this.stopContinuousHugRumble();

      const now = this.audioCtx.currentTime;
      this.hugRumbleMasterGain = this.audioCtx.createGain();
      this.hugRumbleMasterGain.gain.setValueAtTime(0.001, now);
      this.hugRumbleMasterGain.gain.linearRampToValueAtTime(0.48, now + 0.08);

      // Warm low-frequency oscillators for continuous organic physical resonance
      this.hugOsc1 = this.audioCtx.createOscillator();
      this.hugOsc1.type = 'triangle';
      this.hugOsc1.frequency.setValueAtTime(65, now);

      this.hugOsc2 = this.audioCtx.createOscillator();
      this.hugOsc2.type = 'sine';
      this.hugOsc2.frequency.setValueAtTime(70, now);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, now);

      this.hugOsc1.connect(filter);
      this.hugOsc2.connect(filter);
      filter.connect(this.hugRumbleMasterGain);
      this.hugRumbleMasterGain.connect(this.audioCtx.destination);

      this.hugOsc1.start(now);
      this.hugOsc2.start(now);
    } catch (e) {
      console.warn("Continuous rumble start failed", e);
    }
  }

  setHugRumbleIntensity(pct) {
    if (!this.hugRumbleMasterGain || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const targetGain = Math.min(0.85, 0.48 + (pct / 100) * 0.37);
      this.hugRumbleMasterGain.gain.cancelScheduledValues(now);
      this.hugRumbleMasterGain.gain.linearRampToValueAtTime(targetGain, now + 0.04);

      if (this.hugOsc1) {
        this.hugOsc1.frequency.setValueAtTime(65 + (pct / 100) * 15, now);
      }
      if (this.hugOsc2) {
        this.hugOsc2.frequency.setValueAtTime(70 + (pct / 100) * 15, now);
      }
    } catch (e) {}
  }

  stopContinuousHugRumble() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      if (this.hugRumbleMasterGain) {
        this.hugRumbleMasterGain.gain.cancelScheduledValues(now);
        this.hugRumbleMasterGain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      }
      setTimeout(() => {
        try {
          if (this.hugOsc1) { this.hugOsc1.stop(); this.hugOsc1.disconnect(); this.hugOsc1 = null; }
          if (this.hugOsc2) { this.hugOsc2.stop(); this.hugOsc2.disconnect(); this.hugOsc2 = null; }
          if (this.hugRumbleMasterGain) { this.hugRumbleMasterGain.disconnect(); this.hugRumbleMasterGain = null; }
        } catch (e) {}
      }, 60);
    } catch (e) {}
  }

  // --- Dedicated Continuous Vibration Methods (ZERO PAUSES) ---
  startContinuousHoldVibration() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10000);
      } catch (e) {}
    }
  }

  keepContinuousHoldVibration() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(4000);
      } catch (e) {}
    }
  }

  celebrateHugVibration() {
    if ('vibrate' in navigator) {
      try {
        // Continuous, unbroken 1.5s celebratory rumble with ZERO pauses
        navigator.vibrate(1500);
      } catch (e) {}
    }
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
  }

  // General single-pulse haptics for buttons and mini-games (never interrupts hold)
  triggerHeartbeatHaptic(level = 1) {
    if (this.holdPressActive) return; // Do not interrupt hold with pulse patterns

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

    // Acoustic Speaker Transducer Physical Rumble
    if (level === 1) {
      this.playHapticRumble(0.85, 0.25, 68);
    } else if (level === 2) {
      this.playHapticRumble(1.0, 0.36, 60);
    } else if (level === 3) {
      this.playHapticRumble(1.3, 0.45, 52);
    } else if (level >= 4) {
      this.playHapticRumble(1.8, 0.90, 44);
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

    const HUG_FULL_MS = 2600; // 2.6s for a deep, comforting long warm hug
    const MIN_HOLD_MS = 2100; // Must hold for at least 2.1s to count (tapping prevented!)

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

      hugBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        try {
          hugBtn.setPointerCapture(e.pointerId);
          this.activePointerId = e.pointerId;
        } catch (err) {}
        this.resumeAudio();
        this.holdPressActive = true;
        this.holdStartTime = Date.now();

        clearInterval(this.hugPulseInterval);
        clearTimeout(this.hugResetTimer);

        hugBtn.classList.remove('shaking', 'blooming', 'fully-charged');
        hugBtn.classList.add('squeezing');
        if (hugZone) hugZone.classList.add('holding');
        if (warmthOverlay) warmthOverlay.classList.add('warmth-holding');

        // 1) Start continuous acoustic physical rumble through speakers
        this.startContinuousHugRumble();

        // 2) Immediate continuous solid hardware motor vibration (ZERO PAUSES while holding!)
        this.startContinuousHoldVibration();

        let lastRefreshTime = Date.now();

        // Smoothly charge the hug progress and maintain continuous solid vibration
        this.hugPulseInterval = setInterval(() => {
          if (!this.holdPressActive) return;
          const elapsed = Date.now() - this.holdStartTime;
          const pct = Math.min(100, Math.round((elapsed / HUG_FULL_MS) * 100));
          if (hugFill) hugFill.style.width = `${pct}%`;
          if (hugPctBadge) hugPctBadge.textContent = `${pct}%`;

          // Dynamically ramp the acoustic rumble motor volume and frequency
          this.setHugRumbleIntensity(pct);

          // Keep physical hardware vibration 100% continuous without pauses while holding
          const nowTime = Date.now();
          if (nowTime - lastRefreshTime >= 400) {
            lastRefreshTime = nowTime;
            this.keepContinuousHoldVibration();
          }

          // Progressive phase feedback
          if (pct < 25) {
            if (hugBtnText) hugBtnText.textContent = 'Dora is reaching out...';
            if (hugMeterText) hugMeterText.textContent = 'Arms reaching out...';
          } else if (pct < 55) {
            if (hugBtnText) hugBtnText.textContent = 'Wrapping you up warm...';
            if (hugMeterText) hugMeterText.textContent = 'Wrapping around you warm...';
          } else if (pct < 80) {
            if (hugBtnText) hugBtnText.textContent = 'Squeezing super tight...';
            if (hugMeterText) hugMeterText.textContent = 'Squeezing tight with love...';
          } else if (pct < 100) {
            if (hugBtnText) hugBtnText.textContent = 'Almost there... keep holding!';
            if (hugMeterText) hugMeterText.textContent = 'Peak warmth incoming...';
          } else {
            // 100% Fully Powered Warm Hug!
            hugBtn.classList.add('fully-charged');
            if (hugBtnText) hugBtnText.textContent = '100% WARMTH! Release now!';
            if (hugMeterText) hugMeterText.textContent = 'Release to receive full hug!';
            this.keepContinuousHoldVibration();
          }

          // Warm emoji stream floating up during hold
          const rect = hugBtn.getBoundingClientRect();
          const holdEmojis = ['💖', '🥰', '🫂', '✨'];
          this.createHeartParticle(
            rect.left + rect.width / 2 + (Math.random() - 0.5) * 60,
            rect.top + 10,
            holdEmojis[Math.floor(Math.random() * holdEmojis.length)]
          );
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
        this.stopContinuousHugRumble();
        this.stopContinuousHoldVibration();

        hugBtn.classList.remove('squeezing', 'fully-charged');
        if (hugZone) hugZone.classList.remove('holding');
        if (warmthOverlay) warmthOverlay.classList.remove('warmth-holding');

        const elapsed = Date.now() - this.holdStartTime;

        // DID NOT HOLD LONG ENOUGH -> NO HUG INCREMENT (TAPPING PREVENTED!)
        if (elapsed < MIN_HOLD_MS) {
          if (hugFill) hugFill.style.width = '0%';
          if (hugPctBadge) hugPctBadge.textContent = '0%';
          hugBtn.classList.add('shaking');
          setTimeout(() => hugBtn.classList.remove('shaking'), 450);

          if (hugBtnText) hugBtnText.textContent = 'Hold longer for a real hug! 🫂';
          if (hugMeterText) hugMeterText.textContent = 'Must hold for a deep hug!';
          this.playSound('boing');

          clearTimeout(this.hugResetTimer);
          this.hugResetTimer = setTimeout(() => {
            if (hugBtnText) hugBtnText.textContent = 'Press & Hold for a Warm Hug';
            if (hugMeterText) hugMeterText.textContent = 'Hold down to feel the squeeze...';
            if (hugPctBadge) hugPctBadge.textContent = '0%';
          }, 1800);
          return;
        }

        // HELD LONG ENOUGH -> CELEBRATE FULL WARM HUG!
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
        if (hugPctBadge) hugPctBadge.textContent = '100% \u2713';

        // SOLID CONTINUOUS CELEBRATION VIBRATION: unbroken rumble with ZERO pauses!
        this.celebrateHugVibration();
        this.playSound('warmHug');
        triggerHugGlow(true);

        const rect = hugBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        this.burstHearts(centerX, centerY, 22);
        this.triggerConfetti(55);
        updateWhisper();

        clearTimeout(this.hugResetTimer);
        this.hugResetTimer = setTimeout(() => {
          if (hugBtnText) hugBtnText.textContent = 'Press & Hold for a Warm Hug';
          if (hugMeterText) hugMeterText.textContent = 'Hold down to feel the squeeze...';
          if (hugPctBadge) hugPctBadge.textContent = '0%';
        }, 2500);
      };

      hugBtn.addEventListener('pointerup', handleRelease);
      hugBtn.addEventListener('pointercancel', handleRelease);

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
          if (sledMsg) sledMsg.textContent = "⚠️ NO REP! Rear skids haven't cleared the white tape! In HYROX, all 4 skids must completely cross before turning!";
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
          sledTurnBtn.innerHTML = '<span>✅ CLEAN TURN VALIDATED!</span>';
          sledBtn.classList.add('completed-game');
          sledBtn.innerHTML = '<span>✅ 50m SLED CRUSHED!</span>';
          if (sledMsg) sledMsg.textContent = '✅ GOOD REP! All 4 skids cleared the line cleanly! Zero penalty minutes for Bhondu! 💥';
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
        burpeeDropBtn.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Chest on Turf!</span>';
        if (chestTouchIndicator) {
          chestTouchIndicator.textContent = 'Chest on Turf: YES ✓';
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
          if (burpeeMsg) burpeeMsg.textContent = "⚠️ NO REP! Chest didn't touch the turf! Both hands and chest must make full turf contact before jumping!";
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
          chestTouchIndicator.textContent = 'Chest on Turf: NO ❌';
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
          burpeeJumpBtn.innerHTML = '<span>✅ 80m JUMPS COMPLETED!</span>';
          if (burpeeDropBtn) {
            burpeeDropBtn.classList.add('completed-game');
            burpeeDropBtn.innerHTML = '<span>✅ 4 REPS DONE</span>';
          }
          if (burpeeMsg) burpeeMsg.textContent = '✅ GOOD REP! 80m burpee broad jumps conquered with flawless movement standards! 🌟';
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
          archResult.textContent = '🚨 2-MINUTE TIME PENALTY! (Disaster for Sub-1.5h!) Exiting through the IN arch is an automatic 2-minute penalty. ALWAYS exit through the OUT arch!';
        }
      });
    }

    if (archOutBtn) {
      archOutBtn.addEventListener('click', () => {
        this.playSound('fanfare');
        this.triggerHaptic(35);
        if (archResult) {
          archResult.className = 'arch-quiz-result success-flash';
          archResult.textContent = '✅ PERFECT NAVIGATION! You exited cleanly through the OUT arch. 0 penalty seconds, Sub-1.5h pacing protected!';
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
          wbSquatToggle.innerHTML = '<svg class="c-icon c-icon-xs" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Squat Deep ✓</span>';
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
          if (wbMsg) wbMsg.textContent = '⚠️ NO REP! Squat too shallow! In HYROX, hip crease must break parallel below the knee line on every rep!';
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
          wbBtn.innerHTML = '<span>🏆 100 WALL BALLS CRUSHED!</span>';
          if (wbSquatToggle) {
            wbSquatToggle.classList.add('completed-game');
            wbSquatToggle.innerHTML = '<span>✅ SQUATS CLEAN</span>';
          }
          if (wbMsg) wbMsg.textContent = '✅ FINAL BOSS DOWN! Flawless squat depth, zero no-reps, and the Red Carpet awaits our Champion! 👑';
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
    const tag = (typeof item === 'object' && item.tag) ? item.tag : '💖 DORA\'S LOVE';
    const emoji = (typeof item === 'object' && item.emoji) ? item.emoji : '🌟';

    pepMessageText.classList.remove('quote-pop');
    void pepMessageText.offsetWidth;
    pepMessageText.textContent = `"${text}"`;
    pepMessageText.classList.add('quote-pop');

    if (pepCardDoodle) pepCardDoodle.textContent = emoji;
    if (pepTagPill) pepTagPill.textContent = tag;
  }

  stampStation(num) {
    if (!this.completedStations.has(num)) {
      this.completedStations.add(num);
      this.energyScore += 50;
      this.playSound('chime');
      this.triggerHaptic(30);
    }

    const card = document.getElementById(`st-${num}`);
    if (card) {
      card.classList.add('completed');
      const pill = card.querySelector('.station-status-pill');
      if (pill) {
        pill.innerHTML = '✅ Stamped!';
      }
      const stampBtn = card.querySelector('.stamp-btn');
      if (stampBtn) {
        stampBtn.classList.add('completed-stamp');
        stampBtn.innerHTML = '<svg class="c-icon c-icon-sm" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>✅ Stamped & Verified!</span>';
      }
    }

    this.updateProgress();
  }

  updateProgress() {
    const fill = document.getElementById('quest-progress-fill');
    const stationCount = document.getElementById('progress-station-count');
    const energyCount = document.getElementById('energy-count');

    const count = this.completedStations.size;
    const pct = Math.min(100, Math.round((count / this.totalStations) * 100));

    if (fill) fill.style.width = `${pct}%`;
    if (stationCount) stationCount.textContent = `Completed: ${count} of ${this.totalStations} Stations`;
    if (energyCount) energyCount.innerHTML = `⚡ ${this.energyScore} Energy Points`;
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

// Instantiate on load
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new HyroxApp();
  window.app = app;
});
