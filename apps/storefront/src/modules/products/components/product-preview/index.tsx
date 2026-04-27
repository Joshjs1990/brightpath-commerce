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
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        data-testid="product-wrapper"
        className="premium-panel flex flex-col overflow-hidden rounded-[16px] transition-all duration-500 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]"
      >
        <div className="relative aspect-square overflow-hidden bg-[#f4f2ee]">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            fit="cover"
            className="!aspect-square bg-transparent"
          />
          {isFeatured && (
            <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-[0.12em]">
              Featured
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div>
            <Text
              className="font-bold text-gray-900 text-sm leading-5 line-clamp-2"
              data-testid="product-title"
            >
              {product.title}
            </Text>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-gray-500 font-semibold">
              New season
            </p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
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
