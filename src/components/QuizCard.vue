<script setup>
import { ref, computed, watch } from 'vue'
import { useQuizStore } from '../stores/quizStore'
import { validateCode } from '../utils/codeValidator'
import { CheckCircle2, XCircle, ChevronRight, X, Lightbulb, RotateCcw } from 'lucide-vue-next'

const emit = defineEmits(['exit'])
const store = useQuizStore()

const userAnswer = ref('')
const selectedChoice = ref(null)
const isSubmitted = ref(false)
const isCorrect = ref(false)
const showExplanation = ref(false)

const quiz = computed(() => store.currentQuiz)
const progress = computed(() => (store.currentQuizIndex + 1) / store.sessionQuizzes.length * 100)

const resetInternal = () => {
  userAnswer.value = ''
  selectedChoice.value = null
  isSubmitted.value = false
  isCorrect.value = false
  showExplanation.value = false
}

watch(() => store.currentQuizIndex, resetInternal)

const submit = () => {
  if (isSubmitted.value) return

  if (quiz.value.type === 'multiple') {
    if (selectedChoice.value === null) return
    isCorrect.value = selectedChoice.value === quiz.value.answer
  } else {
    if (!userAnswer.value.trim()) return
    isCorrect.value = validateCode(userAnswer.value, quiz.value.test, quiz.value.answer)
  }

  isSubmitted.value = true
  store.submitAnswer(quiz.value.id, isCorrect.value)
}

const handleNext = () => {
  if (!store.nextQuiz()) {
    emit('exit')
  }
}
</script>

<template>
  <div v-if="quiz" class="max-w-3xl mx-auto pb-4">
    <!-- Progress Header -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <div class="flex items-center gap-2 md:gap-3">
        <button 
          @click="emit('exit')"
          class="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X :size="18" class="md:hidden" />
          <X :size="20" class="hidden md:block" />
        </button>
        <div>
          <span class="text-[10px] font-bold text-primary-500 uppercase tracking-widest">{{ quiz.category }}</span>
          <h3 class="text-[11px] md:text-sm font-medium text-slate-500">Question {{ store.currentQuizIndex + 1 }} of {{ store.sessionQuizzes.length }}</h3>
        </div>
      </div>
      
      <div class="w-16 md:w-24 h-1.5 md:h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-primary-500 transition-all duration-500"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Quiz Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl md:shadow-2xl p-5 md:p-8">
      <h2 class="text-lg md:text-2xl font-bold mb-6 md:mb-8 leading-snug md:leading-tight">
        {{ quiz.question }}
      </h2>

      <!-- Multiple Choice -->
      <div v-if="quiz.type === 'multiple'" class="space-y-2 md:space-y-3">
        <button 
          v-for="(choice, idx) in quiz.choices" 
          :key="idx"
          @click="!isSubmitted && (selectedChoice = idx)"
          :disabled="isSubmitted"
          :class="[
            'w-full text-left p-3.5 md:p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3',
            !isSubmitted && selectedChoice === idx ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-50 dark:border-slate-700/30 bg-slate-50 dark:bg-slate-900/30',
            isSubmitted && idx === quiz.answer ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : '',
            isSubmitted && selectedChoice === idx && idx !== quiz.answer ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30' : '',
            !isSubmitted ? 'hover:border-primary-200 dark:hover:border-primary-700 active:scale-[0.98]' : ''
          ]"
        >
          <span class="text-sm md:text-base font-medium">{{ choice }}</span>
          <div v-if="isSubmitted" class="flex-shrink-0">
            <CheckCircle2 v-if="idx === quiz.answer" class="text-emerald-500" :size="18" />
            <XCircle v-else-if="selectedChoice === idx" class="text-rose-500" :size="18" />
          </div>
        </button>
      </div>

      <!-- Code Input -->
      <div v-else class="space-y-4">
        <div class="relative group">
          <textarea 
            v-model="userAnswer"
            :disabled="isSubmitted"
            placeholder="// 여기에 코드를 작성하세요..."
            class="w-full h-32 md:h-40 p-4 font-mono text-xs md:text-sm bg-slate-900 text-emerald-400 rounded-xl outline-none border-2 border-transparent transition-all focus:border-primary-500 placeholder:text-slate-600 disabled:opacity-80"
          ></textarea>
          <div class="absolute top-2 right-2 flex gap-2">
            <button @click="userAnswer = ''" v-if="!isSubmitted" class="p-1.5 bg-slate-800 text-slate-400 rounded hover:text-white transition-colors">
              <RotateCcw :size="12" />
            </button>
          </div>
        </div>
      </div>

      <!-- Result Feedback -->
      <Transition name="fade">
        <div v-if="isSubmitted" class="mt-6 md:mt-8 p-4 md:p-5 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/30">
          <div class="flex items-start gap-3">
            <Lightbulb class="text-amber-400 flex-shrink-0 mt-1 md:hidden" :size="18" />
            <Lightbulb class="text-amber-400 flex-shrink-0 mt-1 hidden md:block" :size="20" />
            <div class="min-w-0">
              <p :class="['font-bold text-base md:text-lg mb-1', isCorrect ? 'text-emerald-600' : 'text-rose-600']">
                {{ isCorrect ? '정답입니다!' : '오답입니다.' }}
              </p>
              <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{{ quiz.explanation }}</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Actions -->
      <div class="mt-8 md:mt-10 flex gap-3 md:gap-4">
        <button 
          v-if="!isSubmitted"
          @click="submit"
          :disabled="quiz.type === 'multiple' ? selectedChoice === null : !userAnswer.trim()"
          class="flex-1 py-3.5 md:py-4 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-primary-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          확인하기
        </button>
        <button 
          v-else
          @click="handleNext"
          class="flex-1 py-3.5 md:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl md:rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>{{ store.currentQuizIndex + 1 === store.sessionQuizzes.length ? '완료' : '다음 문제' }}</span>
          <ChevronRight :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
