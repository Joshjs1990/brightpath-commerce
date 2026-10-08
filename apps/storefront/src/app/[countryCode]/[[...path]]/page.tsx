import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  categories,
  collections,
  countries,
  demoPaths,
  products,
} from "@lib/demo/catalog"
import DemoHome from "@modules/demo/home"
import {
  Catalog,
  DemoCart,
  DemoCheckout,
  DemoInfo,
  ProductDetail,
} from "@modules/demo/pages"

type Params = { countryCode: string; path?: string[] }
export const dynamicParams = false

export function generateStaticParams() {
  return countries.flatMap((countryCode) =>
    demoPaths.map((path) => ({ countryCode, path }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { path = [] } = await params
  const product =
    path[0] === "products"
      ? products.find((item) => item.handle === path[1])
      : undefined
  const title =
    product?.title ||
    categories.find(
      (item) => path[0] === "categories" && item.handle === path[1]
    )?.name ||
    collections.find(
      (item) => path[0] === "collections" && item.handle === path[1]
    )?.title ||
    (
      {
        store: "Shop All",
        cart: "Shopping Bag",
        checkout: "Demo Checkout",
        account: "Account",
        shipping: "Shipping & Returns",
        terms: "Terms",
        privacy: "Privacy",
      } as Record<string, string>
    )[path[0]] ||
    "Edges In Motion Fashion Store"
  return { title, ...(product ? { description: product.description } : {}) }
}

export default async function DemoPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { countryCode, path = [] } = await params
  if (!countries.includes(countryCode)) notFound()
  if (!path.length) return <DemoHome />
  if (path.length === 1) {
    if (path[0] === "store") return <Catalog />
    if (path[0] === "cart") return <DemoCart />
    if (path[0] === "checkout") return <DemoCheckout />
    if (["account", "shipping", "terms", "privacy"].includes(path[0]))
      return <DemoInfo page={path[0]} />
  }
  if (path.length === 2) {
    if (path[0] === "products") {
      const product = products.find((item) => item.handle === path[1])
      if (product)
        return <ProductDetail key={product.handle} product={product} />
    }
    if (path[0] === "categories") {
      const category = categories.find((item) => item.handle === path[1])
      if (category)
        return (
          <Catalog
            key={category.handle}
            category={category.handle}
            title={category.name}
          />
        )
    }
    if (path[0] === "collections") {
      const collection = collections.find((item) => item.handle === path[1])
      if (collection)
        return (
          <Catalog
            key={collection.handle}
            collection={collection.handle}
            title={collection.title}
          />
        )
    }
  }
  notFound()
}
