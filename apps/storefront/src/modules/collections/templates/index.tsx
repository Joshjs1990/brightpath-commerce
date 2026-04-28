import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"

export default async function CollectionTemplate({
  sortBy,
  collection,
  page,
  category,
  priceMin,
  priceMax,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  category?: string
  priceMin?: string
  priceMax?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const categories = await listCategories({ limit: 100 }).catch(() => [])
  const filterCategories =
    categories
      ?.filter((item) => !item.parent_category && (item.products?.length ?? 0) > 0)
      .map((item) => ({
        id: item.id,
        name: item.name,
        handle: item.handle,
        productCount: item.products?.length ?? 0,
      })) ?? []
  const selectedCategory = categories?.find((item) => item.handle === category)

  return (
    <div className="content-container flex flex-col gap-6 py-6 small:flex-row small:items-start">
      <RefinementList
        sortBy={sort}
        categories={filterCategories}
        selectedCategory={category}
        priceMin={priceMin}
        priceMax={priceMax}
      />
      <div className="w-full">
        <h1 className="sr-only">{collection.title}</h1>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            categoryId={selectedCategory?.id}
            priceMin={priceMin}
            priceMax={priceMax}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
