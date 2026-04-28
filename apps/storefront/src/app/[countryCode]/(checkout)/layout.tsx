import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EdgesInMotionLogo from "@modules/common/icons/edges-in-motion-logo"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full min-h-screen bg-white text-[#111111]">
      <div className="sticky top-0 z-40 border-b border-black/10 bg-white/86 backdrop-blur-2xl">
        <nav className="content-container flex h-[72px] items-center justify-between gap-3">
          <LocalizedClientLink
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/60 transition-colors hover:text-black"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex h-10 items-center gap-2 rounded-[10px] border border-black/10 bg-white/70 px-3 text-[12px] font-black uppercase tracking-[0.16em] text-black shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-colors hover:bg-white"
            data-testid="store-link"
          >
            <EdgesInMotionLogo className="h-5 w-5" />
            <span>Edges In Motion</span>
          </LocalizedClientLink>
          <div className="flex flex-1 basis-0 justify-end">
            <span className="hidden h-10 items-center rounded-[10px] border border-black/10 bg-white/55 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55 backdrop-blur-xl small:inline-flex">
              Secure checkout
            </span>
          </div>
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="content-container flex flex-col gap-3 border-t border-black/10 py-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 small:flex-row small:items-center small:justify-between">
        <span>Edges In Motion checkout</span>
        <span>Private payment processing</span>
      </div>
    </div>
  )
}
