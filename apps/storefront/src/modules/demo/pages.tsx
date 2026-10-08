"use client"

import { useState } from "react"
import {
  categories,
  formatPrice,
  products,
  type DemoProduct,
} from "@lib/demo/catalog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductCard from "./product-card"
import { useDemoCart } from "./cart-context"

const buttonClass =
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-[#111111] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-40"
const eyebrowClass =
  "mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#77736d]"

export function Catalog({
  category,
  collection,
  title = "All styles",
}: {
  category?: string
  collection?: string
  title?: string
}) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category || "all")
  const [sort, setSort] = useState("newest")
  const [maxPrice, setMaxPrice] = useState("all")
  const filtered = products
    .filter(
      (product) =>
        (!category || product.category === category) &&
        (!collection || product.collection === collection) &&
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (maxPrice === "all" || product.price <= Number(maxPrice)) &&
        `${product.title} ${product.description} ${product.material}`
          .toLowerCase()
          .includes(search.toLowerCase().trim())
    )
    .sort((a, b) =>
      sort === "price_asc"
        ? a.price - b.price
        : sort === "price_desc"
        ? b.price - a.price
        : 0
    )

  function reset() {
    setSearch("")
    setSelectedCategory(category || "all")
    setSort("newest")
    setMaxPrice("all")
  }

  return (
    <section className="content-container min-h-[65vh] py-12 sm:py-20">
      <p className={eyebrowClass}>The considered wardrobe</p>
      <h1 className="text-5xl font-medium leading-none sm:text-7xl">{title}</h1>
      <p className="mt-5 max-w-xl text-sm leading-6 text-[#55504a]">
        Clean silhouettes. Tactile fabrics. Discover pieces for a wardrobe that
        moves with you.
      </p>
      <div className="my-10 grid gap-4 rounded-xl border border-black/10 bg-white/75 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-medium">
          Search styles
          <input
            type="search"
            placeholder="Try cotton or coat"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-black/20 bg-white p-3 text-sm"
          />
        </label>
        <label className="text-xs font-medium">
          Category
          <select
            aria-label="Category"
            value={selectedCategory}
            disabled={!!category}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-black/20 bg-white p-3 text-sm"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.handle} value={item.handle}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium">
          Price
          <select
            aria-label="Price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-black/20 bg-white p-3 text-sm"
          >
            <option value="all">All prices</option>
            <option value="75">Up to €75</option>
            <option value="150">Up to €150</option>
            <option value="200">Up to €200</option>
          </select>
        </label>
        <label className="text-xs font-medium">
          Sort by
          <select
            aria-label="Sort by"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-black/20 bg-white p-3 text-sm"
          >
            <option value="newest">Featured</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
          </select>
        </label>
      </div>
      <div className="mb-6 flex items-center justify-between text-xs text-[#6d6860]">
        <p aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "style" : "styles"} ·
          Illustrative prices in EUR
        </p>
        <button onClick={reset} className="underline underline-offset-4">
          Reset filters
        </button>
      </div>
      {filtered.length ? (
        <div className="grid grid-cols-1 gap-6 xsmall:grid-cols-2 small:grid-cols-3 large:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      ) : (
        <div className="copy-panel p-12 text-center">
          <h2 className="text-2xl">No styles found</h2>
          <p className="my-4 text-sm text-[#55504a]">
            Try a different search or reset your filters.
          </p>
          <button onClick={reset} className={buttonClass}>
            Show all styles
          </button>
        </div>
      )}
    </section>
  )
}

