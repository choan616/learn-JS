<script setup>
import { ref, computed } from 'vue'
import { useQuizStore } from '../stores/quizStore'
import { 
  Code2, Hash, Zap, Box, MousePointer2, 
  ChevronRight, GraduationCap, Trophy,
  Key, Layers, Terminal, Globe, Gauge
} from 'lucide-vue-next'

const emit = defineEmits(['select'])
const store = useQuizStore()
const mode = ref('study') // study or quiz
const currentLevel = ref('Beginner')

const allCategories = [
  // Beginner
  { 
    id: 'ES6', 
    name: 'ES6 문법', 
    desc: 'let, const, 화살표 함수, 구조 분해 할당', 
    icon: Code2,
    level: 'Beginner',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
  },
  { 
    id: '배열/객체', 
    name: '배열/객체', 
    desc: 'filter, map, reduce, Object 메서드', 
    icon: Hash,
    level: 'Beginner',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
  },
  { 
    id: '비동기', 
    name: '비동기 처리', 
    desc: 'Promise, async/await, fetch', 
    icon: Zap,
    level: 'Beginner',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
  },
  { 
    id: 'DOM', 
    name: 'DOM 조작', 
    desc: '요소 선택, 생성, 스타일 수정', 
    icon: Box,
    level: 'Beginner',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30'
  },
  { 
    id: '이벤트', 
    name: '이벤트 모델', 
    desc: '리스너 등록, 전파 방지, 폼 제어', 
    icon: MousePointer2,
    level: 'Beginner',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'
  },
  // Intermediate
  { 
    id: '클로저/스코프', 
    name: '스코프 & 클로저', 
    desc: '실행 컨텍스트, 클로저, this 바인딩', 
    icon: Key, 
    level: 'Intermediate',
    color: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30'
  },
  { 
    id: '프로토타입', 
    name: '프로토타입 상속', 
    desc: '프로토타입 체인, 생성자, 클래스 심화', 
    icon: Layers, 
    level: 'Intermediate',
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30'
  },
  { 
    id: '함수형JS', 
    name: '함수형 프로그래밍', 
    desc: '순수 함수, 커링, 파이프, 불변성', 
    icon: Terminal, 
    level: 'Intermediate',
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
  },
  { 
    id: '브라우저API', 
    name: '실전 브라우저 API', 
    desc: 'Web Storage, Intersection Observer', 
    icon: Globe, 
    level: 'Intermediate',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30'
  },
  { 
    id: '성능/최적화', 
    name: '성능 및 최적화', 
    desc: 'Debounce, Throttle, 메모리 관리', 
    icon: Gauge, 
    level: 'Intermediate',
    color: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30'
  }
]

const filteredCategories = computed(() => {
  return allCategories.filter(cat => cat.level === currentLevel.value)
})

const getStatus = (catId) => {
  const stats = store.categoryStats[catId]
  if (!stats || stats.attempted === 0) return 'start'
  if (stats.mastered) return 'mastered'
  return 'learning'
}
</script>

<template>
  <div class="space-y-6 md:space-y-10">
    <!-- Mode & Level Controls -->
    <div class="flex flex-col gap-6 items-center">
      <!-- Mode Toggle -->
      <div class="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
        <button 
          @click="mode = 'study'"
          :class="[
            'flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-sm',
            mode === 'study' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          <GraduationCap :size="18" />
          공부하기
        </button>
        <button 
          @click="mode = 'quiz'"
          :class="[
            'flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-sm',
            mode === 'quiz' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          <Trophy :size="18" />
          퀴즈풀기
        </button>
      </div>

      <!-- Level Switcher -->
      <div class="flex items-center gap-1 p-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-800 w-full max-w-sm">
        <button 
          v-for="level in ['Beginner', 'Intermediate']" 
          :key="level"
          @click="currentLevel = level"
          :class="[
            'flex-1 py-2 text-xs font-black rounded-md transition-all uppercase tracking-widest',
            currentLevel === level ? 'bg-primary-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
          ]"
        >
          {{ level }}
        </button>
      </div>
    </div>

    <!-- Category Grid -->
    <TransitionGroup 
      name="list" 
      tag="div" 
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <button 
        v-for="cat in filteredCategories" 
        :key="cat.id"
        @click="emit('select', { category: cat.id, mode })"
        class="group relative flex items-start gap-4 p-5 text-left bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl transition-all hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/10"
      >
        <div :class="['p-3 rounded-xl transition-transform group-hover:scale-110', cat.color]">
          <component :is="cat.icon" :size="24" />
        </div>

        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-bold text-lg leading-tight">{{ cat.name }}</h3>
            <span 
              v-if="getStatus(cat.id) === 'mastered'"
              class="text-[10px] uppercase font-bold px-2 py-0.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 rounded-full"
            >
              Mastered
            </span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm mb-3 line-clamp-1">{{ cat.desc }}</p>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 overflow-hidden w-full max-w-[120px]">
              <div class="h-1.5 flex-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-primary-500 transition-all duration-500"
                  :style="{ width: `${store.categoryStats[cat.id]?.rate || 0}%` }"
                ></div>
              </div>
              <span class="text-[10px] font-mono text-slate-400">{{ store.categoryStats[cat.id]?.rate || 0 }}%</span>
            </div>
            <ChevronRight :size="18" class="text-slate-300 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </button>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
