// Interview Quest - LocalStorage Wrapper & State Management

const STORAGE_KEY = 'interview_quest_data';

const DEFAULT_STATE = {
  user: {
    name: 'Pratiksha',
    level: 1,
    xp: 0,
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null
  },
  progress: {}, // { [topicId]: { notesRead: boolean, flashcardsCompleted: boolean, quizScores: [], interviewsDone: number } }
  missions: {
    date: null,
    list: [], // { id, type, topicId, text, required, current, xp, completed }
    completedAll: false
  },
  badges: [], // { id, name, icon, desc, unlockedDate }
  dailyLog: [] // { date: 'YYYY-MM-DD', xpEarned: number }
};

window.AppStorage = {
  // Load State
  loadState() {
    let state = localStorage.getItem(STORAGE_KEY);
    if (!state) {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      this.saveState(state);
      return state;
    }
    
    try {
      let parsed = JSON.parse(state);
      // Ensure name is Pratiksha
      if (!parsed.user || parsed.user.name !== 'Pratiksha') {
        parsed.user = parsed.user || {};
        parsed.user.name = 'Pratiksha';
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse storage, resetting to default', e);
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  },

  // Save State
  saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  // Reset State
  resetState() {
    let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState(state);
    return state;
  },

  // Update Progress for a Topic
  updateProgress(topicId, type, value) {
    const state = this.loadState();
    if (!state.progress[topicId]) {
      state.progress[topicId] = {
        notesRead: false,
        flashcardsCompleted: false,
        quizScores: [],
        interviewsDone: 0
      };
    }

    if (type === 'notesRead') {
      state.progress[topicId].notesRead = !!value;
    } else if (type === 'flashcardsCompleted') {
      state.progress[topicId].flashcardsCompleted = !!value;
    } else if (type === 'quizScore') {
      state.progress[topicId].quizScores.push(value);
    } else if (type === 'interview') {
      state.progress[topicId].interviewsDone += 1;
    }

    this.saveState(state);
    return state;
  }
};