export function ProductDetail({ product }: { product: DemoProduct }) {
  const [size, setSize] = useState("")
  const [added, setAdded] = useState(false)
  const { add, ready } = useDemoCart()
  const related = products.filter(
    (item) =>
      item.handle !== product.handle && item.category === product.category
  )

  return (
    <section className="content-container py-8 sm:py-16">
      <LocalizedClientLink
        href="/store"
        className="mb-8 inline-block text-xs uppercase tracking-widest hover:underline"
      >
        ← All styles
      </LocalizedClientLink>
      <div className="grid gap-10 small:grid-cols-[1.2fr_0.8fr] small:gap-16">
        <div className="overflow-hidden rounded-2xl bg-[#f2f1ee]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[800px] w-full object-cover"
          />
        </div>
        <div className="self-start small:sticky small:top-32">
          <p className={eyebrowClass}>
            {categories.find((item) => item.handle === product.category)?.name}{" "}
            / New season
          </p>
          <h1 className="text-4xl font-medium leading-tight sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-5 text-2xl">{formatPrice(product.price)}</p>
          <p className="mt-1 text-xs text-[#77736d]">
            Illustrative demo price · EUR
          </p>
          <p className="my-8 max-w-lg text-sm leading-7 text-[#55504a]">
            {product.description}
          </p>
          <fieldset>
            <legend className="mb-3 text-xs font-semibold uppercase tracking-widest">
              Select size
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={size === option}
                  onClick={() => {
                    setSize(option)
                    setAdded(false)
                  }}
                  className={`min-h-11 min-w-12 rounded-lg border px-4 text-sm transition-colors ${
                    size === option
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-white hover:border-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            disabled={!size || !ready}
            onClick={() => {
              add(product, size)
              setAdded(true)
            }}
            className={`${buttonClass} mt-6 w-full`}
          >
            {size ? "Add to bag" : "Choose a size"}
          </button>
          <p role="status" className="mt-3 min-h-6 text-sm">
            {added && (
              <>
                Added to your demo bag.{" "}
                <LocalizedClientLink
                  href="/cart"
                  className="font-semibold underline underline-offset-4"
                >
                  View bag →
                </LocalizedClientLink>
              </>
            )}
          </p>
          <p className="mb-6 text-xs leading-5 text-[#77736d]">
            Explore the shopping experience. This demo does not accept orders or
            payments.
          </p>
          <details className="border-t border-black/10 py-5" open>
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest">
              Details & care
            </summary>
            <p className="mt-4 text-sm leading-6 text-[#55504a]">
              {product.material}. Sample product details for this demo
              catalogue. Imagery is illustrative.
            </p>
          </details>
          <details className="border-y border-black/10 py-5">
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest">
              Delivery & returns
            </summary>
            <p className="mt-4 text-sm leading-6 text-[#55504a]">
              Delivery and returns are shown for presentation only. No goods are
              dispatched.{" "}
              <LocalizedClientLink href="/shipping" className="underline">
                Read more
              </LocalizedClientLink>
            </p>
          </details>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-20">
          <p className={eyebrowClass}>Complete the wardrobe</p>
          <h2 className="mb-8 text-3xl font-medium">You may also like</h2>
          <div className="grid gap-6 xsmall:grid-cols-2 small:grid-cols-3">
            {related.slice(0, 3).map((item) => (
              <ProductCard key={item.handle} product={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function useCartSummary() {
  const cart = useDemoCart()
  const lines = cart.items.flatMap((item) => {
    const product = products.find((product) => product.handle === item.handle)
    return product ? [{ ...item, product }] : []
  })
  const subtotal = lines.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0
  )
  return { ...cart, lines, subtotal }
}

function Totals({ subtotal }: { subtotal: number }) {
  return (
    <dl className="space-y-4 text-sm">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Demo delivery</dt>
        <dd>Complimentary</dd>
      </div>
      <div className="flex justify-between border-t border-black/10 pt-5 text-lg font-semibold">
        <dt>Total</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
    </dl>
  )
}

export function DemoCart() {
  const { lines, subtotal, update, ready } = useCartSummary()
  return (
    <section className="content-container min-h-[65vh] py-12 sm:py-20">
      <p className={eyebrowClass}>Your selection</p>
      <h1 className="mb-10 text-5xl font-medium sm:text-7xl">Shopping bag</h1>
      {!ready ? (
        <p role="status">Loading your bag…</p>
      ) : !lines.length ? (
        <div className="copy-panel max-w-xl p-8 sm:p-12">
          <h2 className="text-2xl">A little room for something new.</h2>
          <p className="my-5 text-sm leading-6 text-[#55504a]">
            Your bag is empty. Explore the latest edit and find your next
            favourite piece.
          </p>
          <LocalizedClientLink href="/store" className={buttonClass}>
            Explore the edit
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid items-start gap-10 small:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            {lines.map((line) => (
              <article
                key={`${line.handle}-${line.size}`}
                className="copy-panel flex gap-4 p-4 sm:gap-6 sm:p-6"
              >
                <LocalizedClientLink
                  href={`/products/${line.handle}`}
                  className="w-24 flex-none sm:w-32"
                >
                  <img
                    src={line.product.image}
                    alt={line.product.title}
                    className="aspect-[3/4] w-full rounded-lg object-cover"
                  />
                </LocalizedClientLink>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
                  <LocalizedClientLink
                    href={`/products/${line.handle}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {line.product.title}
                  </LocalizedClientLink>
                  <p className="text-xs text-[#77736d]">
                    Size: {line.size} · {formatPrice(line.product.price)} each
                  </p>
                  <label className="text-xs">
                    Quantity{" "}
                    <select
                      aria-label={`Quantity for ${line.product.title}, ${line.size}`}
                      value={line.quantity}
                      onChange={(event) =>
                        update(
                          line.handle,
                          line.size,
                          Number(event.target.value)
                        )
                      }
                      className="ml-2 rounded border border-black/20 bg-white p-2"
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => update(line.handle, line.size, 0)}
                      className="text-xs text-[#77736d] underline underline-offset-4"
                      aria-label={`Remove ${line.product.title}, ${line.size}`}
                    >
                      Remove
                    </button>
                    <p className="text-sm font-semibold">
                      {formatPrice(line.product.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
            <LocalizedClientLink
              href="/store"
              className="inline-block text-xs uppercase tracking-widest hover:underline"
            >
              ← Continue exploring
            </LocalizedClientLink>
          </div>
          <aside className="copy-panel p-8">
            <h2 className="mb-8 text-2xl">Bag summary</h2>
            <Totals subtotal={subtotal} />
            <LocalizedClientLink
              href="/checkout"
              className={`${buttonClass} mt-8 w-full`}
            >
              Preview checkout
            </LocalizedClientLink>
            <p className="mt-4 text-xs leading-5 text-[#77736d]">
              Demo bag saved in this browser. No orders or payments are
              processed.
            </p>
          </aside>
        </div>
      )}
    </section>
  )
}

