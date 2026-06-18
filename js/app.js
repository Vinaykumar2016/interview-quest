// Interview Quest - Main App Controller & Router

window.Router = {
  routes: {
    'dashboard': window.Dashboard,
    'skillmap': window.SkillMap,
    'notes': window.Notes,
    'flashcards': window.Flashcards,
    'quiz': window.Quiz,
    'interview': window.Interview,
    'progress': window.Progress,
    'daily-challenge': window.DailyChallenge
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  navigate(routePath) {
    if (window.SoundEffects) window.SoundEffects.playClick();
    window.location.hash = '/' + routePath;
  },

  handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '') || 'dashboard';
    
    // Parse query params (e.g., notes?topic=git)
    const [path, queryString] = hash.split('?');
    const params = {};
    
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    }

    const controller = this.routes[path];
    
    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPath = link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (linkPath === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (controller) {
      // Clear interval timer if any left from quiz/interview
      if (window.Quiz && window.Quiz.timerInterval) clearInterval(window.Quiz.timerInterval);
      if (window.Interview && window.Interview.timerInterval) clearInterval(window.Interview.timerInterval);

      controller.render('app-container', params);
      
      // Update top header profile info
      this.updateHeaderProfile();
    } else {
      console.error(`Route not found: ${path}`);
      this.navigate('dashboard');
    }
  },

  updateHeaderProfile() {
    const state = window.AppStorage.loadState();
    const user = state.user;
    const soundOn = state.settings ? state.settings.soundEnabled : true;
    
    const profileEl = document.getElementById('profile-summary-header');
    if (profileEl) {
      profileEl.innerHTML = `
        <div class="header-profile-info">
          <span class="header-username">${user.name}</span>
          <span class="header-level">Lv. ${user.level}</span>
          <span class="header-xp-bar-txt">${user.xp}/${window.Gamification.getXpForLevel(user.level)} XP</span>
        </div>
        <div class="header-streak-badge">🔥 ${user.currentStreak}</div>
        <button class="sound-toggle-btn" onclick="event.stopPropagation(); window.Router.toggleSound();">
          ${soundOn ? '🔊' : '🔇'}
        </button>
      `;
    }
  },

  toggleSound() {
    const state = window.AppStorage.loadState();
    if (!state.settings) state.settings = { soundEnabled: true };
    
    state.settings.soundEnabled = !state.settings.soundEnabled;
    window.AppStorage.saveState(state);
    
    this.updateHeaderProfile();
    
    if (window.SoundEffects) {
      window.SoundEffects.init();
      if (state.settings.soundEnabled) {
        window.SoundEffects.playClick();
      }
    }
  }
};

// Application Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  // Initialize storage
  window.AppStorage.loadState();
  
  // Set up router
  window.Router.init();

  // Initialize Web Audio API on first user click gesture
  const initAudio = () => {
    if (window.SoundEffects) {
      window.SoundEffects.init();
    }
    window.removeEventListener('click', initAudio);
    window.removeEventListener('keydown', initAudio);
  };
  window.addEventListener('click', initAudio);
  window.addEventListener('keydown', initAudio);
});
