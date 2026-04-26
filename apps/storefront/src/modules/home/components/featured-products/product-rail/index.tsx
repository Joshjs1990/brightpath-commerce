import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container border-t border-[#111111]/10 py-14 small:py-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#77736d]">
            Featured selection
          </p>
          <h2 className="text-[34px] font-medium leading-none small:text-[54px]">
            {collection.title}
          </h2>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-12 small:grid-cols-4 small:gap-x-5 small:gap-y-16">
        {pricedProducts &&
          pricedProducts.slice(0, 8).map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
