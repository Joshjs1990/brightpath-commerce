import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCategories } from "@lib/data/categories"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  category,
  priceMin,
  priceMax,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  category?: string
  priceMin?: string
  priceMax?: string
  countryCode: string
}) => {
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
    <div
      className="content-container flex flex-col gap-6 py-6 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        categories={filterCategories}
        selectedCategory={category}
        priceMin={priceMin}
        priceMax={priceMax}
      />
      <div className="w-full">
        <h1 className="sr-only" data-testid="store-page-title">
          All products
        </h1>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
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

export default StoreTemplate
