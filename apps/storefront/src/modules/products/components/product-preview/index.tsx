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
      className="group block h-full"
    >
      <div
        data-testid="product-wrapper"
        className="premium-product-card flex h-full flex-col overflow-hidden rounded-[18px] transition-all duration-500 ease-out hover:-translate-y-2"
      >
        <div className="relative aspect-square overflow-hidden bg-[#f2f1ee]/80">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            fit="cover"
            className="!aspect-square bg-transparent transition-transform duration-700 group-hover:scale-[1.035]"
          />
          {isFeatured && (
            <div className="absolute left-3 top-3 rounded-[9px] border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              Featured
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div>
            <Text
              className="line-clamp-2 text-sm font-semibold leading-5 text-[#111111]"
              data-testid="product-title"
            >
              {product.title}
            </Text>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6d6860]">
              New season
            </p>
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/55 text-xs text-[#76716b] transition-all duration-300 group-hover:border-black/20 group-hover:bg-black group-hover:text-white">
              →
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
