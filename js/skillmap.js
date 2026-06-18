// Interview Quest - Skill Map Controller

window.SkillMap = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const state = window.AppStorage.loadState();
    
    let categoriesHtml = '';
    
    window.CATEGORIES.forEach(cat => {
      let topicsHtml = '';
      
      cat.topics.forEach(topic => {
        const prog = state.progress[topic.id] || { notesRead: false, flashcardsCompleted: false, quizScores: [], interviewsDone: 0 };
        
        // Count completions
        let scoreStr = '—';
        if (prog.quizScores && prog.quizScores.length > 0) {
          scoreStr = Math.max(...prog.quizScores) + '%';
        }
        
        let completedModes = 0;
        if (prog.notesRead) completedModes++;
        if (prog.flashcardsCompleted) completedModes++;
        if (prog.quizScores && prog.quizScores.length > 0) completedModes++;
        if (prog.interviewsDone > 0) completedModes++;

        const completionPercent = (completedModes / 4) * 100;
        
        topicsHtml += `
          <div class="topic-capsule glass-card" onclick="window.SkillMap.openTopicHub('${cat.id}', '${topic.id}')">
            <div class="topic-header">
              <span class="topic-icon">${topic.icon || '📝'}</span>
              <h4>${topic.name}</h4>
            </div>
            <div class="topic-mini-progress">
              <div class="topic-progress-fill" style="width: ${completionPercent}%; background: ${cat.color || '#3B82F6'}"></div>
            </div>
            <div class="topic-status-text">
              <span>Quiz: ${scoreStr}</span>
              <span>${completedModes}/4 Modes</span>
            </div>
          </div>
        `;
      });

      categoriesHtml += `
        <div class="category-block glass-card" style="border-top: 4px solid ${cat.color || '#3B82F6'}">
          <div class="category-header">
            <span class="category-icon-bg" style="background: ${cat.color}15; color: ${cat.color}">${cat.icon || '☕'}</span>
            <h2>${cat.name}</h2>
          </div>
          <div class="topics-grid">
            ${topicsHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="skillmap-header">
        <h1>🗺️ Interview Quest Skill Map</h1>
        <p>Explore all 30+ core topics. Click any topic to read notes, practice flashcards, take quizzes, or start a mock interview.</p>
      </div>
      <div class="categories-grid">
        ${categoriesHtml}
      </div>

      <!-- Topic Hub Modal -->
      <div id="topic-hub-modal" class="modal-overlay"></div>
    `;
  },

  openTopicHub(catId, topicId) {
    const category = window.CATEGORIES.find(c => c.id === catId);
    if (!category) return;
    const topic = category.topics.find(t => t.id === topicId);
    if (!topic) return;

    const state = window.AppStorage.loadState();
    const prog = state.progress[topicId] || { notesRead: false, flashcardsCompleted: false, quizScores: [], interviewsDone: 0 };
    
    const maxScore = prog.quizScores && prog.quizScores.length > 0 ? Math.max(...prog.quizScores) + '%' : 'Not taken';

    const modal = document.getElementById('topic-hub-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-content topic-hub-content glass-card">
        <span class="close-btn" onclick="window.SkillMap.closeTopicHub()">&times;</span>
        <div class="hub-header" style="color: ${category.color}">
          <span class="hub-icon">${topic.icon || '📝'}</span>
          <h2>${topic.name}</h2>
          <span class="hub-category">${category.name}</span>
        </div>

        <p class="hub-intro">Choose a training mode to build your skills and earn XP.</p>

        <div class="modes-grid">
          <!-- 1. Notes -->
          <div class="mode-card glass-card ${prog.notesRead ? 'completed' : ''}" onclick="window.SkillMap.launchMode('${topicId}', 'notes')">
            <div class="mode-icon-title">
              <span class="mode-badge">📖</span>
              <h3>Quick Notes</h3>
            </div>
            <p>Interview-focused cheat sheet and code examples.</p>
            <span class="mode-status">${prog.notesRead ? '✅ Read (+50 XP)' : '⏳ Unread (+50 XP)'}</span>
          </div>

          <!-- 2. Flashcards -->
          <div class="mode-card glass-card ${prog.flashcardsCompleted ? 'completed' : ''}" onclick="window.SkillMap.launchMode('${topicId}', 'flashcards')">
            <div class="mode-icon-title">
              <span class="mode-badge">🃏</span>
              <h3>Flashcards</h3>
            </div>
            <p>Active recall training with instant Q&A cards.</p>
            <span class="mode-status">${prog.flashcardsCompleted ? '✅ Complete (+50 XP)' : '⏳ Incomplete (+50 XP)'}</span>
          </div>

          <!-- 3. Quiz -->
          <div class="mode-card glass-card ${prog.quizScores.length > 0 ? 'completed' : ''}" onclick="window.SkillMap.launchMode('${topicId}', 'quiz')">
            <div class="mode-icon-title">
              <span class="mode-badge">📝</span>
              <h3>Practice Quiz</h3>
            </div>
            <p>Timed MCQs with detailed explanations.</p>
            <span class="mode-status">Best Score: ${maxScore} (+100 XP max)</span>
          </div>

          <!-- 4. Interview -->
          <div class="mode-card glass-card ${prog.interviewsDone > 0 ? 'completed' : ''}" onclick="window.SkillMap.launchMode('${topicId}', 'interview')">
            <div class="mode-icon-title">
              <span class="mode-badge">🎙️</span>
              <h3>Mock Interview</h3>
            </div>
            <p>Self-graded simulation with realistic answers.</p>
            <span class="mode-status">Done: ${prog.interviewsDone} times (+75 XP)</span>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('active');
  },

  closeTopicHub() {
    const modal = document.getElementById('topic-hub-modal');
    if (modal) modal.classList.remove('active');
  },

  launchMode(topicId, mode) {
    this.closeTopicHub();
    window.Router.navigate(`${mode}?topic=${topicId}`);
  }
};
