// Interview Quest - Mock Interview Simulator Controller

window.Interview = {
  currentTopicId: null,
  questions: [],
  currentIndex: 0,
  timerInterval: null,
  thinkTime: 45,
  ratings: [],

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

    if (!topic || !topic.interview || topic.interview.length === 0) {
      container.innerHTML = '<div class="error-view"><h2>Mock interview questions not available for this topic!</h2><button onclick="window.Router.navigate(\'skillmap\')">Go to Skill Map</button></div>';
      return;
    }

    this.questions = topic.interview;
    this.currentIndex = 0;
    this.ratings = [];

    container.innerHTML = `
      <div class="interview-player-container glass-card">
        <div class="player-header">
          <button class="back-btn-header" onclick="window.Router.navigate('skillmap')">⬅️ Exit</button>
          <div class="header-details">
            <h3>${topic.name} Mock Interview</h3>
            <span class="category-pill" style="background: ${category.color}15; color: ${category.color}">${category.name}</span>
          </div>
          <div id="think-timer" class="think-timer">⏱️ Think: 45s</div>
        </div>

        <div class="quiz-progress-bar">
          <div id="interview-progress-fill" class="quiz-progress-fill" style="width: 0%"></div>
        </div>

        <div id="interview-question-box" class="interview-question-box"></div>
      </div>
    `;

    this.showQuestion();
  },

  showQuestion() {
    const qBox = document.getElementById('interview-question-box');
    if (!qBox) return;

    const q = this.questions[this.currentIndex];

    // Progress bar
    const progressPercent = (this.currentIndex / this.questions.length) * 100;
    document.getElementById('interview-progress-fill').style.width = `${progressPercent}%`;

    qBox.innerHTML = `
      <div class="question-tracker">Question ${this.currentIndex + 1} of ${this.questions.length}</div>
      <h2 class="interview-q-text">"${q.question}"</h2>

      <!-- Hint section -->
      <div class="hint-container">
        <button id="show-hint-btn" class="secondary-btn" onclick="window.Interview.showHint()">💡 Show Hint</button>
        <div id="hint-text-box" class="hint-text-box glass-card hide">
          <p><strong>Hint:</strong> ${q.hint || 'Prepare a structured explanation.'}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="interview-actions">
        <button id="reveal-ans-btn" class="primary-btn" onclick="window.Interview.revealAnswer()">Reveal Model Answer 🎙️</button>
      </div>

      <!-- Answer container -->
      <div id="answer-reveal-box" class="answer-reveal-box glass-card hide">
        <h3>Model Answer:</h3>
        <p class="model-answer-text">${q.answer}</p>
        
        <div class="self-rating-section">
          <p>How confident do you feel with your answer?</p>
          <div class="star-rating">
            <button onclick="window.Interview.rate(1)">⭐</button>
            <button onclick="window.Interview.rate(2)">⭐⭐</button>
            <button onclick="window.Interview.rate(3)">⭐⭐⭐</button>
            <button onclick="window.Interview.rate(4)">⭐⭐⭐⭐</button>
            <button onclick="window.Interview.rate(5)">⭐⭐⭐⭐⭐</button>
          </div>
        </div>
      </div>
    `;

    this.startTimer();
  },

  startTimer() {
    clearInterval(this.timerInterval);
    this.thinkTime = 45;
    const timerEl = document.getElementById('think-timer');
    if (timerEl) timerEl.innerText = `⏱️ Think: ${this.thinkTime}s`;

    this.timerInterval = setInterval(() => {
      this.thinkTime--;
      if (timerEl) timerEl.innerText = `⏱️ Think: ${this.thinkTime}s`;
      
      if (this.thinkTime <= 0) {
        clearInterval(this.timerInterval);
        if (timerEl) timerEl.innerText = `⏱️ Time Up! Reveal Answer`;
      }
    }, 1000);
  },

  showHint() {
    document.getElementById('show-hint-btn').classList.add('hide');
    document.getElementById('hint-text-box').classList.remove('hide');
  },

  revealAnswer() {
    clearInterval(this.timerInterval);
    document.getElementById('reveal-ans-btn').classList.add('hide');
    document.getElementById('answer-reveal-box').classList.remove('hide');
    
    // Scroll to answer
    document.getElementById('answer-reveal-box').scrollIntoView({ behavior: 'smooth' });
  },

  rate(stars) {
    this.ratings.push(stars);

    // Save progress
    window.AppStorage.updateProgress(this.currentTopicId, 'interview', 1);

    // Award XP
    const xpAwarded = 15;
    window.Gamification.updateMissionProgress('interview', this.currentTopicId, 1);
    
    setTimeout(() => {
      window.Gamification.addXp(xpAwarded, `Practiced Interview Question!`);
    }, 100);

    // Proceed
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.showQuestion();
    } else {
      this.showSummary();
    }
  },

  showSummary() {
    const qBox = document.getElementById('interview-question-box');
    if (!qBox) return;

    document.getElementById('interview-progress-fill').style.width = '100%';

    const averageRating = Math.round((this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length) * 10) / 10;
    
    let advice = 'Great job! Keep practicing to build confidence.';
    if (averageRating >= 4) {
      advice = 'Excellent! You seem very comfortable with this topic.';
    } else if (averageRating < 2.5) {
      advice = 'We suggest reading the quick notes again to patch any knowledge gaps.';
    }

    qBox.innerHTML = `
      <div class="quiz-summary-view">
        <div class="summary-emoji">🎙️</div>
        <h2>Interview Practice Complete!</h2>
        <p class="summary-msg">${advice}</p>

        <div class="score-display glass-card">
          <span class="score-label">Average Confidence</span>
          <span class="score-value">${averageRating} / 5</span>
          <span class="score-ratio">${this.questions.length} Questions Practiced</span>
        </div>

        <div class="rewards-summary glass-card">
          <span>Completed Session! +${this.questions.length * 15} XP</span>
        </div>

        <div class="summary-actions">
          <button class="primary-btn" onclick="window.Router.navigate('skillmap')">🗺️ Back to Skill Map</button>
          <button class="secondary-btn" onclick="window.Interview.retry()">🔁 Restart Session</button>
        </div>
      </div>
    `;
  },

  retry() {
    this.currentIndex = 0;
    this.ratings = [];
    this.showQuestion();
  }
};
