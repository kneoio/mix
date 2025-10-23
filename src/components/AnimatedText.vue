<template>
  <div class="animated-text-container">
    <div class="static-text" v-if="shouldRenderStatic" :class="visualClass" :style="visualStyleVars">
      <span v-if="parsedText.title">{{ parsedText.title }}</span>
      <span v-if="parsedText.artist" class="separator">•</span>
      <span v-if="parsedText.artist">{{ parsedText.artist }}</span>
    </div>
    <div class="marquee" v-else-if="displayText" ref="containerRef">
      <div class="marquee-track" ref="trackRef" :style="{ animationDuration: animationDuration + 's' }">
        <span class="marquee-copy" ref="textRef" :class="visualClass" :style="visualStyleVars">{{ displayText }} • </span>
        <span class="marquee-copy" :class="visualClass" :style="visualStyleVars">{{ displayText }} • </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  text?: string
  animationType?: 'static' | 'marquee' | 'auto'
  animationSpeed?: number
  visualStyle?: 'none' | 'glow' | 'gradient'
  stationColor?: string
}>(), {
  text: '',
  animationType: 'auto',
  animationSpeed: 1,
  visualStyle: 'none',
  stationColor: ''
})

const parsedText = computed(() => {
  const raw = (props.text ?? '').toString()
  const trimmed = raw.trim()
  if (!trimmed) {
    return { title: '', artist: null }
  }
  if (trimmed.includes('|')) {
    const [t, a] = trimmed.split('|')
    return {
      title: (t || '').trim(),
      artist: ((a || '').trim()) || null
    }
  }
  return {
    title: trimmed,
    artist: null
  }
})

const displayText = computed(() => {
  if (!parsedText.value.title && !parsedText.value.artist) return ''
  if (parsedText.value.title && parsedText.value.artist) {
    return `${parsedText.value.title} • ${parsedText.value.artist}`
  }
  return parsedText.value.title || parsedText.value.artist || ''
})

const containerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const needsScroll = ref(false)
const resizeObserverRef = ref<ResizeObserver | null>(null)

const shouldRenderStatic = computed(() => {
  if (!(parsedText.value.title || parsedText.value.artist)) return true
  if (props.animationType === 'static') return true
  if (props.animationType === 'marquee') return false
  return !needsScroll.value
})

const animationDuration = computed(() => {
  const base = 12
  const spd = Math.max(0.1, Math.min(10, Number(props.animationSpeed || 1)))
  return base / spd
})

const visualClass = computed(() => {
  return {
    'at-glow': props.visualStyle === 'glow',
    'at-gradient': props.visualStyle === 'gradient'
  }
})

const visualStyleVars = computed(() => {
  const vars: Record<string, string> = {}
  if (props.stationColor) {
    vars['--accent-color'] = props.stationColor
  }
  vars['--anim-speed'] = `${Math.max(0.1, Math.min(10, Number(props.animationSpeed || 1)))}s`
  return vars
})

const measure = () => {
  const c = containerRef.value
  const t = textRef.value
  if (!c || !t) {
    needsScroll.value = false
    return
  }
  // If single-copy content width exceeds container width, enable marquee
  needsScroll.value = t.scrollWidth > c.clientWidth
}

onMounted(async () => {
  await nextTick()
  measure()
  // Recalculate on container resize and window resize
  const c = containerRef.value
  if (c && 'ResizeObserver' in window) {
    resizeObserverRef.value = new ResizeObserver(() => measure())
    resizeObserverRef.value.observe(c)
  }
  window.addEventListener('resize', measure)
})

watch([displayText], async () => {
  await nextTick()
  measure()
})

onUnmounted(() => {
  if (resizeObserverRef.value && containerRef.value) {
    resizeObserverRef.value.unobserve(containerRef.value)
    resizeObserverRef.value.disconnect()
  }
  resizeObserverRef.value = null
  window.removeEventListener('resize', measure)
})
</script>

<style scoped>
.animated-text-container {
  display: block;
  width: 100%;
  font-size: inherit;
  color: inherit;
}

.static-text {
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.separator {
  flex-shrink: 0;
}

.marquee {
  width: 100%;
  overflow: hidden;
}

.marquee-track {
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  animation: animated-text-scroll 12s linear infinite;
  will-change: transform;
}

.marquee-copy {
  color: inherit;
  white-space: nowrap;
}

/* Visual styles */
.at-glow {
  color: var(--accent-color, currentColor);
  text-shadow:
    0 0 4px var(--accent-color, currentColor),
    0 0 8px var(--accent-color, currentColor),
    0 0 12px var(--accent-color, currentColor);
}

.at-gradient {
  background: linear-gradient(90deg, var(--accent-color, currentColor), currentColor);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes animated-text-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
