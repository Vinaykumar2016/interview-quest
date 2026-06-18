// Interview Quest - Daily Coding Challenge Controller

window.DailyChallenge = {
  currentTabType: 'stream', // 'stream' or 'dsa'
  currentTabIndex: 0, // 0 or 1
  isSolutionRevealed: false,

  render(containerId) {
    this.lastContainerId = containerId;
    const container = document.getElementById(containerId);
    if (!container) return;

    this.initDailyChallenge();

    const state = window.AppStorage.loadState();
    const challenge = state.dailyChallenge;
    
    // Check if everything is completed
    const allCompleted = challenge.completed.stream.every(v => v) && challenge.completed.dsa.every(v => v);

    // If completed and not yet claimed, claim XP!
    if (allCompleted && !challenge.claimedXp) {
      challenge.claimedXp = true;
      window.AppStorage.saveState(state);
      setTimeout(() => {
        window.Gamification.addXp(150, "Completed Daily Coding Challenge! 🏆");
        if (window.SoundEffects) window.SoundEffects.playSuccess();
        if (containerId === 'dashboard-daily-arena-container') {
          window.Dashboard.render('app-container');
        } else {
          this.render(containerId);
        }
      }, 100);
    }

    // Render tab headers
    const tabsHtml = this.generateTabsHtml(challenge);

    // Get current active question details
    const activeQuestion = this.getActiveQuestion(challenge);

    let contentHtml = '';
    if (activeQuestion) {
      const isCurrentCompleted = challenge.completed[this.currentTabType][this.currentTabIndex];
      
      const escapedInitial = activeQuestion.initialCode
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const escapedSolution = activeQuestion.solutionCode
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      contentHtml = `
        <div class="challenge-body">
          <div class="problem-statement glass-card">
            <div class="problem-title-header">
              <h3>${activeQuestion.title}</h3>
              <span class="difficulty-tag ${challenge.level}">${challenge.level.toUpperCase()}</span>
            </div>
            <p class="problem-desc">${activeQuestion.description}</p>
            
            <div class="code-editor-mock">
              <div class="editor-header">
                <span>Starter Code Template</span>
                <span class="lang-label">JAVA</span>
              </div>
              <pre><code>${escapedInitial}</code></pre>
            </div>
          </div>

          <div class="solution-panel">
            ${this.isSolutionRevealed ? `
              <div class="solution-revealed-box glass-card fade-in">
                <div class="problem-title-header" style="color: var(--success)">
                  <h3>Model Implementation</h3>
                  <span class="check-badge">✅ Optimal Solution</span>
                </div>
                <div class="code-editor-mock solution-code">
                  <pre><code>${escapedSolution}</code></pre>
                </div>
                <div class="explanation-section">
                  <h4>Key Insights & Explanation:</h4>
                  <p>${activeQuestion.explanation}</p>
                </div>

                <div class="self-grade-actions">
                  <p>Compare with your mental model. Did you get this correct?</p>
                  <div class="grade-btns">
                    <button class="grade-btn wrong-btn" onclick="window.DailyChallenge.markQuestion(false)">📚 Needs Review</button>
                    <button class="grade-btn correct-btn" onclick="window.DailyChallenge.markQuestion(true)">👍 Got it!</button>
                  </div>
                </div>
              </div>
            ` : `
              <div class="solution-placeholder glass-card">
                <span class="lock-icon">🔒</span>
                <p>Review the problem statement and formulate your solution mentally or write it down.</p>
                <button class="primary-btn" onclick="window.DailyChallenge.revealSolution()">Reveal Model Solution 🎙️</button>
              </div>
            `}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="daily-challenge-container">
        <div class="challenge-header">
          <div class="header-left-title">
            <h1>🔥 Daily Coding Arena</h1>
            <p>Maintain your streak to increase the challenge! Current level: <strong>${challenge.level.toUpperCase()}</strong> (Streak: ${state.user.currentStreak} days)</p>
          </div>
          ${containerId !== 'dashboard-daily-arena-container' ? `
            <button class="back-btn-header" onclick="window.Router.navigate('dashboard')">🏠 Dashboard</button>
          ` : ''}
        </div>

        <!-- Completion status banner -->
        ${allCompleted ? `
          <div class="challenge-success-banner glass-card pulse-glow">
            <span class="success-icon">🏆</span>
            <div class="success-text">
              <h3>Daily Coding Challenge Complete!</h3>
              <p>You practiced 2 DSA and 2 Stream problems today. +150 XP claimed!</p>
            </div>
          </div>
        ` : ''}

        <!-- Tabs Navigation -->
        <div class="challenge-tabs">
          ${tabsHtml}
        </div>

        <!-- Challenge Content -->
        ${contentHtml}
      </div>
    `;
  },

  initDailyChallenge() {
    const state = window.AppStorage.loadState();
    const today = window.Gamification.getTodayDateString();
    
    if (state.dailyChallenge.date !== today) {
      // Streak-based difficulty
      let difficulty = 'easy';
      if (state.user.currentStreak >= 5) {
        difficulty = 'hard';
      } else if (state.user.currentStreak >= 3) {
        difficulty = 'medium';
      }

      const db = window.DAILY_CHALLENGES_DB;
      const streamLen = db.stream[difficulty].length;
      const dsaLen = db.dsa[difficulty].length;

      // Select 2 unique random questions
      const selectRandomIndices = (max, count) => {
        let indices = [];
        while (indices.length < count && indices.length < max) {
          let r = Math.floor(Math.random() * max);
          if (!indices.includes(r)) indices.push(r);
        }
        return indices;
      };

      state.dailyChallenge = {
        date: today,
        level: difficulty,
        streamIds: selectRandomIndices(streamLen, 2),
        dsaIds: selectRandomIndices(dsaLen, 2),
        completed: {
          stream: [false, false],
          dsa: [false, false]
        },
        claimedXp: false
      };
      
      window.AppStorage.saveState(state);
      this.currentTabType = 'stream';
      this.currentTabIndex = 0;
      this.isSolutionRevealed = false;
    }
  },

  generateTabsHtml(challenge) {
    let html = '';
    const db = window.DAILY_CHALLENGES_DB;

    // Helper for tabs
    const makeTab = (type, index, label) => {
      const isActive = this.currentTabType === type && this.currentTabIndex === index;
      const isDone = challenge.completed[type][index];
      
      const qId = challenge[`${type}Ids`][index];
      const q = db[type][challenge.level][qId];
      
      let cssClass = 'challenge-tab glass-card';
      if (isActive) cssClass += ' active';
      if (isDone) cssClass += ' done';

      const statusIcon = isDone ? '✅' : '⏳';

      return `
        <button class="${cssClass}" onclick="window.DailyChallenge.switchTab('${type}', ${index})">
          <span class="tab-status">${statusIcon}</span>
          <div class="tab-info">
            <span class="tab-label">${label}</span>
            <span class="tab-title-text">${q ? q.title : 'Challenge'}</span>
          </div>
        </button>
      `;
    };

    html += makeTab('stream', 0, '🌊 Stream 1');
    html += makeTab('stream', 1, '🌊 Stream 2');
    html += makeTab('dsa', 0, '🧮 DSA 1');
    html += makeTab('dsa', 1, '🧮 DSA 2');

    return html;
  },

  getActiveQuestion(challenge) {
    const db = window.DAILY_CHALLENGES_DB;
    const qIdArray = challenge[`${this.currentTabType}Ids`];
    const index = qIdArray[this.currentTabIndex];
    return db[this.currentTabType][challenge.level][index];
  },

  switchTab(type, index) {
    if (window.SoundEffects) window.SoundEffects.playClick();
    this.currentTabType = type;
    this.currentTabIndex = index;
    this.isSolutionRevealed = false;
    this.render(this.lastContainerId || 'app-container');
  },

  revealSolution() {
    if (window.SoundEffects) window.SoundEffects.playClick();
    this.isSolutionRevealed = true;
    this.render(this.lastContainerId || 'app-container');
  },

  markQuestion(isCorrect) {
    if (window.SoundEffects) window.SoundEffects.playClick();
    
    const state = window.AppStorage.loadState();
    state.dailyChallenge.completed[this.currentTabType][this.currentTabIndex] = isCorrect;
    window.AppStorage.saveState(state);

    if (isCorrect) {
      window.Gamification.addXp(25, `Solved Daily Question!`);
    }

    // Auto switch to next uncompleted question if any
    const completed = state.dailyChallenge.completed;
    let nextTab = null;
    
    if (!completed.stream[0]) nextTab = { type: 'stream', index: 0 };
    else if (!completed.stream[1]) nextTab = { type: 'stream', index: 1 };
    else if (!completed.dsa[0]) nextTab = { type: 'dsa', index: 0 };
    else if (!completed.dsa[1]) nextTab = { type: 'dsa', index: 1 };

    if (nextTab) {
      this.currentTabType = nextTab.type;
      this.currentTabIndex = nextTab.index;
      this.isSolutionRevealed = false;
    }

    if (this.lastContainerId === 'dashboard-daily-arena-container') {
      window.Dashboard.render('app-container');
    } else {
      this.render(this.lastContainerId || 'app-container');
    }
  }
};
