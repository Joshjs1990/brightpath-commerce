import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { MagnifyingGlass, User, Heart } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const mainLinks = [
  { label: "Shop", href: "/store" },
  { label: "New In", href: "/store" },
  { label: "Sale", href: "/store" },
  { label: "Outlet", href: "/store" },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group bg-white/98 backdrop-blur-md border-b border-gray-200/50">
      <div className="hidden small:block border-b border-gray-200/50 bg-gray-50">
        <div className="content-container flex h-8 items-center justify-between text-[10px] font-medium uppercase tracking-[0.14em] text-gray-600">
          <span>✓ Complimentary shipping over $150</span>
          <span>Spring edit now live</span>
        </div>
      </div>
      <header className="relative h-[76px] mx-auto duration-200">
        <nav className="content-container grid h-full w-full grid-cols-[1fr_auto_1fr] items-center text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-900">
          <div className="flex h-full items-center gap-8">
            <div className="h-full small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <div className="hidden small:flex h-full items-center gap-8">
              {mainLinks.map((link) => (
                <LocalizedClientLink
                  key={link.label}
                  href={link.href}
                  className="relative flex h-full items-center group/nav pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          <div className="flex h-full items-center justify-center">
            <LocalizedClientLink
              href="/"
              className="text-lg font-bold leading-none tracking-[0.25em] hover:opacity-70 transition-opacity"
              data-testid="nav-store-link"
            >
              Brightpath
            </LocalizedClientLink>
          </div>

          <div className="flex h-full items-center justify-end gap-2 small:gap-4">
            <LocalizedClientLink
              className="hidden small:flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm-modern"
              href="/store"
              aria-label="Search products"
            >
              <MagnifyingGlass className="h-4 w-4" />
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hidden small:flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm-modern"
              href="/account"
              data-testid="nav-account-link"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hidden small:flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm-modern"
              href="/store"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
            </LocalizedClientLink>
            <div className="h-full">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex h-full items-center hover:text-ui-fg-base"
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
