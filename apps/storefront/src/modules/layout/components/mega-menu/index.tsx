import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCategoryImage } from "@lib/util/category-image"

type MegaMenuProps = {
  categories: HttpTypes.StoreProductCategory[]
}

const MegaMenu = ({ categories }: MegaMenuProps) => {
  return (
    <div className="group/menu relative flex h-7 items-center">
      <button
        type="button"
        className="relative flex h-7 items-center rounded-[7px] px-2.5 text-[11px] font-semibold uppercase leading-none tracking-[0.12em] after:absolute after:bottom-1 after:left-2.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover/menu:bg-black/[0.04] group-hover/menu:after:w-[calc(100%-20px)]"
      >
        Shop By
      </button>
      <div className="pointer-events-none absolute left-0 top-full z-[60] w-[min(920px,calc(100vw-48px))] pt-4 opacity-0 transition duration-150 group-hover/menu:pointer-events-auto group-hover/menu:opacity-100">
        <div className="rounded-[16px] border border-black/10 bg-white/[0.985] p-3 shadow-[0_32px_100px_rgba(0,0,0,0.16)] backdrop-blur-xl">
          <div className="grid gap-3 small:grid-cols-[0.65fr_1.35fr]">
            <div className="flex min-h-[280px] flex-col justify-between rounded-[12px] bg-[#111111] p-5 text-white">
              <div>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Browse categories
                </p>
                <h3 className="max-w-[260px] text-[34px] font-medium normal-case leading-none tracking-normal">
                  Shop the edit by silhouette.
                </h3>
              </div>
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-10 w-fit items-center rounded-[10px] border border-white/25 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black"
              >
                Shop All
              </LocalizedClientLink>
            </div>
            <div className="grid gap-3 small:grid-cols-2">
              {categories.slice(0, 4).map((category) => {
                const image = getCategoryImage(category)

                return (
                  <LocalizedClientLink
                    key={category.id}
                    href={`/categories/${category.handle}`}
                    className="group/category relative min-h-[136px] overflow-hidden rounded-[12px] bg-[#f3f1ed]"
                  >
                    {image && (
                      <img
                        src={image}
                        alt={`${category.name} category`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/category:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
                        {(category.products?.length ?? 0).toString()} styles
                      </p>
                      <h4 className="text-[22px] font-medium normal-case leading-none tracking-normal">
                        {category.name}
                      </h4>
                    </div>
                  </LocalizedClientLink>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu
