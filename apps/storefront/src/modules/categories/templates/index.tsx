import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCategoryImage } from "@lib/util/category-image"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)
  const categoryImage = getCategoryImage(category)

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
      <div className="flex flex-col small:flex-row small:items-start">
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
        <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          {!categoryImage && (
            <h1 data-testid="category-page-title">{category.name}</h1>
          )}
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-3 small:grid-cols-3">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  {getCategoryImage(c) ? (
                    <LocalizedClientLink
                      href={`/categories/${c.handle}`}
                      className="group relative block h-[180px] overflow-hidden rounded-[12px] bg-[#f3f1ed]"
                    >
                      <img
                        src={getCategoryImage(c)}
                        alt={`${c.name} category`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                      <span className="absolute bottom-4 left-4 text-[18px] font-medium text-white">
                        {c.name}
                      </span>
                    </LocalizedClientLink>
                  ) : (
                    <InteractiveLink href={`/categories/${c.handle}`}>
                      {c.name}
                    </InteractiveLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
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
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
        </div>
      </div>
    </div>
  )
}
