"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { categories, countries, defaultCountry } from "@lib/demo/catalog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EdgesInMotionLogo from "@modules/common/icons/edges-in-motion-logo"
import { useDemoCart } from "./cart-context"

export default function DemoNav() {
  const pathname = usePathname()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const { items } = useDemoCart()
  const count = items.reduce((total, item) => total + item.quantity, 0)
  const menuOpen = openPath === pathname
  const country = pathname.split("/")[1]
  const prefix = countries.includes(country) ? country : defaultCountry

  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-2xl">
      <header className="content-container flex h-16 items-center justify-between gap-2 !px-4 text-[10px] font-semibold uppercase tracking-[0.1em] sm:gap-3 sm:!px-6 sm:text-[11px] sm:tracking-[0.12em]">
        <div className="flex items-center gap-4">
          <button
            aria-expanded={menuOpen}
            aria-controls="demo-shop-menu"
            onClick={() => setOpenPath(menuOpen ? null : pathname)}
            className="rounded-lg border border-black/10 px-3 py-2 hover:bg-black/5"
          >
            {menuOpen ? "Close" : "Shop by"}
          </button>
          <LocalizedClientLink
            href="/store"
            className="hidden sm:block hover:opacity-60"
          >
            Shop All
          </LocalizedClientLink>
        </div>
        <LocalizedClientLink
          href="/"
          className="flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2"
        >
          <EdgesInMotionLogo className="hidden h-5 w-5 xsmall:block" />
          <span className="text-[10px] sm:text-[11px]">Edges In Motion</span>
        </LocalizedClientLink>
        <div className="flex items-center gap-4">
          <LocalizedClientLink
            href="/account"
            className="hidden sm:block hover:opacity-60"
          >
            Account
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/cart"
            className="whitespace-nowrap hover:opacity-60"
            aria-label={`Shopping bag, ${count} items`}
          >
            Bag ({count})
          </LocalizedClientLink>
        </div>
      </header>
      {menuOpen && (
        <nav
          id="demo-shop-menu"
          aria-label="Shop categories"
          className="content-container grid grid-cols-2 gap-4 border-t border-black/10 py-5 sm:grid-cols-4"
        >
          {categories.map((category) => (
            <LocalizedClientLink
              key={category.handle}
              href={`/categories/${category.handle}`}
              onClick={() => setOpenPath(null)}
              className="group relative h-40 overflow-hidden rounded-xl"
            >
              <img
                src={category.image}
                alt=""
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-white">
                {category.name}
              </span>
            </LocalizedClientLink>
          ))}
          <LocalizedClientLink
            href="/store"
            onClick={() => setOpenPath(null)}
            className="underline underline-offset-4"
          >
            Browse all styles
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/account"
            onClick={() => setOpenPath(null)}
            className="underline underline-offset-4"
          >
            Account
          </LocalizedClientLink>
        </nav>
      )}
      <div className="flex items-center justify-center gap-3 border-t border-black/5 bg-[#f3f1ed] px-4 py-1.5 text-[10px] tracking-wide text-[#6d6860]">
        <span>Demo store · Explore the edit. Orders are disabled.</span>
        <label className="hidden sm:flex items-center gap-1">
          Country
          <select
            aria-label="Demo country"
            value={prefix}
            onChange={(event) => {
              const rest = countries.includes(country)
                ? pathname.split("/").slice(2).join("/")
                : ""
              window.location.assign(`/${event.target.value}/${rest}`)
            }}
            className="bg-transparent uppercase"
          >
            {countries.map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
