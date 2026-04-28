import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop Edges In Motion for premium fashion, sharp everyday layers, and future-facing statement pieces.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    category?: string
    priceMin?: string
    priceMax?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, category, priceMin, priceMax } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      category={category}
      priceMin={priceMin}
      priceMax={priceMax}
      countryCode={params.countryCode}
    />
  )
}
