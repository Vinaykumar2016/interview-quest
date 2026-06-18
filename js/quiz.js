// Interview Quest - Quiz Controller

window.Quiz = {
  currentTopicId: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  timerInterval: null,
  timeLeft: 30,
  selectedOption: null,

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

    if (!topic || !topic.quiz || topic.quiz.length === 0) {
      container.innerHTML = '<div class="error-view"><h2>Quiz not available for this topic!</h2><button onclick="window.Router.navigate(\'skillmap\')">Go to Skill Map</button></div>';
      return;
    }

    this.questions = topic.quiz;
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;

    container.innerHTML = `
      <div class="quiz-player-container glass-card">
        <div class="player-header">
          <button class="back-btn-header" onclick="window.Router.navigate('skillmap')">⬅️ Exit</button>
          <div class="header-details">
            <h3>${topic.name} Quiz</h3>
            <span class="category-pill" style="background: ${category.color}15; color: ${category.color}">${category.name}</span>
          </div>
          <div id="quiz-timer" class="quiz-timer">⏱️ 30s</div>
        </div>

        <div class="quiz-progress-bar">
          <div id="quiz-progress-fill" class="quiz-progress-fill" style="width: 0%"></div>
        </div>

        <div id="quiz-question-box" class="quiz-question-box"></div>
      </div>
    `;

    this.showQuestion();
  },

  showQuestion() {
    this.selectedOption = null;
    const qBox = document.getElementById('quiz-question-box');
    if (!qBox) return;

    const q = this.questions[this.currentIndex];
    
    // Update progress bar
    const progressPercent = (this.currentIndex / this.questions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progressPercent}%`;

    let optionsHtml = '';
    q.options.forEach((opt, idx) => {
      optionsHtml += `
        <button class="quiz-option-btn glass-card" onclick="window.Quiz.selectOption(${idx})">
          <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="option-text">${opt}</span>
        </button>
      `;
    });

    qBox.innerHTML = `
      <div class="question-tracker">Question ${this.currentIndex + 1} of ${this.questions.length}</div>
      <h2 class="question-text">${q.question}</h2>
      
      <div class="options-container">
        ${optionsHtml}
      </div>

      <div id="explanation-box" class="explanation-box glass-card hide">
        <h4>Explanation:</h4>
        <p>${q.explanation || 'No explanation available.'}</p>
      </div>

      <div class="quiz-actions">
        <button id="quiz-next-btn" class="primary-btn hide" onclick="window.Quiz.nextQuestion()">Next Question ➡️</button>
      </div>
    `;

    this.startTimer();
  },

  startTimer() {
    clearInterval(this.timerInterval);
    this.timeLeft = 30;
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) timerEl.innerText = `⏱️ ${this.timeLeft}s`;

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (timerEl) timerEl.innerText = `⏱️ ${this.timeLeft}s`;
      
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.selectOption(-1); // Timeout
      }
    }, 1000);
  },

  selectOption(idx) {
    if (this.selectedOption !== null) return; // Already selected
    this.selectedOption = idx;
    clearInterval(this.timerInterval);

    const q = this.questions[this.currentIndex];
    const optionBtns = document.querySelectorAll('.quiz-option-btn');
    
    // Check answer
    const isCorrect = idx === q.correct;
    if (isCorrect) {
      this.score++;
    }

    // Highlight
    optionBtns.forEach((btn, btnIdx) => {
      btn.disabled = true;
      if (btnIdx === q.correct) {
        btn.classList.add('correct');
      } else if (btnIdx === idx) {
        btn.classList.add('incorrect');
      }
    });

    // Show explanation
    const expBox = document.getElementById('explanation-box');
    if (expBox) expBox.classList.remove('hide');

    // Show next button
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
      nextBtn.classList.remove('hide');
      if (this.currentIndex === this.questions.length - 1) {
        nextBtn.innerText = 'See Summary 📊';
      }
    }
  },

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.showQuestion();
    } else {
      this.showSummary();
    }
  },

  showSummary() {
    clearInterval(this.timerInterval);
    const qBox = document.getElementById('quiz-question-box');
    if (!qBox) return;

    document.getElementById('quiz-progress-fill').style.width = '100%';

    const scorePercent = Math.round((this.score / this.questions.length) * 100);
    
    // Save to storage
    window.AppStorage.updateProgress(this.currentTopicId, 'quizScore', scorePercent);

    // Award XP (Max 100 XP based on performance)
    const xpAwarded = Math.round((this.score / this.questions.length) * 100);
    
    // Triggers daily mission update
    const isSuccess = scorePercent >= 80;
    window.Gamification.updateMissionProgress('quiz', this.currentTopicId, 1, isSuccess);

    setTimeout(() => {
      window.Gamification.addXp(xpAwarded, `Completed Quiz with ${scorePercent}%!`);
    }, 100);

    let emoji = '🎉';
    let message = 'Incredible job, Pratiksha!';
    if (scorePercent < 50) {
      emoji = '📚';
      message = 'Keep studying, you will get it next time!';
    } else if (scorePercent < 80) {
      emoji = '👍';
      message = 'Good work! Let\'s aim for a perfect score!';
    }

    qBox.innerHTML = `
      <div class="quiz-summary-view">
        <div class="summary-emoji">${emoji}</div>
        <h2>Quiz Completed!</h2>
        <p class="summary-msg">${message}</p>

        <div class="score-display glass-card">
          <span class="score-label">Accuracy</span>
          <span class="score-value">${scorePercent}%</span>
          <span class="score-ratio">${this.score} / ${this.questions.length} Correct</span>
        </div>

        <div class="rewards-summary glass-card">
          <span>XP Earned: <strong>+${xpAwarded} XP</strong></span>
        </div>

        <div class="summary-actions">
          <button class="primary-btn" onclick="window.Router.navigate('skillmap')">🗺️ Back to Skill Map</button>
          <button class="secondary-btn" onclick="window.Quiz.retry()">🔁 Retry Quiz</button>
        </div>
      </div>
    `;
  },

  retry() {
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.showQuestion();
  }
};
