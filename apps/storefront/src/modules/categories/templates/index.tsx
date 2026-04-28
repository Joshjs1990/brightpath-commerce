import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { getCategoryImage } from "@lib/util/category-image"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  selectedFilterCategory,
  priceMin,
  priceMax,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  selectedFilterCategory?: string
  priceMin?: string
  priceMax?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const categoryImage = getCategoryImage(category)
  const filterCategories =
    category.category_children
      ?.filter((item) => (item.products?.length ?? 0) > 0)
      .map((item) => ({
        id: item.id,
        name: item.name,
        handle: item.handle,
        productCount: item.products?.length ?? 0,
      })) ?? []
  const selectedCategory = category.category_children?.find(
    (item) => item.handle === selectedFilterCategory
  )

  return (
    <div
      className="content-container py-6"
      data-testid="category-container"
    >
      {categoryImage && (
        <div className="relative mb-10 h-[300px] overflow-hidden rounded-[16px] bg-[#f3f1ed] small:h-[420px]">
          <img
            src={categoryImage}
            alt={`${category.name} category`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
          <div className="absolute bottom-0 left-0 p-6 text-white small:p-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Category
            </p>
            <h1
              className="text-[44px] font-medium leading-none small:text-[76px]"
              data-testid="category-page-title"
            >
              {category.name}
            </h1>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6 small:flex-row small:items-start">
        <RefinementList
          sortBy={sort}
          categories={filterCategories}
          selectedCategory={selectedFilterCategory}
          priceMin={priceMin}
          priceMax={priceMax}
          data-testid="sort-by-container"
        />
        <div className="w-full">
        {!categoryImage && (
          <h1 className="sr-only" data-testid="category-page-title">
            {category.name}
          </h1>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={selectedCategory?.id ?? category.id}
            priceMin={priceMin}
            priceMax={priceMax}
            countryCode={countryCode}
          />
        </Suspense>
        </div>
      </div>
    </div>
  )
}
