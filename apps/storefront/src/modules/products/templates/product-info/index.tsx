import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="mx-auto flex flex-col gap-y-4 lg:max-w-[500px]">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736d] transition-colors hover:text-[#111111]"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-[32px] font-medium leading-none tracking-normal text-[#111111] small:text-[40px]"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="whitespace-pre-line text-[14px] leading-6 text-[#55504a]"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
