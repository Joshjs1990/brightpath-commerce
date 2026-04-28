"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

import SortProducts, { SortOptions } from "./sort-products"

export type RefinementCategory = {
  id: string
  name: string
  handle: string
  productCount?: number
}

type RefinementListProps = {
  sortBy: SortOptions
  categories?: RefinementCategory[]
  selectedCategory?: string
  priceMin?: string
  priceMax?: string
  search?: boolean
  "data-testid"?: string
}

const PRICE_LIMIT = 500

const RefinementList = ({
  sortBy,
  categories = [],
  selectedCategory,
  priceMin,
  priceMax,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const maxPrice = priceMax || String(PRICE_LIMIT)
  const sliderPrice = Number.isFinite(Number(maxPrice))
    ? Number(maxPrice)
    : PRICE_LIMIT

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      params.delete("page")

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value?: string) => {
    const query = createQueryString(name, value)
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams)

    params.delete("category")
    params.delete("priceMin")
    params.delete("priceMax")
    params.delete("page")

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const hasFilters = !!selectedCategory || !!priceMin || !!priceMax
  const categoryRows = useMemo(() => categories.slice(0, 8), [categories])

  return (
    <aside className="copy-panel mb-6 flex w-full flex-col gap-6 p-4 small:mb-0 small:w-[280px] small:shrink-0 small:p-5">
      <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736d]">
            Filter
          </p>
          <h2 className="mt-1 text-[20px] font-medium leading-none">
            Refine edit
          </h2>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-[9px] border border-black/10 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/55 transition-colors hover:bg-black hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <SortProducts
        sortBy={sortBy}
        setQueryParams={setQueryParams}
        data-testid={dataTestId}
      />

      <div className="flex flex-col gap-3 border-t border-black/10 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736d]">
            Price
          </p>
          <span className="text-[12px] font-semibold text-black/60">
            0 - {maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={PRICE_LIMIT}
          step="10"
          value={sliderPrice}
          onChange={(event) => setQueryParams("priceMax", event.target.value)}
          className="h-1.5 w-full accent-black"
          aria-label="Maximum price"
        />
        <div className="grid grid-cols-1 gap-2">
          <label className="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Min
            <input
              type="number"
              min="0"
              value={priceMin || ""}
              onChange={(event) =>
                setQueryParams("priceMin", event.target.value)
              }
              placeholder="0"
              className="h-10 rounded-[10px] border border-black/10 bg-white/70 px-3 text-[13px] font-semibold text-black outline-none transition-colors focus:border-black/30"
            />
          </label>
          <label className="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Max
            <input
              type="number"
              min="0"
              value={priceMax || ""}
              onChange={(event) =>
                setQueryParams("priceMax", event.target.value)
              }
              placeholder={String(PRICE_LIMIT)}
              className="h-10 rounded-[10px] border border-black/10 bg-white/70 px-3 text-[13px] font-semibold text-black outline-none transition-colors focus:border-black/30"
            />
          </label>
        </div>
      </div>

      {categoryRows.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-black/10 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736d]">
            Category
          </p>
          <div className="grid gap-1.5">
            {categoryRows.map((category) => {
              const active = selectedCategory === category.handle

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setQueryParams(
                      "category",
                      active ? undefined : category.handle
                    )
                  }
                  className={`flex h-10 items-center justify-between rounded-[11px] border px-3 text-left text-[13px] font-semibold transition-all ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white/55 text-black/70 hover:border-black/20 hover:bg-white"
                  }`}
                >
                  <span>{category.name}</span>
                  {typeof category.productCount === "number" && (
                    <span className={active ? "text-white/55" : "text-black/35"}>
                      {category.productCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </aside>
  )
}

export default RefinementList
