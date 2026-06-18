// Interview Quest - Dashboard Controller

window.Dashboard = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const state = window.AppStorage.loadState();
    const user = state.user;
    
    // Check and trigger daily tasks
    window.Gamification.checkStreak();
    window.Gamification.checkMissions();
    
    const freshState = window.AppStorage.loadState();
    const xpNeeded = window.Gamification.getXpForLevel(user.level);
    const xpPercent = Math.min(100, (user.xp / xpNeeded) * 100);

    // Motivational quotes
    const quotes = [
      "Pratiksha, client interviews are just conversations. You got this! 💪",
      "One step at a time, you are becoming a master Java developer! ☕",
      "Stay curious, stay focused, and code on! 🚀",
      "Each small session builds a strong foundation. Let's learn! 🌟",
      "Interviews are a chance to show what you know. Keep practicing!",
      "A level a day keeps the bench stress away! 🔥"
    ];
    const dailyQuote = quotes[new Date().getDate() % quotes.length];

    // Compute stats
    let totalTopics = 0;
    let completedNotes = 0;
    let completedQuizzes = 0;
    let totalQuizzes = 0;
    let averageQuizScore = 0;
    let scoreSum = 0;
    let scoreCount = 0;

    window.CATEGORIES.forEach(cat => {
      cat.topics.forEach(topic => {
        totalTopics++;
        const prog = freshState.progress[topic.id];
        if (prog) {
          if (prog.notesRead) completedNotes++;
          if (prog.flashcardsCompleted) completedQuizzes++; // flashcards
          if (prog.quizScores && prog.quizScores.length > 0) {
            totalQuizzes++;
            prog.quizScores.forEach(score => {
              scoreSum += score;
              scoreCount++;
            });
          }
        }
      });
    });

    averageQuizScore = scoreCount > 0 ? Math.round(scoreSum / scoreCount) : 0;

    // Daily missions HTML
    let missionsHtml = '';
    freshState.missions.list.forEach(mission => {
      const icon = mission.completed ? '✅' : '⏳';
      const cssClass = mission.completed ? 'mission-item completed' : 'mission-item';
      missionsHtml += `
        <div class="${cssClass}">
          <div class="mission-icon">${icon}</div>
          <div class="mission-details">
            <span class="mission-text">${mission.text}</span>
            <div class="mission-progress-bar">
              <div class="mission-progress-fill" style="width: ${(mission.current / mission.required) * 100}%"></div>
            </div>
            <span class="mission-ratio">${mission.current}/${mission.required}</span>
          </div>
          <div class="mission-reward">+${mission.xp} XP</div>
        </div>
      `;
    });

    // Recent achievements html
    let badgesHtml = '';
    const recentBadges = freshState.badges.slice(-3); // Get last 3
    if (recentBadges.length === 0) {
      badgesHtml = '<div class="no-data">No achievements unlocked yet. Start studying to earn badges! 🏆</div>';
    } else {
      recentBadges.forEach(badge => {
        badgesHtml += `
          <div class="mini-badge-card">
            <div class="mini-badge-icon">${badge.icon}</div>
            <div class="mini-badge-info">
              <h4>${badge.name}</h4>
              <p>${badge.desc}</p>
            </div>
          </div>
        `;
      });
    }

    // Daily Coding Arena status
    window.DailyChallenge.initDailyChallenge();
    const challenge = freshState.dailyChallenge;
    let completedCount = 0;
    if (challenge.completed.stream[0]) completedCount++;
    if (challenge.completed.stream[1]) completedCount++;
    if (challenge.completed.dsa[0]) completedCount++;
    if (challenge.completed.dsa[1]) completedCount++;

    const arenaDone = completedCount === 4;
    const arenaProgressPercent = (completedCount / 4) * 100;

    container.innerHTML = `
      <div class="dashboard-grid">
        <!-- Main welcome banner -->
        <div class="dashboard-banner glass-card">
          <div class="banner-content">
            <h1>Hello, Pratiksha! 👋</h1>
            <p class="quote-text">"${dailyQuote}"</p>
            <div class="streak-container-dash">
              <span class="streak-badge"><i class="streak-icon">🔥</i> ${user.currentStreak} Day Streak</span>
              <span class="streak-badge-record">Record: ${user.longestStreak} days</span>
            </div>
          </div>
          <div class="level-showcase">
            <div class="level-number">${user.level}</div>
            <span class="level-label">CURRENT LEVEL</span>
          </div>
        </div>

        <!-- Embedded Daily Coding Arena -->
        <div id="dashboard-daily-arena-container" class="dashboard-arena-wrapper">
          <!-- DailyChallenge.render will populate this -->
        </div>

        <!-- Progress and XP -->
        <div class="xp-status-card glass-card">
          <h3>Progress & XP Tracker</h3>
          <div class="xp-progress-bar-container">
            <div class="xp-labels">
              <span>XP: ${user.xp} / ${xpNeeded}</span>
              <span>Level ${user.level + 1}</span>
            </div>
            <div class="xp-progress-bar-outer">
              <div class="xp-progress-bar-fill" style="width: ${xpPercent}%"></div>
            </div>
          </div>
          <div class="quick-stats-grid">
            <div class="stat-box">
              <span class="stat-value">${completedNotes} / ${totalTopics}</span>
              <span class="stat-title">Notes Read</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">${totalQuizzes}</span>
              <span class="stat-title">Quizzes Taken</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">${averageQuizScore}%</span>
              <span class="stat-title">Avg Accuracy</span>
            </div>
          </div>
        </div>

        <!-- Daily missions -->
        <div class="missions-card glass-card">
          <div class="missions-header">
            <h3>Today's Missions</h3>
            ${freshState.missions.completedAll ? '<span class="all-done-pill">ALL DONE +150 XP</span>' : ''}
          </div>
          <div class="missions-list">
            ${missionsHtml}
          </div>
        </div>

        <!-- Recent Achievements -->
        <div class="achievements-card glass-card">
          <h3>Recent Badges</h3>
          <div class="badges-mini-list">
            ${badgesHtml}
          </div>
          <button class="secondary-btn" onclick="window.Router.navigate('progress')">View All Achievements</button>
        </div>

        <!-- Action shortcut panel -->
        <div class="quick-start-card glass-card">
          <h3>Ready for a challenge?</h3>
          <p>Test your knowledge with quick study modes or take a look at the skill map.</p>
          <div class="quick-action-buttons">
            <button class="primary-btn" onclick="window.Router.navigate('skillmap')">🗺️ Open Skill Map</button>
            <button class="accent-btn" onclick="window.Dashboard.launchRandomQuiz()">🎲 Random Quiz</button>
          </div>
        </div>
      </div>
    `;

    // Render the embedded daily coding arena
    window.DailyChallenge.render('dashboard-daily-arena-container');
  },

  launchRandomQuiz() {
    const topics = window.Gamification.getAllTopics();
    if (topics.length === 0) return;
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    window.Router.navigate(`quiz?topic=${randomTopic.id}`);
  }
};
