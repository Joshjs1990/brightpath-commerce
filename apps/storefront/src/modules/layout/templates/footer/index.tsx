import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@modules/common/components/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white text-gray-900 w-full">
      <div className="content-container flex flex-col w-full">
        <div className="grid gap-12 py-16 small:grid-cols-[1fr_1.4fr] small:py-24">
          <div className="max-w-[520px]">
            <LocalizedClientLink
              href="/"
              className="text-xl font-bold uppercase tracking-[0.25em] text-gray-900 hover:opacity-70 transition-opacity"
            >
              Brightpath
            </LocalizedClientLink>
            <p className="mt-8 text-2xl small:text-3xl font-bold leading-tight text-gray-900">
              Refined essentials for modern living.
            </p>
            <p className="mt-6 max-w-[360px] text-sm leading-6 text-gray-600">
              Thoughtfully curated collections, sustainable practices, and timeless pieces for those who value quality over quantity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm leading-6 small:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-gray-700"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "text-gray-700 hover:text-gray-900 transition-colors font-medium",
                            children && "font-semibold",
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="text-gray-600 hover:text-gray-900 transition-colors text-xs"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-gray-700", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-xs"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Support
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-gray-700">
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-xs"
                  >
                    Account
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-xs"
                  >
                    Cart
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-xs"
                  >
                    Shipping & Returns
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 border-t border-gray-200 py-8 text-gray-600 small:flex-row small:justify-between">
          <Text className="text-xs">
            © {new Date().getFullYear()} Brightpath. All rights reserved.
          </Text>
          <div className="flex gap-6 text-xs uppercase tracking-[0.12em] text-gray-600 hover:text-gray-900 transition-colors">
            <span className="cursor-pointer hover:text-gray-900">Instagram</span>
            <span className="cursor-pointer hover:text-gray-900">Terms</span>
            <span className="cursor-pointer hover:text-gray-900">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
