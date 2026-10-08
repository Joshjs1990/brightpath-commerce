"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { products, type DemoProduct } from "@lib/demo/catalog"

export type CartItem = { handle: string; size: string; quantity: number }
const storageKey = "edges-in-motion-demo-cart-v1"
const CartContext = createContext<{
  items: CartItem[]
  ready: boolean
  add: (product: DemoProduct, size: string) => void
  update: (handle: string, size: string, quantity: number) => void
}>({ items: [], ready: false, add: () => {}, update: () => {} })

export function DemoCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      )
      if (Array.isArray(saved)) {
        const restored: CartItem[] = []
        for (const item of saved) {
          if (!item || typeof item !== "object") continue
          const product = products.find((p) => p.handle === item.handle)
          if (
            !product ||
            !product.sizes.includes(item.size) ||
            !Number.isInteger(item.quantity) ||
            item.quantity <= 0
          )
            continue
          const duplicate = restored.find(
            (line) => line.handle === item.handle && line.size === item.size
          )
          if (duplicate)
            duplicate.quantity = Math.min(
              10,
              duplicate.quantity + item.quantity
            )
          else
            restored.push({
              handle: item.handle,
              size: item.size,
              quantity: Math.min(10, item.quantity),
            })
        }
        setItems(restored)
      }
    } catch {
      /* Private browsing or an outdated saved cart: start empty. */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(items))
      } catch {
        /* The cart still works in memory. */
      }
    }
  }, [items, ready])

  function add(product: DemoProduct, size: string) {
    if (!product.sizes.includes(size)) return
    setItems((current) => {
      const exists = current.some(
        (item) => item.handle === product.handle && item.size === size
      )
      return exists
        ? current.map((item) =>
            item.handle === product.handle && item.size === size
              ? { ...item, quantity: Math.min(10, item.quantity + 1) }
              : item
          )
        : [...current, { handle: product.handle, size, quantity: 1 }]
    })
  }

  function update(handle: string, size: string, quantity: number) {
    if (!Number.isFinite(quantity)) return
    setItems((current) =>
      current
        .map((item) =>
          item.handle === handle && item.size === size
            ? {
                ...item,
                quantity: Math.max(0, Math.min(10, Math.floor(quantity))),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  return (
    <CartContext.Provider value={{ items, ready, add, update }}>
      {children}
    </CartContext.Provider>
  )
}

export const useDemoCart = () => useContext(CartContext)
