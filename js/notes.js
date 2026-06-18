// Interview Quest - Quick Notes Controller

window.Notes = {
  currentTopicId: null,

  render(containerId, params = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.currentTopicId = params.topic;
    if (!this.currentTopicId) {
      container.innerHTML = '<div class="error-view"><h2>No topic specified!</h2><button onclick="window.Router.navigate(\'skillmap\')">Go to Skill Map</button></div>';
      return;
    }

    // Find topic
    let topic = null;
    let category = null;
    for (const c of window.CATEGORIES) {
      const t = c.topics.find(x => x.id === this.currentTopicId);
      if (t) {
        topic = t;
        category = c;
        break;
      }
    }

    if (!topic || !topic.notes) {
      container.innerHTML = '<div class="error-view"><h2>Notes not available for this topic!</h2><button onclick="window.Router.navigate(\'skillmap\')">Go to Skill Map</button></div>';
      return;
    }

    const state = window.AppStorage.loadState();
    const isRead = state.progress[this.currentTopicId]?.notesRead || false;

    // Bullet points HTML
    let pointsHtml = '';
    topic.notes.points.forEach(pt => {
      pointsHtml += `<li>${pt}</li>`;
    });

    // Code Examples HTML
    let codeHtml = '';
    if (topic.notes.codeExamples && topic.notes.codeExamples.length > 0) {
      topic.notes.codeExamples.forEach((ex, idx) => {
        // Simple HTML entity escaping for code rendering
        const escapedCode = ex.code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
          
        codeHtml += `
          <div class="code-example-block glass-card">
            <div class="code-header">
              <span>${ex.title}</span>
              <span class="code-lang">${ex.language.toUpperCase()}</span>
            </div>
            <pre><code class="language-${ex.language}">${escapedCode}</code></pre>
          </div>
        `;
      });
    } else {
      codeHtml = '<p class="no-code-msg">No code examples needed for this conceptual topic.</p>';
    }

    // Interview Tips HTML
    let tipsHtml = '';
    if (topic.notes.interviewTips && topic.notes.interviewTips.length > 0) {
      topic.notes.interviewTips.forEach(tip => {
        tipsHtml += `
          <div class="tip-banner">
            <span class="tip-icon">💡</span>
            <p class="tip-text">${tip}</p>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <div class="notes-view-container glass-card">
        <div class="player-header">
          <button class="back-btn-header" onclick="window.Router.navigate('skillmap')">⬅️ Exit Hub</button>
          <div class="header-details">
            <h3>${topic.notes.title || topic.name} Notes</h3>
            <span class="category-pill" style="background: ${category.color}15; color: ${category.color}">${category.name}</span>
          </div>
          <div class="read-status-badge ${isRead ? 'read' : 'unread'}">
            ${isRead ? '✅ Read' : '⏳ Unread'}
          </div>
        </div>

        <div class="notes-content">
          <!-- Section 1: Core Concepts -->
          <div class="notes-section">
            <h3>🔑 Core Interview Concepts</h3>
            <ul class="concept-points-list">
              ${pointsHtml}
            </ul>
          </div>

          <!-- Section 2: Code snippets -->
          <div class="notes-section">
            <h3>💻 Code & Configuration Patterns</h3>
            <div class="code-examples-list">
              ${codeHtml}
            </div>
          </div>

          <!-- Section 3: Interview Tips -->
          ${tipsHtml ? `
          <div class="notes-section">
            <h3>🎯 Client Interview Tips</h3>
            <div class="tips-list-container">
              ${tipsHtml}
            </div>
          </div>
          ` : ''}
        </div>

        <!-- Action Bar -->
        <div class="notes-actions-bar">
          ${isRead ? `
            <button class="secondary-btn" onclick="window.Router.navigate('skillmap')">🗺️ Back to Skill Map</button>
          ` : `
            <button class="primary-btn pulse-glow" onclick="window.Notes.markAsRead()">Mark as Read & Earn +50 XP 🎉</button>
          `}
        </div>
      </div>
    `;
  },

  markAsRead() {
    // Save to storage
    window.AppStorage.updateProgress(this.currentTopicId, 'notesRead', true);

    // Complete daily mission (this triggers XP and notification)
    window.Gamification.updateMissionProgress('notes', this.currentTopicId, 1);
    
    // Add base XP
    setTimeout(() => {
      window.Gamification.addXp(50, 'Finished Reading Quick Notes!');
      // Refresh view
      window.Notes.render('app-container', { topic: this.currentTopicId });
    }, 100);
  }
};
