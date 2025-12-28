<script setup>
import { computed } from 'vue'
import { lessons } from '../data/lessons'
import { ChevronLeft, GraduationCap, CheckCircle } from 'lucide-vue-next'

const props = defineProps(['category'])
const emit = defineEmits(['exit', 'startQuiz'])

const lesson = computed(() => lessons[props.category])
</script>

<template>
  <div v-if="lesson" class="max-w-4xl mx-auto pb-16 md:pb-20">
    <!-- Header -->
    <div class="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
      <button 
        @click="emit('exit')"
        class="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <ChevronLeft :size="20" class="md:hidden" />
        <ChevronLeft :size="24" class="hidden md:block" />
      </button>
      <div>
        <div class="flex items-center gap-2 text-primary-500 font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1">
          <GraduationCap :size="14" class="md:hidden" />
          <GraduationCap :size="16" class="hidden md:block" />
          <span>Study Mode</span>
        </div>
        <h2 class="text-xl md:text-3xl font-black leading-tight">{{ lesson.title }}</h2>
      </div>
    </div>

    <!-- Description -->
    <div class="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/50 p-4 md:p-6 rounded-2xl md:rounded-3xl mb-8 md:mb-10">
      <p class="text-primary-900 dark:text-primary-100 text-sm md:text-base leading-relaxed font-medium">
        {{ lesson.description }}
      </p>
    </div>

    <!-- Sections -->
    <div class="space-y-8 md:space-y-12">
      <div v-for="(section, idx) in lesson.sections" :key="idx" class="relative">
        <div class="flex items-start gap-4">
          <div class="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold mt-1">
            {{ idx + 1 }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg md:text-xl font-bold mb-3 flex items-center gap-2">
              <span class="md:hidden text-primary-500 text-xs">#{{ idx + 1 }}</span>
              {{ section.title }}
            </h3>
            
            <div class="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-sm md:text-base mb-4 md:mb-6 whitespace-pre-line leading-relaxed">
              {{ section.content }}
            </div>

            <!-- Code Block Replacement -->
            <div v-if="section.code" class="relative group">
              <div class="absolute -top-2 md:-top-3 left-4 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Example
              </div>
              <pre class="overflow-x-auto p-4 md:p-6 bg-slate-900 text-emerald-400 rounded-xl md:rounded-2xl font-mono text-[12px] md:text-sm leading-relaxed border border-white/5 shadow-xl select-all"><code>{{ section.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final Action -->
    <div class="mt-12 md:mt-20 p-6 md:p-12 bg-white dark:bg-slate-800 rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 text-center shadow-xl">
      <div class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 mb-4 md:mb-6">
        <CheckCircle :size="24" class="md:hidden" />
        <CheckCircle :size="32" class="hidden md:block" />
      </div>
      <h3 class="text-xl md:text-2xl font-black mb-2 md:mb-3">학습을 완료하셨나요?</h3>
      <p class="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-6 md:mb-8 max-w-md mx-auto">
        학습한 내용을 바탕으로 퀴즈를 풀어 실력을 확인해보세요!
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
        <button 
          @click="emit('startQuiz', category)"
          class="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-primary-500/20 transition-all active:scale-95"
        >
          퀴즈 도전하기
        </button>
        <button 
          @click="emit('exit')"
          class="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl md:rounded-2xl font-bold transition-all"
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  </div>
</template>
