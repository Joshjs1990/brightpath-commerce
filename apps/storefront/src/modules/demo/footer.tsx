import { categories, collections } from "@lib/demo/catalog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function DemoFooter() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container">
        <div className="grid gap-12 py-16 small:grid-cols-[1fr_1.4fr] small:py-24">
          <div className="max-w-[520px]">
            <LocalizedClientLink
              href="/"
              className="text-xl font-bold uppercase tracking-[0.25em]"
            >
              Edges In Motion
            </LocalizedClientLink>
            <p className="mt-8 text-2xl font-bold leading-tight small:text-3xl">
              Refined essentials for modern living.
            </p>
            <p className="mt-6 max-w-[360px] text-sm leading-6 text-gray-600">
              Clean silhouettes, tactile fabrics, and considered pieces for a
              wardrobe in motion.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm leading-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Categories
              </h2>
              {categories.map((category) => (
                <LocalizedClientLink
                  key={category.handle}
                  href={`/categories/${category.handle}`}
                  className="mb-2 block hover:underline"
                >
                  {category.name}
                </LocalizedClientLink>
              ))}
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Collections
              </h2>
              {collections.map((collection) => (
                <LocalizedClientLink
                  key={collection.handle}
                  href={`/collections/${collection.handle}`}
                  className="mb-2 block hover:underline"
                >
                  {collection.title}
                </LocalizedClientLink>
              ))}
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Explore
              </h2>
              {[
                ["Account", "/account"],
                ["Shopping Bag", "/cart"],
                ["Shipping & Returns", "/shipping"],
              ].map(([name, href]) => (
                <LocalizedClientLink
                  key={href}
                  href={href}
                  className="mb-2 block hover:underline"
                >
                  {name}
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-gray-200 py-8 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Edges In Motion · Demo catalogue</p>
          <div className="flex gap-6">
            <LocalizedClientLink href="/terms" className="hover:underline">
              Terms
            </LocalizedClientLink>
            <LocalizedClientLink href="/privacy" className="hover:underline">
              Privacy
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
