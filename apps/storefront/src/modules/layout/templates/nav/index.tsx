import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { MagnifyingGlass, User, Heart } from "@medusajs/icons"
import BrightpathLogo from "@modules/common/icons/brightpath-logo"
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
    <div className="sticky inset-x-0 top-0 z-50 border-b border-black/10 bg-white/82 backdrop-blur-xl">
      <header className="relative mx-auto h-[64px] duration-200">
        <nav className="content-container grid h-full w-full grid-cols-[1fr_auto_1fr] items-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111111]">
          <div className="flex h-full items-center gap-5">
            <div className="h-full small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <div className="hidden h-10 items-center gap-1 rounded-[10px] border border-black/10 bg-white/60 px-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] small:flex">
              {mainLinks.map((link) => (
                <LocalizedClientLink
                  key={link.label}
                  href={link.href}
                  className="relative flex h-7 items-center rounded-[7px] px-2.5 after:absolute after:bottom-1 after:left-2.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:bg-black/[0.04] hover:after:w-[calc(100%-20px)]"
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          <div className="flex h-full items-center justify-center">
            <LocalizedClientLink
              href="/"
              className="flex h-10 items-center gap-2 rounded-[10px] border border-white/60 bg-white/70 px-2.5 text-[13px] font-semibold leading-none tracking-[0.16em] shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-opacity hover:opacity-65 small:gap-2.5 small:border-black/10 small:bg-white/60 small:px-3.5 small:text-[16px] small:tracking-[0.22em]"
              data-testid="nav-store-link"
            >
              <BrightpathLogo className="h-5 w-5 small:h-6 small:w-6" />
              <span>Brightpath</span>
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
