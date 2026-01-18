import { defineStore, skipHydrate } from 'pinia'
import { computed, ref, watch } from 'vue'

export type CartPersonCounts = {
  adults: number
  children: number
  seniors: number
}

export type CartPackage = {
  id: string
  title: string
  price: number
}

export type CartItem = {
  id: string
  experienceId: string
  title: string
  image: string
  date: string
  days: number
  people: CartPersonCounts
  packages: CartPackage[]
  basePricePerDay: number
  totalPrice: number
}

function createCartId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const storageKey = 'cart-items'

  if (process.client) {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      try {
        items.value = JSON.parse(raw) as CartItem[]
      } catch {
        localStorage.removeItem(storageKey)
      }
    }
  }

  const totalItems = computed(() => items.value.length)
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.totalPrice, 0)
  )

  function addItem(item: Omit<CartItem, 'id'> & { id?: string }) {
    items.value.push({
      ...item,
      id: item.id ?? createCartId(),
    })
  }

  function removeItem(id: string) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clear() {
    items.value = []
  }

  if (process.client) {
    watch(
      items,
      (value) => {
        localStorage.setItem(storageKey, JSON.stringify(value))
      },
      { deep: true }
    )
  }

  return {
    items: skipHydrate(items),
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    clear,
  }
})
