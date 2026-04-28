import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import { MagnifyingGlass, User, Heart } from "@medusajs/icons"
import EdgesInMotionLogo from "@modules/common/icons/edges-in-motion-logo"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import MegaMenu from "@modules/layout/components/mega-menu"

const fallbackLinks = [{ label: "Shop All", href: "/store" }]

export default async function Nav() {
  const [regions, locales, currentLocale, categories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories({ limit: 24 }).catch(() => []),
  ])

  const menuCategories =
    categories
      ?.filter((category) => (category.products?.length ?? 0) > 0)
      .slice(0, 4)

  const categoryLinks =
    menuCategories
      .map((category) => ({
        label: category.name,
        href: `/categories/${category.handle}`,
      })) ?? []

  const mainLinks =
    categoryLinks.length > 0 ? [...fallbackLinks, ...categoryLinks] : fallbackLinks

  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b border-black/10 bg-white/[0.78] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] backdrop-blur-2xl">
      <header className="relative mx-auto h-[64px] duration-200">
        <nav className="content-container grid h-full w-full grid-cols-[1fr_auto_1fr] items-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111111]">
          <div className="flex h-full items-center gap-5">
            <div className="h-full small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                categoryLinks={mainLinks}
              />
            </div>
            <div className="hidden h-10 items-center gap-1 rounded-[10px] border border-black/10 bg-white/60 px-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] small:flex">
              {menuCategories.length > 0 && (
                <MegaMenu categories={menuCategories} />
              )}
              <LocalizedClientLink
                href="/store"
                className="relative flex h-7 items-center rounded-[7px] px-2.5 text-[11px] font-semibold uppercase leading-none tracking-[0.12em] after:absolute after:bottom-1 after:left-2.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:bg-black/[0.04] hover:after:w-[calc(100%-20px)]"
              >
                Shop All
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex h-full items-center justify-center">
            <LocalizedClientLink
              href="/"
              className="flex h-10 items-center gap-2 rounded-[10px] border border-black/10 bg-white/60 px-3 text-[11px] font-semibold uppercase leading-none tracking-[0.12em] shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-colors hover:bg-white/80"
              data-testid="nav-store-link"
            >
              <EdgesInMotionLogo className="h-5 w-5" />
              <span>Edges In Motion</span>
            </LocalizedClientLink>
          </div>

          <div className="flex h-full items-center justify-end gap-1.5">
            <div className="hidden h-10 items-center gap-1 rounded-[10px] border border-black/10 bg-white/60 px-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] small:flex">
              <LocalizedClientLink
                className="flex h-7 w-7 items-center justify-center rounded-[7px] transition-colors hover:bg-black/[0.04]"
                href="/store"
                aria-label="Search products"
              >
                <MagnifyingGlass className="h-3.5 w-3.5" />
              </LocalizedClientLink>
              <LocalizedClientLink
                className="flex h-7 w-7 items-center justify-center rounded-[7px] transition-colors hover:bg-black/[0.04]"
                href="/account"
                data-testid="nav-account-link"
                aria-label="Account"
              >
                <User className="h-3.5 w-3.5" />
              </LocalizedClientLink>
              <LocalizedClientLink
                className="flex h-7 w-7 items-center justify-center rounded-[7px] transition-colors hover:bg-black/[0.04]"
                href="/store"
                aria-label="Wishlist"
              >
                <Heart className="h-3.5 w-3.5" />
              </LocalizedClientLink>
            </div>
            <div className="hidden h-10 items-center rounded-[10px] border border-black/10 bg-white/60 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)] small:flex">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex h-full items-center text-[11px] font-semibold hover:text-ui-fg-base"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
            <div className="flex h-10 items-center rounded-[10px] border border-white/60 bg-white/70 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl small:hidden">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex h-full items-center text-[11px] font-semibold uppercase tracking-[0.12em]"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
