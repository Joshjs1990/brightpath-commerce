import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <div data-testid="product-wrapper" className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-100 bg-white hover:border-gray-300 transition-all duration-300 hover:shadow-lg-modern">
        <div className="relative overflow-hidden bg-gray-50 flex-1">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          {isFeatured && (
            <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-[0.12em]">
              Featured
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <Text
              className="font-bold text-gray-900 text-sm leading-5 line-clamp-2"
              data-testid="product-title"
            >
              {product.title}
            </Text>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-gray-500 font-semibold">
              New season
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            <div className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
              →
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
