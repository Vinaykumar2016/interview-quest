// Interview Quest - Gamification, XP, Levels, Badges, and Streaks

const BADGES_DEFINITIONS = [
  { id: 'first_steps', name: 'First Steps', icon: '🎯', desc: 'Read your first set of quick notes!' },
  { id: 'quiz_master', name: 'Quiz Master', icon: '💯', desc: 'Get a perfect 100% score on any quiz!' },
  { id: 'knowledge_seeker', name: 'Knowledge Seeker', icon: '📖', desc: 'Read notes for 5 different topics.' },
  { id: 'card_shark', name: 'Card Shark', icon: '🃏', desc: 'Complete 3 flashcard decks.' },
  { id: 'interviewer', name: 'Confidence Builder', icon: '🎙️', desc: 'Complete 3 mock interviews.' },
  { id: 'all_star', name: 'Daily Champion', icon: '🏆', desc: 'Complete all 3 daily missions.' },
  { id: 'on_fire', name: 'On Fire', icon: '🔥', desc: 'Achieve a 3-day learning streak.' }
];

window.Gamification = {
  // Get XP required for a specific level
  getXpForLevel(level) {
    return level * 300; // Level 1: 300 XP, Level 2: 600 XP, etc.
  },

  // Add XP and handle level ups
  addXp(amount, reason = '') {
    const state = window.AppStorage.loadState();
    let user = state.user;
    
    user.xp += amount;
    user.totalXp += amount;
    
    // Log XP in dailyLog
    const today = this.getTodayDateString();
    let logEntry = state.dailyLog.find(l => l.date === today);
    if (!logEntry) {
      logEntry = { date: today, xpEarned: 0 };
      state.dailyLog.push(logEntry);
    }
    logEntry.xpEarned += amount;

    // Level up check
    let leveledUp = false;
    while (user.xp >= this.getXpForLevel(user.level)) {
      user.xp -= this.getXpForLevel(user.level);
      user.level += 1;
      leveledUp = true;
    }

    window.AppStorage.saveState(state);
    
    // Trigger effects
    if (amount > 0) {
      this.showXpNotification(amount, reason);
      if (window.SoundEffects) window.SoundEffects.playXp();
    }
    if (leveledUp) {
      this.showLevelUpModal(user.level);
    }

    this.checkBadges();
    return { leveledUp, level: user.level, xp: user.xp };
  },

  // Check and update streak
  checkStreak() {
    const state = window.AppStorage.loadState();
    const today = this.getTodayDateString();
    const lastActive = state.user.lastActiveDate;

    if (!lastActive) {
      state.user.currentStreak = 1;
      state.user.longestStreak = 1;
      state.user.lastActiveDate = today;
    } else {
      const diffDays = this.getDaysDifference(lastActive, today);
      if (diffDays === 1) {
        // Active on consecutive day
        state.user.currentStreak += 1;
        if (state.user.currentStreak > state.user.longestStreak) {
          state.user.longestStreak = state.user.currentStreak;
        }
        state.user.lastActiveDate = today;
      } else if (diffDays > 1) {
        // Streak broken
        state.user.currentStreak = 1;
        state.user.lastActiveDate = today;
      }
    }

    window.AppStorage.saveState(state);
    this.checkBadges();
  },

  // Generate Daily Missions
  checkMissions() {
    const state = window.AppStorage.loadState();
    const today = this.getTodayDateString();

    if (state.missions.date !== today) {
      // Generate new missions
      const allTopics = this.getAllTopics();
      if (allTopics.length === 0) return;

      const randomTopic1 = allTopics[Math.floor(Math.random() * allTopics.length)];
      let randomTopic2 = allTopics[Math.floor(Math.random() * allTopics.length)];
      let randomTopic3 = allTopics[Math.floor(Math.random() * allTopics.length)];

      // Make them unique if possible
      if (allTopics.length > 2) {
        while (randomTopic2.id === randomTopic1.id) {
          randomTopic2 = allTopics[Math.floor(Math.random() * allTopics.length)];
        }
        while (randomTopic3.id === randomTopic1.id || randomTopic3.id === randomTopic2.id) {
          randomTopic3 = allTopics[Math.floor(Math.random() * allTopics.length)];
        }
      }

      state.missions = {
        date: today,
        completedAll: false,
        list: [
          {
            id: 'mission_notes',
            type: 'notes',
            topicId: randomTopic1.id,
            text: `Read notes for topic: ${randomTopic1.name}`,
            required: 1,
            current: 0,
            xp: 50,
            completed: false
          },
          {
            id: 'mission_quiz',
            type: 'quiz',
            topicId: randomTopic2.id,
            text: `Pass a quiz on: ${randomTopic2.name} with 80%+`,
            required: 1,
            current: 0,
            xp: 100,
            completed: false
          },
          {
            id: 'mission_interview',
            type: 'interview',
            topicId: randomTopic3.id,
            text: `Practice 2 interview questions on: ${randomTopic3.name}`,
            required: 2,
            current: 0,
            xp: 75,
            completed: false
          }
        ]
      };
      window.AppStorage.saveState(state);
    }
  },

  // Progress a mission
  updateMissionProgress(type, topicId, increment = 1, isSuccess = true) {
    const state = window.AppStorage.loadState();
    let updated = false;

    state.missions.list.forEach(mission => {
      if (!mission.completed && mission.type === type && mission.topicId === topicId) {
        if (type === 'quiz' && !isSuccess) return; // For quiz mission, must pass/succeed
        
        mission.current = Math.min(mission.required, mission.current + increment);
        if (mission.current >= mission.required) {
          mission.completed = true;
          updated = true;
          // Award XP in separate call but save state first
          setTimeout(() => {
            this.addXp(mission.xp, `Completed Daily Mission: ${mission.text}`);
          }, 50);
        }
      }
    });

    // Check if all missions are completed
    if (updated) {
      const allDone = state.missions.list.every(m => m.completed);
      if (allDone && !state.missions.completedAll) {
        state.missions.completedAll = true;
        setTimeout(() => {
          this.addXp(150, 'Completed all daily missions! 🏆');
        }, 100);
      }
      window.AppStorage.saveState(state);
    }
  },

  // Check Badges Unlocked
  checkBadges() {
    const state = window.AppStorage.loadState();
    let currentBadges = state.badges.map(b => b.id);
    let newlyUnlocked = [];

    // Helper to unlock
    const unlock = (badgeId) => {
      if (!currentBadges.includes(badgeId)) {
        const def = BADGES_DEFINITIONS.find(b => b.id === badgeId);
        const newBadge = { ...def, unlockedDate: this.getTodayDateString() };
        state.badges.push(newBadge);
        newlyUnlocked.push(newBadge);
      }
    };

    // 1. First Steps
    let readNotesCount = Object.values(state.progress).filter(p => p.notesRead).length;
    if (readNotesCount >= 1) unlock('first_steps');
    if (readNotesCount >= 5) unlock('knowledge_seeker');

    // 2. Quiz Master
    let perfectQuizzes = Object.values(state.progress).some(p => p.quizScores && p.quizScores.includes(100));
    if (perfectQuizzes) unlock('quiz_master');

    // 3. Card Shark
    let completedDecks = Object.values(state.progress).filter(p => p.flashcardsCompleted).length;
    if (completedDecks >= 3) unlock('card_shark');

    // 4. Confidence Builder
    let totalInterviews = Object.values(state.progress).reduce((acc, p) => acc + (p.interviewsDone || 0), 0);
    if (totalInterviews >= 3) unlock('interviewer');

    // 5. Streaks
    if (state.user.currentStreak >= 3) unlock('on_fire');

    // 6. Daily Champion (all_star)
    if (state.missions.completedAll) unlock('all_star');

    if (newlyUnlocked.length > 0) {
      window.AppStorage.saveState(state);
      newlyUnlocked.forEach(badge => this.showBadgeModal(badge));
    }
  },

  // Helpers
  getTodayDateString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  getDaysDifference(date1Str, date2Str) {
    const d1 = new Date(date1Str);
    const d2 = new Date(date2Str);
    const diffTime = Math.abs(d2 - d1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  },

  getAllTopics() {
    let topics = [];
    if (window.CATEGORIES) {
      window.CATEGORIES.forEach(c => {
        if (c.topics) {
          c.topics.forEach(t => {
            topics.push({ id: t.id, name: t.name, categoryId: c.id });
          });
        }
      });
    }
    return topics;
  },

  showXpNotification(amount, reason) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notif = document.createElement('div');
    notif.className = 'xp-notification';
    notif.innerHTML = `
      <span class="xp-bubble">+${amount} XP</span>
      <span class="xp-reason">${reason || 'XP Earned!'}</span>
    `;
    container.appendChild(notif);
    
    // Auto-remove after animation
    setTimeout(() => {
      notif.classList.add('fade-out');
      setTimeout(() => notif.remove(), 500);
    }, 3000);
  },

  showLevelUpModal(newLevel) {
    const modal = document.getElementById('gamification-modal');
    if (!modal) return;
    
    modal.innerHTML = `
      <div class="modal-content level-up-modal">
        <div class="emoji-animate">🎉</div>
        <h2>LEVEL UP!</h2>
        <p>Pratiksha, you reached <strong>Level ${newLevel}</strong>!</p>
        <p class="subtitle">Keep learning and master your next interview!</p>
        <button onclick="document.getElementById('gamification-modal').classList.remove('active')">Awesome!</button>
      </div>
    `;
    modal.classList.add('active');
    this.triggerConfetti();
    if (window.SoundEffects) window.SoundEffects.playLevelUp();
  },

  showBadgeModal(badge) {
    const modal = document.getElementById('gamification-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-content badge-unlock-modal">
        <div class="badge-icon-unlock">${badge.icon}</div>
        <h2>ACHIEVEMENT UNLOCKED!</h2>
        <h3>${badge.name}</h3>
        <p>${badge.desc}</p>
        <button onclick="document.getElementById('gamification-modal').classList.remove('active')">Let's Go!</button>
      </div>
    `;
    modal.classList.add('active');
    this.triggerConfetti();
    if (window.SoundEffects) window.SoundEffects.playLevelUp();
  },

  triggerConfetti() {
    // Simple canvas confetti or emoji particles in DOM
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'confetti-container';
    document.body.appendChild(particlesContainer);

    const emojis = ['🎉', '✨', '⚡', '🏆', '🔥', '💻', '☕'];
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.fontSize = Math.random() * 20 + 10 + 'px';
      particlesContainer.appendChild(particle);
    }

    setTimeout(() => particlesContainer.remove(), 4000);
  }
};

window.SoundEffects = {
  ctx: null,

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser.", e);
    }
  },

  isSoundEnabled() {
    const state = window.AppStorage.loadState();
    return state.settings && state.settings.soundEnabled;
  },

  playTone(freq, type, duration, startTimeOffset = 0) {
    this.init();
    if (!this.ctx || !this.isSoundEnabled()) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTimeOffset);

    // Envelope
    gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime + startTimeOffset);
    gainNode.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + startTimeOffset + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTimeOffset + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + startTimeOffset);
    osc.stop(this.ctx.currentTime + startTimeOffset + duration);
  },

  playClick() {
    this.playTone(800, 'sine', 0.08);
  },

  playXp() {
    this.playTone(523.25, 'sine', 0.15, 0); // C5
    this.playTone(659.25, 'sine', 0.25, 0.06); // E5
  },

  playSuccess() {
    this.playTone(523.25, 'sine', 0.12, 0); // C5
    this.playTone(659.25, 'sine', 0.12, 0.08); // E5
    this.playTone(783.99, 'sine', 0.12, 0.16); // G5
    this.playTone(1046.50, 'sine', 0.35, 0.24); // C6
  },

  playLevelUp() {
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.35, idx * 0.07);
    });
  }
};
