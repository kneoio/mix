import { computed, shallowRef, type ComputedRef, type Ref, watch } from 'vue'

export function useSelection<T, K extends string | number>(
  items: Ref<T[]> | ComputedRef<T[]>,
  keyOf: (item: T) => K
) {
  const selected = shallowRef<Set<K>>(new Set<K>())

  const keysOnPage = computed(() => (items.value || []).map(keyOf))

  const selectedCount = computed(() => selected.value.size)
  const hasAnySelected = computed(() => selected.value.size > 0)
  const allSelectedOnPage = computed(() => keysOnPage.value.length > 0 && keysOnPage.value.every(k => selected.value.has(k)))

  function isSelected(item: T) {
    return selected.value.has(keyOf(item))
  }

  function toggle(item: T, value?: boolean) {
    const k = keyOf(item)
    const shouldSelect = value ?? !selected.value.has(k)
    if (shouldSelect) selected.value.add(k)
    else selected.value.delete(k)
  }

  function clear() {
    selected.value.clear()
  }

  function selectAll() {
    for (const k of keysOnPage.value) selected.value.add(k)
  }

  // Keep selection in sync with available items (remove keys no longer visible)
  watch(keysOnPage, (keys) => {
    const set = selected.value
    for (const k of Array.from(set)) {
      if (!keys.includes(k)) set.delete(k)
    }
  })

  return {
    selected,
    selectedKeys: selected,
    isSelected,
    toggle,
    clear,
    selectAll,
    selectedCount,
    hasAnySelected,
    allSelectedOnPage
  }
}
