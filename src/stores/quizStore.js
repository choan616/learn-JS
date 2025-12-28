import { defineStore } from 'pinia'
import { quizzes } from '../data/quizzes'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    allQuizzes: quizzes,
    userHistory: {}, // { id: { attempts: 0, correct: 0, lastResult: true/false, category: '' } }
    currentCategory: null,
    sessionQuizzes: [], // Stabilized list for the current session
    currentQuizIndex: 0,
    sessionResults: [], // Results for the current active quiz session
    isInitialized: false
  }),

  getters: {
    currentQuiz() {
      return this.sessionQuizzes[this.currentQuizIndex]
    },

    categoryStats: (state) => {
      const stats = {}
      const categories = [...new Set(state.allQuizzes.map(q => q.category))]
      
      categories.forEach(cat => {
        const catQuizzes = state.allQuizzes.filter(q => q.category === cat)
        const attempted = catQuizzes.filter(q => state.userHistory[q.id]?.attempts > 0)
        const correct = catQuizzes.filter(q => state.userHistory[q.id]?.lastResult === true)
        
        const rate = catQuizzes.length > 0 ? (correct.length / catQuizzes.length) * 100 : 0
        
        stats[cat] = {
          total: catQuizzes.length,
          attempted: attempted.length,
          correct: correct.length,
          rate: Math.round(rate),
          mastered: rate >= 80
        }
      })
      
      return stats
    },

    totalProgress: (state) => {
      const total = state.allQuizzes.length
      const correct = Object.values(state.userHistory).filter(h => h.lastResult === true).length
      return total > 0 ? Math.round((correct / total) * 100) : 0
    }
  },

  actions: {
    init() {
      const saved = localStorage.getItem('js-master-history')
      if (saved) {
        this.userHistory = JSON.parse(saved)
      }
      this.isInitialized = true
    },

    save() {
      localStorage.setItem('js-master-history', JSON.stringify(this.userHistory))
    },

    selectCategory(category) {
      this.currentCategory = category
      this.currentQuizIndex = 0
      this.sessionResults = []
      
      // SRS Logic: Stabilize the list when starting a session
      const baseList = this.allQuizzes.filter(q => q.category === category)
      
      this.sessionQuizzes = [...baseList].sort((a, b) => {
        const historyA = this.userHistory[a.id] || { attempts: 0, lastResult: true }
        const historyB = this.userHistory[b.id] || { attempts: 0, lastResult: true }
        
        if (historyA.attempts === 0 && historyB.attempts > 0) return -1
        if (historyB.attempts === 0 && historyA.attempts > 0) return 1
        
        if (historyA.lastResult === false && historyB.lastResult === true) return -1
        if (historyB.lastResult === false && historyA.lastResult === true) return 1
        
        return 0
      })
    },

    submitAnswer(quizId, isCorrect) {
      // Update history
      if (!this.userHistory[quizId]) {
        this.userHistory[quizId] = { attempts: 0, correct: 0, lastResult: false, category: '' }
      }
      
      const history = this.userHistory[quizId]
      history.attempts++
      if (isCorrect) history.correct++
      history.lastResult = isCorrect
      history.category = this.allQuizzes.find(q => q.id === quizId)?.category
      
      this.sessionResults.push(isCorrect)
      this.save()
    },

    nextQuiz() {
      if (this.currentQuizIndex < this.sessionQuizzes.length - 1) {
        this.currentQuizIndex++
        return true
      }
      return false
    },

    resetHistory() {
      this.userHistory = {}
      this.save()
    }
  }
})
