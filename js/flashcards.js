// Interview Quest - Flashcard Arena Controller

window.Flashcards = {
  currentTopicId: null,
  cards: [],
  currentIndex: 0,
  isFlipped: false,

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

    if (!topic || !topic.flashcards || topic.flashcards.length === 0) {
      container.innerHTML = '<div class="error-view"><h2>Flashcards not available for this topic!</h2><button onclick="window.Router.navigate(\'skillmap\')">Go to Skill Map</button></div>';
      return;
    }

    this.cards = topic.flashcards;
    this.currentIndex = 0;
    this.isFlipped = false;

    container.innerHTML = `
      <div class="flashcards-player-container glass-card">
        <div class="player-header">
          <button class="back-btn-header" onclick="window.Router.navigate('skillmap')">⬅️ Exit Hub</button>
          <div class="header-details">
            <h3>${topic.name} Flashcards</h3>
            <span class="category-pill" style="background: ${category.color}15; color: ${category.color}">${category.name}</span>
          </div>
          <div class="cards-count">Card ${this.currentIndex + 1} of ${this.cards.length}</div>
        </div>

        <div class="quiz-progress-bar">
          <div id="flash-progress-fill" class="quiz-progress-fill" style="width: 0%"></div>
        </div>

        <div class="flashcard-scene" onclick="window.Flashcards.flipCard()">
          <div id="flashcard-card" class="flashcard-card">
            <div class="flashcard-face flashcard-front glass-card">
              <div class="flip-tip">🖱️ Click to Flip</div>
              <div id="card-front-content" class="card-text"></div>
            </div>
            <div class="flashcard-face flashcard-back glass-card">
              <div class="flip-tip">🖱️ Click to Flip Back</div>
              <div id="card-back-content" class="card-text"></div>
            </div>
          </div>
        </div>

        <div class="flashcard-rating-container hide" id="rating-controls">
          <p>Rate your recall confidence:</p>
          <div class="rating-buttons">
            <button class="rate-btn hard-btn" onclick="window.Flashcards.rateCard('hard')">🔴 Hard</button>
            <button class="rate-btn medium-btn" onclick="window.Flashcards.rateCard('medium')">🟡 Medium</button>
            <button class="rate-btn easy-btn" onclick="window.Flashcards.rateCard('easy')">🟢 Easy</button>
          </div>
        </div>
      </div>
    `;

    this.showCard();
  },

  showCard() {
    this.isFlipped = false;
    const cardEl = document.getElementById('flashcard-card');
    if (cardEl) cardEl.classList.remove('flipped');

    document.getElementById('rating-controls').classList.add('hide');

    const card = this.cards[this.currentIndex];
    document.getElementById('card-front-content').innerText = card.front;
    document.getElementById('card-back-content').innerText = card.back;

    // Update count and progress
    const progressPercent = (this.currentIndex / this.cards.length) * 100;
    document.getElementById('flash-progress-fill').style.width = `${progressPercent}%`;
    document.querySelector('.cards-count').innerText = `Card ${this.currentIndex + 1} of ${this.cards.length}`;
  },

  flipCard() {
    this.isFlipped = !this.isFlipped;
    const cardEl = document.getElementById('flashcard-card');
    if (!cardEl) return;

    if (this.isFlipped) {
      cardEl.classList.add('flipped');
      document.getElementById('rating-controls').classList.remove('hide');
    } else {
      cardEl.classList.remove('flipped');
    }
  },

  rateCard(rating) {
    // We can use the rating to adjust spaced repetition weights in localstorage,
    // but for the basic model we just advance.
    this.currentIndex++;
    
    if (this.currentIndex < this.cards.length) {
      this.showCard();
    } else {
      this.showDeckComplete();
    }
  },

  showDeckComplete() {
    const container = document.querySelector('.flashcards-player-container');
    if (!container) return;

    document.getElementById('flash-progress-fill').style.width = '100%';

    // Save progress
    window.AppStorage.updateProgress(this.currentTopicId, 'flashcardsCompleted', true);

    // Award XP
    setTimeout(() => {
      window.Gamification.addXp(50, 'Finished Flashcard Deck! 🃏');
    }, 100);

    container.innerHTML = `
      <div class="quiz-summary-view">
        <div class="summary-emoji">🎉</div>
        <h2>Deck Completed!</h2>
        <p class="summary-msg">Excellent revision! You've reviewed all flashcards in this topic.</p>

        <div class="rewards-summary glass-card">
          <span>XP Earned: <strong>+50 XP</strong></span>
        </div>

        <div class="summary-actions">
          <button class="primary-btn" onclick="window.Router.navigate('skillmap')">🗺️ Back to Skill Map</button>
          <button class="secondary-btn" onclick="window.Flashcards.restart()">🔁 Review Again</button>
        </div>
      </div>
    `;
  },

  restart() {
    window.Router.navigate(`flashcards?topic=${this.currentTopicId}`);
  }
};