export function DemoCheckout() {
  const { lines, subtotal, ready } = useCartSummary()
  return (
    <section className="content-container min-h-[65vh] py-12 sm:py-20">
      <p className={eyebrowClass}>Experience the store</p>
      <h1 className="mb-10 text-5xl font-medium sm:text-7xl">
        Checkout preview
      </h1>
      <div className="grid items-start gap-10 small:grid-cols-2">
        <div className="copy-panel p-8 sm:p-12">
          <span aria-hidden="true" className="text-4xl">
            ◇
          </span>
          <h2 className="mt-6 text-3xl">Thanks for exploring.</h2>
          <p className="my-6 text-sm leading-7 text-[#55504a]">
            You’ve reached the end of the demo shopping experience. Checkout is
            disabled, so no payment, address or contact details are needed and
            no order will be placed.
          </p>
          <LocalizedClientLink href="/store" className={buttonClass}>
            Keep exploring
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/cart"
            className="mt-6 block text-xs underline underline-offset-4"
          >
            Back to your bag
          </LocalizedClientLink>
        </div>
        <aside className="copy-panel p-8">
          <h2 className="mb-8 text-2xl">Your edit</h2>
          {!ready ? (
            <p role="status">Loading your bag…</p>
          ) : lines.length ? (
            <>
              <ul className="mb-8 space-y-4">
                {lines.map((line) => (
                  <li
                    key={`${line.handle}-${line.size}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={line.product.image}
                      alt=""
                      className="h-16 w-14 rounded object-cover"
                    />
                    <div className="flex-1 text-sm">
                      <p>{line.product.title}</p>
                      <p className="mt-1 text-xs text-[#77736d]">
                        {line.size} · Qty {line.quantity}
                      </p>
                    </div>
                    <span className="text-sm">
                      {formatPrice(line.product.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <Totals subtotal={subtotal} />
              <p className="mt-6 text-xs text-[#77736d]">
                Illustrative prices only · Nothing has been charged.
              </p>
            </>
          ) : (
            <p className="text-sm text-[#55504a]">
              Your demo bag is empty. Add a style to preview the summary.
            </p>
          )}
        </aside>
      </div>
    </section>
  )
}

const info = {
  account: {
    title: "Your space",
    subtitle: "Account preview",
    text: "Customer accounts are disabled for this demo. You can browse the full edit and save a shopping bag in this browser without signing in. No personal details are required.",
  },
  shipping: {
    title: "Shipping & returns",
    subtitle: "Demo store",
    text: "This is a presentation store with an illustrative catalogue. No physical products are sold or shipped, and delivery estimates, returns and refunds do not apply. The complimentary delivery shown in the bag is part of the demo experience.",
  },
  terms: {
    title: "Terms",
    subtitle: "Demo store",
    text: "Edges In Motion is a demonstration storefront. Products, prices, materials and images are illustrative. Browsing and adding products to a bag does not create an order or a contract of sale. Payments and customer accounts are disabled.",
  },
  privacy: {
    title: "Privacy",
    subtitle: "Your demo experience",
    text: "The demo bag is stored locally in your browser so your selection is available when you return. This storefront has no account, address or payment forms and sends no catalogue or cart data to a commerce backend. Remove items from the bag or clear this site's browser storage to delete your saved selection.",
  },
}

export function DemoInfo({ page }: { page: string }) {
  const content = info[page as keyof typeof info]
  return (
    <section className="content-container min-h-[60vh] py-16 sm:py-24">
      <div className="copy-panel max-w-3xl p-8 sm:p-16">
        <p className={eyebrowClass}>{content.subtitle}</p>
        <h1 className="text-4xl font-medium sm:text-6xl">{content.title}</h1>
        <p className="my-8 text-sm leading-7 text-[#55504a]">{content.text}</p>
        <LocalizedClientLink href="/store" className={buttonClass}>
          Explore all styles
        </LocalizedClientLink>
      </div>
    </section>
  )
}
