import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src="/images/edges-in-motion-hero.png"
          alt="Abstract black and white fashion campaign"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:84px_84px] opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.52)_36%,rgba(0,0,0,0.10)_100%)]" />
      </div>
      <div className="content-container relative z-10 flex min-h-[calc(100vh-64px)] flex-col justify-end pb-10 pt-28 small:pb-16">
        <div className="grid gap-10 small:grid-cols-[1.1fr_0.9fr] small:items-end">
          <div className="reveal-up max-w-[900px]">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/55">
              Abstract fashion system 01
            </p>
            <h1 className="max-w-[900px] text-[58px] font-semibold leading-[0.9] tracking-normal text-white small:text-[118px]">
              Edges In Motion
            </h1>
            <div className="mt-7 h-px w-24 bg-white/70" />
          </div>
          <div className="reveal-up delay-1 max-w-[420px] justify-self-start small:justify-self-end">
            <div className="flex flex-wrap gap-3">
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-11 items-center justify-center rounded-[10px] bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-white/82"
              >
                Shop Now
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-11 items-center justify-center rounded-[10px] border border-white/45 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
              >
                New In
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
