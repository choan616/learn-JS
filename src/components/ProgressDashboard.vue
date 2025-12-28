<script setup>
import { useQuizStore } from '../stores/quizStore'
import { Trophy, Target, Award, RotateCcw, Flame } from 'lucide-vue-next'

const store = useQuizStore()

const handleReset = () => {
  if (confirm('정말 모든 학습 기록을 삭제하시겠습니까?')) {
    store.resetHistory()
  }
}
</script>

<template>
  <div class="space-y-6 md:space-y-8">
    <!-- Summary Header -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div class="p-5 md:p-6 bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-center gap-4 md:gap-5">
        <div class="p-3 md:p-4 bg-amber-100 text-amber-600 rounded-xl md:rounded-2xl">
          <Trophy :size="24" class="md:hidden" />
          <Trophy :size="28" class="hidden md:block" />
        </div>
        <div>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">전체 진행도</p>
          <h4 class="text-xl md:text-2xl font-black">{{ store.totalProgress }}%</h4>
        </div>
      </div>

      <div class="p-5 md:p-6 bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-center gap-4 md:gap-5">
        <div class="p-3 md:p-4 bg-primary-100 text-primary-600 rounded-xl md:rounded-2xl">
          <Target :size="24" class="md:hidden" />
          <Target :size="28" class="hidden md:block" />
        </div>
        <div>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">완료한 문제</p>
          <h4 class="text-xl md:text-2xl font-black">{{ Object.keys(store.userHistory).length }}/{{ store.allQuizzes.length }}</h4>
        </div>
      </div>

      <div class="sm:col-span-2 lg:col-span-1 p-5 md:p-6 bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm flex items-center gap-4 md:gap-5">
        <div class="p-3 md:p-4 bg-rose-100 text-rose-600 rounded-xl md:rounded-2xl">
          <Flame :size="24" class="md:hidden" />
          <Flame :size="28" class="hidden md:block" />
        </div>
        <div>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400">마스터한 카테고리</p>
          <h4 class="text-xl md:text-2xl font-black">
            {{ Object.values(store.categoryStats).filter(s => s.mastered).length }}/{{ Object.keys(store.categoryStats).length }}
          </h4>
        </div>
      </div>
    </div>

    <!-- Category Stats (Mobile Layout: Cards, Desktop: Table) -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700/50 overflow-hidden shadow-sm">
      <div class="p-5 md:p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
        <h3 class="font-bold text-lg md:text-xl">카테고리별 마스터리</h3>
      </div>
      
      <!-- Mobile Cards -->
      <div class="md:hidden divide-y divide-slate-50 dark:divide-slate-700/30">
        <div v-for="(stat, name) in store.categoryStats" :key="name" class="p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="font-bold text-slate-900 dark:text-white">{{ name }}</span>
            <div v-if="stat.mastered" class="flex items-center gap-1 text-emerald-500">
              <Award :size="14" />
              <span class="text-[10px] font-bold uppercase tracking-tight">Mastered</span>
            </div>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-primary-500" :style="{ width: `${(stat.attempted / stat.total) * 100}%` }"></div>
            </div>
            <div class="text-xs font-mono text-slate-500 whitespace-nowrap">
              {{ stat.correct }}/{{ stat.total }} ({{ stat.rate }}%)
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left font-medium">
          <thead>
            <tr class="text-xs uppercase text-slate-500 border-b border-slate-50 dark:border-slate-700/30">
              <th class="px-6 py-4 font-bold">카테고리</th>
              <th class="px-6 py-4 font-bold">진행도</th>
              <th class="px-6 py-4 font-bold">정답률</th>
              <th class="px-6 py-4 font-bold">상태</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 dark:divide-slate-700/30">
            <tr v-for="(stat, name) in store.categoryStats" :key="name" class="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
              <td class="px-6 py-5 font-bold">{{ name }}</td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-20 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-primary-500" :style="{ width: `${(stat.attempted / stat.total) * 100}%` }"></div>
                  </div>
                  <span class="text-xs text-slate-500">{{ stat.attempted }}/{{ stat.total }}</span>
                </div>
              </td>
              <td class="px-6 py-5 font-mono text-sm">{{ stat.rate }}%</td>
              <td class="px-6 py-5">
                <div v-if="stat.mastered" class="flex items-center gap-1.5 text-emerald-500">
                  <Award :size="16" />
                  <span class="text-[10px] font-bold uppercase">Mastered</span>
                </div>
                <div v-else-if="stat.attempted > 0" class="flex items-center gap-1.5 text-amber-500">
                  <div class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                  <span class="text-[10px] font-bold uppercase">Learning</span>
                </div>
                <span v-else class="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Locked</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
      <button 
        @click="handleReset"
        class="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
      >
        <RotateCcw :size="14" />
        학습 기록 초기화
      </button>
    </div>
  </div>
</template>
