/**
 * SUPER NITZ & THE HYROX QUEST
 * Interactive Logic, Mini-Games, Web Audio, SVG Particle Bursts, and Canvas Confetti
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

    // Love quotes for Bhondu
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
    }
  }

  triggerHaptic(ms = 35) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch (e) {}
    }
  }

  // Floating SVG Particle on user interaction
  createHeartParticle(x, y, iconId = 'icon-heart') {
    const particle = document.createElement('div');
    particle.className = 'floating-svg-particle';
    particle.innerHTML = `<svg class="c-icon c-icon-lg"><use href="#${iconId}"></use></svg>`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const randX = (Math.random() - 0.5) * 120;
    const randRot = (Math.random() - 0.5) * 60;
    particle.style.setProperty('--rand-x', `${randX}px`);
    particle.style.setProperty('--rand-rot', `${randRot}deg`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1300);
  }

  burstHearts(x, y, count = 6) {
    const icons = ['icon-heart', 'icon-sparkle', 'icon-paw', 'icon-star', 'icon-kiss', 'icon-fire'];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const randIcon = icons[Math.floor(Math.random() * icons.length)];
        const offsetX = x + (Math.random() - 0.5) * 40;
        const offsetY = y + (Math.random() - 0.5) * 30;
        this.createHeartParticle(offsetX, offsetY, randIcon);
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
      soundIcon.innerHTML = this.soundEnabled 
        ? '<svg class="c-icon"><use href="#icon-sound-on"></use></svg>'
        : '<svg class="c-icon"><use href="#icon-sound-off"></use></svg>';
      soundState.textContent = this.soundEnabled ? 'ON' : 'OFF';
      this.playSound('pop');
      this.triggerHaptic(20);
      this.createHeartParticle(e.clientX || 50, e.clientY || 50, this.soundEnabled ? 'icon-sparkle' : 'icon-star');
    });

    // Hugs Button
    const hugBtn = document.getElementById('hug-btn');
    const hugCounter = document.getElementById('hug-counter');
    hugBtn.addEventListener('click', (e) => {
      this.hugCount++;
      hugCounter.textContent = `${this.hugCount} hug${this.hugCount === 1 ? '' : 's'} sent!`;
      this.playSound('chime');
      this.triggerHaptic(40);
      const rect = hugBtn.getBoundingClientRect();
      this.burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
    });

    // Checklist checkboxes
    const checkboxes = document.querySelectorAll('.doodle-checkbox');
    const checklistStatus = document.getElementById('checklist-status');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        this.playSound('pop');
        this.triggerHaptic(25);
        const checkedCount = document.querySelectorAll('.doodle-checkbox:checked').length;
        if (checkedCount === checkboxes.length) {
          checklistStatus.innerHTML = '<svg class="c-icon c-icon-sm text-emerald"><use href="#icon-stamp"></use></svg> 100% Ready! Bhondu is an unstoppable beast!';
          this.playSound('fanfare');
          this.triggerConfetti(30);
        } else {
          checklistStatus.innerHTML = `<svg class="c-icon c-icon-sm text-gold"><use href="#icon-bolt"></use></svg> ${checkedCount} of ${checkboxes.length} ready! Keep going, champ!`;
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
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, 'icon-fire');

      if (this.sledTaps >= this.sledMax) {
        this.sledDone = true;
        sledBtn.classList.add('completed-game');
        sledBtn.innerHTML = '<svg class="c-icon"><use href="#icon-stamp"></use></svg> SLED CRUSHED! YOU ARE A BEAST!';
        sledMsg.textContent = "Boom! 50m of pure power slayed by Bhondu!";
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
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, 'icon-frog');

      if (this.burpeeJumps >= this.burpeeMax) {
        this.burpeeDone = true;
        burpeeBtn.classList.add('completed-game');
        burpeeBtn.innerHTML = '<svg class="c-icon"><use href="#icon-stamp"></use></svg> 80m JUMPS COMPLETED! HALFWAY!';
        burpeeMsg.textContent = "Froggy leaps slayed! The mental hump is conquered!";
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
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, 'icon-target');

      if (this.wallBallHits >= this.wallBallMax) {
        this.wallBallDone = true;
        wbBtn.classList.add('completed-game');
        wbBtn.innerHTML = '<svg class="c-icon"><use href="#icon-trophy"></use></svg> TARGET HIT! ALL 8 STATIONS CONQUERED!';
        wbMsg.textContent = "FINAL BOSS DOWN! The Red Carpet awaits our Champion!";
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
      this.createHeartParticle(rect.left + rect.width / 2, rect.top, 'icon-dice');
    });

    pepKissBtn.addEventListener('click', (e) => {
      this.playSound('chime');
      this.triggerHaptic(50);
      const rect = pepKissBtn.getBoundingClientRect();
      const kissIcons = ['icon-kiss', 'icon-kiss', 'icon-heart', 'icon-sparkle'];
      for (let i = 0; i < 14; i++) {
        setTimeout(() => {
          const randIcon = kissIcons[Math.floor(Math.random() * kissIcons.length)];
          const offsetX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60;
          const offsetY = rect.top + (Math.random() - 0.5) * 30;
          this.createHeartParticle(offsetX, offsetY, randIcon);
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
        pill.innerHTML = '<svg class="c-icon c-icon-sm text-emerald"><use href="#icon-stamp"></use></svg> Stamped!';
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
    if (energyCount) energyCount.innerHTML = `<svg class="c-icon c-icon-sm text-gold"><use href="#icon-bolt"></use></svg> ${this.energyScore} Energy Points`;
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
