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

    // Love quotes for Bhondu (Zero em-dashes)
    this.pepQuotes = [
      "Bhondu, remember how hard you trained for this! Take a deep breath, keep that cute chin up, and crush it!",
      "Even if you feel tired, remember: you're 90% determination, 10% pure cuteness, and 100% unstoppable!",
      "I'm cheering for you so loud, even the judges in the Roxzone can hear my heart beating for you!",
      "Pacing is key, meri jaan! Smooth running, steady stations, and that signature Bhondu smile!",
      "Fun fact: When you cross the finish line, you officially get 10,000 Dora points, endless smoothies, and infinite foot rubs!",
      "Look at that runner bib: #01 Athlete! You are already my champion, now just go have fun on the turf!",
      "Thakna mana hai, haar maanna impossible hai, and looking adorable while lifting is your specialty!",
      "Whenever you feel the burn, imagine each repetition is a high-five from me waiting at the finish line!",
      "Wall balls? Sleds? SkiErg? Nothing is as fierce as my Bhondu when she decides to do something!",
      "Breathe in bravery, breathe out nerves. You're doing something 99% of people only dream of doing. Proud of you!"
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
  playHapticRumble(intensity = 1.0, duration = 0.28, freq = 52) {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.resumeAudio();

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(110, now);

      osc.type = 'sine';
      // Low sub-bass frequency that physically resonates the mobile phone chassis
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(35, freq * 0.75), now + duration);

      const peak = Math.min(0.95, 0.45 * intensity);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(peak, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  triggerHaptic(ms = 35) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch (e) {}
    }
  }

  // High-impact multi-level haptics (Hardware Actuator + Speaker Rumble)
  triggerHeartbeatHaptic(level = 1) {
    // 1) Hardware Actuator Vibrations (Android / supported devices)
    if ('vibrate' in navigator) {
      try {
        if (level === 1) {
          // Contact / initial charge pulse
          navigator.vibrate([120, 70, 180]);
        } else if (level === 2) {
          // Building warmth heartbeat
          navigator.vibrate([160, 60, 240]);
        } else if (level === 3) {
          // High intensity charging heartbeat
          navigator.vibrate([220, 50, 320]);
        } else if (level >= 4) {
          // HUGE CELEBRATORY WARM HUG IMPACT (extra powerful & long)
          navigator.vibrate([260, 70, 380, 80, 520, 90, 750]);
        }
      } catch (e) {}
    }

    // 2) Acoustic Speaker Transducer Physical Rumble (Works on iPhone + Android)
    if (level === 1) {
      this.playHapticRumble(0.7, 0.22, 54);
    } else if (level === 2) {
      this.playHapticRumble(0.9, 0.28, 50);
    } else if (level === 3) {
      this.playHapticRumble(1.1, 0.36, 46);
    } else if (level >= 4) {
      this.playHapticRumble(1.3, 0.65, 42);
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
    // Portal Hub / First Page View Switching
    const openQuestBtn = document.getElementById('open-quest-btn');
    const backToPortalBtn = document.getElementById('back-to-portal-btn');
    const portalView = document.getElementById('portal-view');
    const questView = document.getElementById('quest-view');
    const floatingPepWrap = document.getElementById('floating-pep-wrap');

    if (openQuestBtn) {
      openQuestBtn.addEventListener('click', (e) => {
        this.resumeAudio();
        this.playSound('fanfare');
        this.triggerHaptic(50);

        const rect = openQuestBtn.getBoundingClientRect();
        this.burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
        this.triggerConfetti(35);

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
        }, 280);
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
    const hugBtn = document.getElementById('hug-btn');
    const hugCounter = document.getElementById('hug-counter');
    const hugFill = document.getElementById('hug-hold-fill');
    const hugWhisper = document.getElementById('hug-whisper');
    const hugWhisperText = document.getElementById('hug-whisper-text');
    const hugBtnText = document.getElementById('hug-btn-text');
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
        this.resumeAudio();
        this.holdPressActive = true;
        this.holdStartTime = Date.now();

        clearInterval(this.hugPulseInterval);
        clearTimeout(this.hugResetTimer);

        hugBtn.classList.remove('shaking', 'blooming');
        hugBtn.classList.add('squeezing');
        if (warmthOverlay) warmthOverlay.classList.add('warmth-holding');

        // Immediate strong physical actuator + speaker thump on contact
        this.triggerHeartbeatHaptic(1);

        let lastBeatTier = 0;

        // Smoothly charge the hug progress and escalate heartbeats
        this.hugPulseInterval = setInterval(() => {
          if (!this.holdPressActive) return;
          const elapsed = Date.now() - this.holdStartTime;
          const pct = Math.min(100, Math.round((elapsed / HUG_FULL_MS) * 100));
          if (hugFill) hugFill.style.width = `${pct}%`;

          // Progressive phase feedback
          if (pct < 25) {
            if (hugBtnText) hugBtnText.textContent = 'Dora is reaching out... 🫂';
          } else if (pct < 55) {
            if (hugBtnText) hugBtnText.textContent = 'Wrapping you up warm... 💖';
            if (lastBeatTier < 1) {
              lastBeatTier = 1;
              this.triggerHeartbeatHaptic(1);
            }
          } else if (pct < 85) {
            if (hugBtnText) hugBtnText.textContent = 'Squeezing super tight... 🥰';
            if (lastBeatTier < 2) {
              lastBeatTier = 2;
              this.triggerHeartbeatHaptic(2);
            }
          } else if (pct < 100) {
            if (hugBtnText) hugBtnText.textContent = 'Almost there... keep holding! ✨';
            if (lastBeatTier < 3) {
              lastBeatTier = 3;
              this.triggerHeartbeatHaptic(3);
            }
          } else {
            // 100% Fully Powered Warm Hug!
            if (hugBtnText) hugBtnText.textContent = '100% WARMTH! Release now! 💖✨';
            if (lastBeatTier < 4) {
              lastBeatTier = 4;
              this.triggerHeartbeatHaptic(3);
            }
          }

          // Warm emoji stream floating up during hold
          const rect = hugBtn.getBoundingClientRect();
          const holdEmojis = ['💖', '🥰', '🫂', '✨'];
          this.createHeartParticle(
            rect.left + rect.width / 2 + (Math.random() - 0.5) * 50,
            rect.top + 10,
            holdEmojis[Math.floor(Math.random() * holdEmojis.length)]
          );
        }, 60);
      });

      const handleRelease = () => {
        if (!this.holdPressActive) return;
        this.holdPressActive = false;

        clearInterval(this.hugPulseInterval);

        hugBtn.classList.remove('squeezing');
        if (warmthOverlay) warmthOverlay.classList.remove('warmth-holding');

        const elapsed = Date.now() - this.holdStartTime;

        // DID NOT HOLD LONG ENOUGH -> NO HUG INCREMENT (TAPPING PREVENTED!)
        if (elapsed < MIN_HOLD_MS) {
          if (hugFill) hugFill.style.width = '0%';
          hugBtn.classList.add('shaking');
          setTimeout(() => hugBtn.classList.remove('shaking'), 450);

          if (hugBtnText) hugBtnText.textContent = 'Hold longer for a real hug! 🫂';
          if ('vibrate' in navigator) {
            try { navigator.vibrate([100, 60, 100]); } catch (e) {}
          }
          this.playSound('boing');

          clearTimeout(this.hugResetTimer);
          this.hugResetTimer = setTimeout(() => {
            if (hugBtnText) hugBtnText.textContent = 'Press & Hold for a Warm Hug!';
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
        setTimeout(() => hugBtn.classList.remove('blooming'), 600);

        if (hugBtnText) hugBtnText.textContent = 'Warm Hug Sent with All My Love! 💖';

        // EXTRA IMPACTFUL VIBRATION SEQUENCE (Heavy Actuator + Sub-bass acoustic rumble)
        this.triggerHeartbeatHaptic(4);
        this.playSound('warmHug');
        triggerHugGlow(true);

        const rect = hugBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        this.burstHearts(centerX, centerY, 16);
        this.triggerConfetti(45);
        updateWhisper();

        clearTimeout(this.hugResetTimer);
        this.hugResetTimer = setTimeout(() => {
          if (hugBtnText) hugBtnText.textContent = 'Press & Hold for a Warm Hug!';
        }, 2500);
      };

      hugBtn.addEventListener('pointerup', handleRelease);
      hugBtn.addEventListener('pointercancel', handleRelease);
      hugBtn.addEventListener('pointerleave', () => {
        if (this.holdPressActive) handleRelease();
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

    // Checklist checkboxes
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

    // MINI GAME 1: SLED PUSH
    const sledBtn = document.getElementById('sled-push-btn');
    const sledRunner = document.getElementById('sled-runner');
    const sledFill = document.getElementById('sled-fill');
    const sledTaps = document.getElementById('sled-taps');
    const sledMsg = document.getElementById('sled-msg');

    sledBtn.addEventListener('click', (e) => {
      if (this.sledDone) return;
      this.sledTaps++;
      this.playSound('pop');
      this.triggerHaptic(25);

      const percent = Math.min(100, (this.sledTaps / this.sledMax) * 100);
      sledFill.style.width = `${percent}%`;
      sledRunner.style.left = `calc(${percent}% * 0.72 + 10px)`;
      sledTaps.textContent = this.sledTaps;

      const rect = sledBtn.getBoundingClientRect();
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, '🔥');

      if (this.sledTaps >= this.sledMax) {
        this.sledDone = true;
        sledBtn.classList.add('completed-game');
        sledBtn.innerHTML = "✅ SLED CRUSHED! YOU'RE A BEAST!";
        sledMsg.textContent = 'Boom! 50m of pure power slayed by Bhondu! 💥';
        this.stampStation(2);
        this.playSound('fanfare');
        this.burstHearts(rect.left + rect.width / 2, rect.top, 10);
      }
    });

    // MINI GAME 2: BURPEE JUMPS
    const burpeeBtn = document.getElementById('burpee-jump-btn');
    const burpeeJumper = document.getElementById('burpee-jumper');
    const burpeeJumpsEl = document.getElementById('burpee-jumps');
    const burpeeMsg = document.getElementById('burpee-msg');

    burpeeBtn.addEventListener('click', (e) => {
      if (this.burpeeDone) return;
      this.burpeeJumps++;
      this.playSound('boing');
      this.triggerHaptic(35);

      // Leap animation
      burpeeJumper.style.transform = 'translateY(-22px) scale(1.3) rotate(-10deg)';
      setTimeout(() => {
        burpeeJumper.style.transform = 'translateY(0px) scale(1) rotate(0deg)';
      }, 220);

      const percent = (this.burpeeJumps / this.burpeeMax) * 100;
      burpeeJumper.style.left = `calc(${percent}% * 0.75 + 15px)`;
      burpeeJumpsEl.textContent = this.burpeeJumps;

      const rect = burpeeBtn.getBoundingClientRect();
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, '🐸');

      if (this.burpeeJumps >= this.burpeeMax) {
        this.burpeeDone = true;
        burpeeBtn.classList.add('completed-game');
        burpeeBtn.innerHTML = '✅ 80m JUMPS COMPLETED! HALFWAY!';
        burpeeMsg.textContent = 'Froggy leaps slayed! The mental hump is conquered! 🌟';
        this.stampStation(4);
        this.playSound('fanfare');
        this.burstHearts(rect.left + rect.width / 2, rect.top, 10);
      }
    });

    // MINI GAME 3: WALL BALLS
    const wbBtn = document.getElementById('wallball-toss-btn');
    const wbBall = document.getElementById('wallball-ball');
    const wbHitsEl = document.getElementById('wb-hits');
    const wbMsg = document.getElementById('wb-msg');

    wbBtn.addEventListener('click', (e) => {
      if (this.wallBallDone) return;
      this.wallBallHits++;
      this.playSound('boing');
      this.triggerHaptic(40);

      // Throw projectile
      wbBall.classList.add('tossed');
      setTimeout(() => {
        wbBall.classList.remove('tossed');
      }, 350);

      wbHitsEl.textContent = this.wallBallHits;
      const rect = wbBtn.getBoundingClientRect();
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, '🎯');

      if (this.wallBallHits >= this.wallBallMax) {
        this.wallBallDone = true;
        wbBtn.classList.add('completed-game');
        wbBtn.innerHTML = '🏆 TARGET HIT! ALL 8 STATIONS CONQUERED!';
        wbMsg.textContent = 'FINAL BOSS DOWN! The Red Carpet awaits our Champion! 👑';
        this.stampStation(8);
        this.playSound('fanfare');
        this.triggerConfetti(60);

        // Smooth scroll down to the finish line arch
        setTimeout(() => {
          document.getElementById('finish-section').scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }
    });

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
  }

  showRandomPepTalk() {
    const pepMessageText = document.getElementById('pep-message-text');
    const quote = this.pepQuotes[Math.floor(Math.random() * this.pepQuotes.length)];
    pepMessageText.textContent = `"${quote}"`;
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
