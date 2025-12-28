<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuizStore } from './stores/quizStore'
import CategorySelector from './components/CategorySelector.vue'
import QuizCard from './components/QuizCard.vue'
import LessonView from './components/LessonView.vue'
import ProgressDashboard from './components/ProgressDashboard.vue'
import { Sun, Moon, LayoutDashboard, PlayCircle, Trophy, GraduationCap } from 'lucide-vue-next'

const store = useQuizStore()
const isDark = ref(false)
const view = ref('selection') // selection, quiz, lesson, dashboard
const selectedCategory = ref(null)

onMounted(() => {
  store.init()
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
  }
  if (isDark.value) document.documentElement.classList.add('dark')
})

const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const handleSelection = ({ category, mode }) => {
  selectedCategory.value = category
  if (mode === 'quiz') {
    store.selectCategory(category)
    view.value = 'quiz'
  } else {
    view.value = 'lesson'
  }
}

const startQuizFromLesson = (category) => {
  store.selectCategory(category)
  view.value = 'quiz'
}

const exitToSelection = () => {
  view.value = 'selection'
  selectedCategory.value = null
}
</script>

<template>
  <div class="min-h-screen text-slate-900 dark:text-slate-100 transition-colors flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-5xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
        <div class="flex items-center gap-2 cursor-pointer" @click="exitToSelection">
          <div class="p-1.5 md:p-2 bg-primary-500 rounded-lg text-white">
            <PlayCircle :size="18" class="md:hidden" />
            <PlayCircle :size="20" class="hidden md:block" />
          </div>
          <h1 class="text-lg md:text-xl font-black tracking-tight text-slate-900 dark:text-white">JS Master</h1>
        </div>

        <nav class="hidden sm:flex items-center gap-6 text-sm font-bold">
          <button 
            @click="exitToSelection" 
            :class="[view !== 'dashboard' ? 'text-primary-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white']"
          >
            학습하기
          </button>
          <button 
            @click="view = 'dashboard'" 
            :class="[view === 'dashboard' ? 'text-primary-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white']"
          >
            대시보드
          </button>
        </nav>

        <div class="flex items-center gap-2 md:gap-3">
          <button 
            @click="toggleDark"
            class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <template v-if="isDark">
              <Sun :size="18" class="text-amber-400 md:hidden" />
              <Sun :size="20" class="text-amber-400 hidden md:block" />
            </template>
            <template v-else>
              <Moon :size="18" class="text-slate-600 md:hidden" />
              <Moon :size="20" class="text-slate-600 hidden md:block" />
            </template>
          </button>
          
          <button 
            @click="view = 'dashboard'"
            v-if="view !== 'dashboard'"
            class="sm:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LayoutDashboard :size="18" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto w-full px-4 py-6 md:py-8 flex-1">
      <Transition name="card-transition" mode="out-in">
        <div v-if="view === 'selection'">
          <div class="mb-8 md:mb-10 text-center">
            <h2 class="text-2xl md:text-3xl font-black mb-2">무엇을 배워볼까요?</h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm md:text-lg">기초부터 탄탄하게, 자바스크립트 마스터 클래스</p>
          </div>
          <CategorySelector @select="handleSelection" />
        </div>

        <div v-else-if="view === 'lesson'">
          <LessonView :category="selectedCategory" @exit="exitToSelection" @startQuiz="startQuizFromLesson" />
        </div>

        <div v-else-if="view === 'quiz'">
          <QuizCard @exit="exitToSelection" />
        </div>

        <div v-else-if="view === 'dashboard'">
          <ProgressDashboard />
        </div>
      </Transition>
    </main>

    <!-- Mobile Navigation Bottom (Only for mobile when not in a session) -->
    <nav v-if="view === 'selection' || view === 'dashboard'" class="sm:hidden sticky bottom-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-2">
      <div class="flex justify-around items-center">
        <button 
          @click="exitToSelection"
          :class="['flex flex-col items-center gap-1 p-2 transition-colors', view !== 'dashboard' ? 'text-primary-500' : 'text-slate-400']"
        >
          <GraduationCap :size="20" />
          <span class="text-[10px] font-bold">학습</span>
        </button>
        <button 
          @click="view = 'dashboard'"
          :class="['flex flex-col items-center gap-1 p-2 transition-colors', view === 'dashboard' ? 'text-primary-500' : 'text-slate-400']"
        >
          <Trophy :size="20" />
          <span class="text-[10px] font-bold">성적</span>
        </button>
      </div>
    </nav>

    <!-- Footer -->
    <footer v-if="view !== 'lesson' && view !== 'quiz'" class="border-t border-slate-100 dark:border-slate-800 py-6 md:py-8">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <p class="text-[10px] md:text-sm text-slate-400 font-medium">© 2025 JS Master App. Made for Beginners.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.card-transition-enter-active,
.card-transition-leave-active {
  transition: all 0.2s ease-out;
}

.card-transition-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.card-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
