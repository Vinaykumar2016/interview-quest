// Interview Quest - Progress & Achievements View Controller

window.Progress = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const state = window.AppStorage.loadState();
    const user = state.user;

    // 1. Generate Heatmap data
    const heatmapHtml = this.generateHeatmap(state.dailyLog);

    // 2. Compute Badges status
    const badgesHtml = this.generateBadgesGrid(state.badges);

    // 3. Compute Category wise progress
    const categoryProgressHtml = this.generateCategoryProgress(state.progress);

    // 4. Compute Weak Areas
    const weakAreasHtml = this.generateWeakAreas(state.progress);

    container.innerHTML = `
      <div class="progress-view-container">
        <h1>📊 Pratiksha's Training Dashboard</h1>
        <p>Monitor your performance, track your daily learning habit, and look at weak areas to prepare for interviews.</p>
        
        <div class="progress-row">
          <!-- Stats Card -->
          <div class="glass-card stat-summary-large">
            <h3>Overall Metrics</h3>
            <div class="large-stats-grid">
              <div class="large-stat-item">
                <span class="val">${user.totalXp}</span>
                <span class="lbl">Total XP Earned</span>
              </div>
              <div class="large-stat-item">
                <span class="val">${user.level}</span>
                <span class="lbl">Current Level</span>
              </div>
              <div class="large-stat-item">
                <span class="val">🔥 ${user.currentStreak} days</span>
                <span class="lbl">Current Streak</span>
              </div>
              <div class="large-stat-item">
                <span class="val">👑 ${user.longestStreak} days</span>
                <span class="lbl">Longest Streak</span>
              </div>
            </div>
          </div>
          
          <!-- Heatmap Card -->
          <div class="glass-card activity-heatmap-card">
            <h3>Daily Learning Habit (Last 28 Days)</h3>
            <p class="subtitle">Consistency is key to cracking client interviews!</p>
            <div class="heatmap-wrapper">
              ${heatmapHtml}
            </div>
            <div class="heatmap-legend">
              <span>Less</span>
              <span class="legend-box level-0"></span>
              <span class="legend-box level-1"></span>
              <span class="legend-box level-2"></span>
              <span class="legend-box level-3"></span>
              <span>More</span>
            </div>
          </div>
        </div>

        <div class="progress-row">
          <!-- Category progress -->
          <div class="glass-card category-breakdown-card">
            <h3>Topic Progress Breakdown</h3>
            <div class="category-breakdown-list">
              ${categoryProgressHtml}
            </div>
          </div>

          <!-- Weak areas -->
          <div class="glass-card weak-areas-card">
            <h3>Topics to Focus On 🎯</h3>
            <p class="subtitle">Recommended for review (quiz score < 70% or unstudied).</p>
            <div class="weak-areas-list">
              ${weakAreasHtml}
            </div>
          </div>
        </div>

        <!-- Badges Card -->
        <div class="glass-card badges-full-card">
          <h3>Achievements & Badges</h3>
          <div class="badges-full-grid">
            ${badgesHtml}
          </div>
        </div>
      </div>
    `;
  },

  generateHeatmap(dailyLog) {
    const dates = [];
    const d = new Date();
    // Get last 28 days (starting from 27 days ago until today)
    for (let i = 27; i >= 0; i--) {
      const tempDate = new Date();
      tempDate.setDate(d.getDate() - i);
      const year = tempDate.getFullYear();
      const month = String(tempDate.getMonth() + 1).padStart(2, '0');
      const day = String(tempDate.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }

    let cellsHtml = '';
    dates.forEach(dateStr => {
      const log = dailyLog.find(l => l.date === dateStr);
      const xp = log ? log.xpEarned : 0;
      
      let levelClass = 'level-0';
      if (xp > 0 && xp <= 50) levelClass = 'level-1';
      else if (xp > 50 && xp <= 150) levelClass = 'level-2';
      else if (xp > 150) levelClass = 'level-3';

      const tooltipText = `${dateStr}: ${xp} XP`;
      cellsHtml += `<div class="heatmap-cell ${levelClass}" title="${tooltipText}"></div>`;
    });

    return `<div class="heatmap-grid">${cellsHtml}</div>`;
  },

  generateBadgesGrid(unlockedBadges) {
    // Badges list from Gamification
    const allBadges = [
      { id: 'first_steps', name: 'First Steps', icon: '🎯', desc: 'Read your first set of quick notes!' },
      { id: 'quiz_master', name: 'Quiz Master', icon: '💯', desc: 'Get a perfect 100% score on any quiz!' },
      { id: 'knowledge_seeker', name: 'Knowledge Seeker', icon: '📖', desc: 'Read notes for 5 different topics.' },
      { id: 'card_shark', name: 'Card Shark', icon: '🃏', desc: 'Complete 3 flashcard decks.' },
      { id: 'interviewer', name: 'Confidence Builder', icon: '🎙️', desc: 'Complete 3 mock interviews.' },
      { id: 'all_star', name: 'Daily Champion', icon: '🏆', desc: 'Complete all 3 daily missions.' },
      { id: 'on_fire', name: 'On Fire', icon: '🔥', desc: 'Achieve a 3-day learning streak.' }
    ];

    let html = '';
    allBadges.forEach(badge => {
      const unlocked = unlockedBadges.find(ub => ub.id === badge.id);
      const cssClass = unlocked ? 'badge-card unlocked' : 'badge-card locked';
      const unlockDateStr = unlocked ? `<span class="unlock-date">Unlocked: ${unlocked.unlockedDate}</span>` : '<span class="unlock-date locked-txt">Locked</span>';

      html += `
        <div class="${cssClass}">
          <div class="badge-icon">${badge.icon}</div>
          <h4>${badge.name}</h4>
          <p>${badge.desc}</p>
          ${unlockDateStr}
        </div>
      `;
    });

    return html;
  },

  generateCategoryProgress(progress) {
    let html = '';

    window.CATEGORIES.forEach(cat => {
      let totalTopics = cat.topics.length;
      let completedTopicsCount = 0;
      
      cat.topics.forEach(topic => {
        const prog = progress[topic.id];
        if (prog) {
          // A topic is "completed" if at least notes are read and quiz taken
          if (prog.notesRead && prog.quizScores && prog.quizScores.length > 0) {
            completedTopicsCount++;
          }
        }
      });

      const percentage = Math.round((completedTopicsCount / totalTopics) * 100);

      html += `
        <div class="progress-cat-item">
          <div class="cat-info-progress">
            <span class="cat-name-lbl">${cat.icon} ${cat.name}</span>
            <span class="cat-ratio-lbl">${completedTopicsCount} / ${totalTopics} mastered</span>
          </div>
          <div class="cat-bar-container">
            <div class="cat-bar-fill" style="width: ${percentage}%; background: ${cat.color}"></div>
          </div>
        </div>
      `;
    });

    return html;
  },

  generateWeakAreas(progress) {
    let weakTopics = [];

    window.CATEGORIES.forEach(cat => {
      cat.topics.forEach(topic => {
        const prog = progress[topic.id];
        if (!prog) {
          // Never studied
          weakTopics.push({ topic, status: 'Not started yet', score: -1, color: cat.color, catId: cat.id });
        } else {
          const maxScore = prog.quizScores && prog.quizScores.length > 0 ? Math.max(...prog.quizScores) : null;
          if (maxScore !== null && maxScore < 70) {
            weakTopics.push({ topic, status: `Low quiz accuracy: ${maxScore}%`, score: maxScore, color: cat.color, catId: cat.id });
          } else if (!prog.notesRead) {
            weakTopics.push({ topic, status: 'Notes unread', score: -1, color: cat.color, catId: cat.id });
          }
        }
      });
    });

    // Limit to 4 weak areas
    const showLimit = weakTopics.slice(0, 4);

    if (showLimit.length === 0) {
      return '<div class="no-data">You have no weak areas! Excellent work, Pratiksha! 🚀</div>';
    }

    let html = '';
    showLimit.forEach(item => {
      html += `
        <div class="weak-topic-item glass-card" onclick="window.SkillMap.openTopicHub('${item.catId}', '${item.topic.id}')">
          <div class="weak-topic-info">
            <span class="weak-icon" style="background: ${item.color}15; color: ${item.color}">${item.topic.icon || '📝'}</span>
            <div class="weak-details">
              <h4>${item.topic.name}</h4>
              <span class="weak-reason">${item.status}</span>
            </div>
          </div>
          <button class="small-action-btn" style="border: 1px solid ${item.color}; color: ${item.color}">Study</button>
        </div>
      `;
    });

    return html;
  }
};
