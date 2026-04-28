"use client"

import { Portal, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react"

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
  const [filterOpen, setFilterOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [localPriceMin, setLocalPriceMin] = useState(priceMin || "")
  const [localPriceMax, setLocalPriceMax] = useState(
    priceMax || String(PRICE_LIMIT)
  )
  const sliderPrice = Number.isFinite(Number(localPriceMax))
    ? Number(localPriceMax)
    : PRICE_LIMIT

  useEffect(() => {
    setLocalPriceMin(priceMin || "")
    setLocalPriceMax(priceMax || String(PRICE_LIMIT))
  }, [priceMin, priceMax])

  const createQueryString = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams)

      Object.entries(updates).forEach(([name, value]) => {
        if (value) {
          params.set(name, value)
        } else {
          params.delete(name)
        }
      })

      params.delete("page")

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value?: string) => {
    const query = createQueryString({ [name]: value })
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    })
  }

  const applyPriceFilters = () => {
    const query = createQueryString({
      priceMin: localPriceMin || undefined,
      priceMax: localPriceMax || undefined,
    })

    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    })
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams)

    params.delete("category")
    params.delete("priceMin")
    params.delete("priceMax")
    params.delete("page")

    const query = params.toString()
    setLocalPriceMin("")
    setLocalPriceMax(String(PRICE_LIMIT))
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    })
  }

  const hasFilters = !!selectedCategory || !!priceMin || !!priceMax
  const categoryRows = useMemo(() => categories.slice(0, 8), [categories])

  const filterContent = (
    <>
      <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736d]">
            Filter
          </p>
          <h2 className="mt-1 text-[20px] font-medium leading-none">
            Refine edit
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen(false)}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-black/10 bg-white/70 small:hidden"
          aria-label="Close filters"
        >
          <XMark />
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="hidden rounded-[9px] border border-black/10 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/55 transition-colors hover:bg-black hover:text-white small:block"
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
            0 - {localPriceMax || PRICE_LIMIT}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={PRICE_LIMIT}
          step="10"
          value={sliderPrice}
          onChange={(event) => setLocalPriceMax(event.target.value)}
          onPointerUp={applyPriceFilters}
          onTouchEnd={applyPriceFilters}
          className="h-1.5 w-full accent-black"
          aria-label="Maximum price"
        />
        <div className="grid grid-cols-1 gap-2">
          <label className="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Min
            <input
              type="number"
              min="0"
              value={localPriceMin}
              onChange={(event) => setLocalPriceMin(event.target.value)}
              onBlur={applyPriceFilters}
              placeholder="0"
              className="h-10 rounded-[10px] border border-black/10 bg-white/70 px-3 text-[13px] font-semibold text-black outline-none transition-colors focus:border-black/30"
            />
          </label>
          <label className="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Max
            <input
              type="number"
              min="0"
              value={priceMax ? localPriceMax : ""}
              onChange={(event) => setLocalPriceMax(event.target.value)}
              onBlur={applyPriceFilters}
              placeholder={String(PRICE_LIMIT)}
              className="h-10 rounded-[10px] border border-black/10 bg-white/70 px-3 text-[13px] font-semibold text-black outline-none transition-colors focus:border-black/30"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={applyPriceFilters}
          className="h-10 rounded-[11px] bg-black px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-50"
          disabled={isPending}
        >
          Apply price
        </button>
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
      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="h-10 rounded-[11px] border border-black/10 bg-white/70 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55 transition-colors hover:bg-black hover:text-white small:hidden"
        >
          Clear filters
        </button>
      )}
    </>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setFilterOpen(true)}
        className="copy-panel mb-5 flex h-12 w-full items-center justify-between px-4 text-left small:hidden"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736d]">
          Filter and sort
        </span>
        <span className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          Open
        </span>
      </button>
      <Portal>
        <Transition
          show={filterOpen}
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[90] bg-white/50 backdrop-blur-sm small:hidden">
            <div
              className="absolute inset-3 top-[76px] overflow-y-auto rounded-[18px] border border-black/10 bg-white/[0.98] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.16)]"
              data-testid="mobile-filter-panel"
            >
              <div className="flex flex-col gap-6">{filterContent}</div>
            </div>
          </div>
        </Transition>
      </Portal>
      <aside className="copy-panel hidden w-full flex-col gap-6 p-4 small:mb-0 small:flex small:w-[280px] small:shrink-0 small:p-5">
        {filterContent}
      </aside>
    </>
  )
}

export default RefinementList
