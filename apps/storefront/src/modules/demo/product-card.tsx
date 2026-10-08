import { formatPrice, type DemoProduct } from "@lib/demo/catalog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ProductCard({ product }: { product: DemoProduct }) {
  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block h-full"
    >
      <div className="premium-product-card flex h-full flex-col overflow-hidden rounded-[18px] transition-transform duration-500 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-[#f2f1ee]">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-lg bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-xl">
            New season
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="text-sm font-semibold">{product.title}</h3>
          <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3">
            <span>{formatPrice(product.price)}</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
