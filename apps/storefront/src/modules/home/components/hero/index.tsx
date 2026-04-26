import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552062407-c551eeda4bae?auto=format&fit=crop&w=2200&q=85"
          alt="Modern fashion collection"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50" />
      </div>
      <div className="content-container relative z-10 flex min-h-[calc(100vh-76px)] flex-col justify-end pb-12 pt-32 small:pb-20">
        <div className="grid gap-12 small:grid-cols-[1.2fr_0.8fr] small:items-end">
          <div className="max-w-[840px]">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/60 animate-fade-in-right">
              Spring Collection 2026
            </p>
            <h1 className="max-w-[900px] text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white mb-2 animate-fade-in-right" style={{animationDelay: '0.1s'}}>
              Refined
              <span className="block text-accent-300">Simplicity</span>
            </h1>
            <div className="w-12 h-1 bg-gradient-to-r from-accent-400 to-accent-300 mt-6 mb-8"></div>
          </div>
          <div className="max-w-[420px] justify-self-start small:justify-self-end">
            <p className="mb-8 text-base leading-7 text-white/80">
              Elevated essentials for the modern wardrobe. Clean lines, thoughtful details, and timeless pieces built to last.
            </p>
            <div className="flex flex-wrap gap-4">
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-13 items-center justify-center bg-white px-8 text-xs font-bold uppercase tracking-[0.16em] text-black transition-all hover:shadow-lg-modern hover:scale-105 rounded-lg"
              >
                Shop Now
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store"
                className="inline-flex h-13 items-center justify-center border-2 border-white/60 px-8 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all hover:border-white hover:bg-white/10 backdrop-blur-sm rounded-lg"
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
