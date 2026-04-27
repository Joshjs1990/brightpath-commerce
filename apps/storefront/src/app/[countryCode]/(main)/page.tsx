import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CarouselRail from "@modules/common/components/carousel-rail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getCategoryImage } from "@lib/util/category-image"

export const metadata: Metadata = {
  title: "Brightpath Fashion Store",
  description:
    "A modern editorial fashion storefront built with Next.js and Medusa.",
}

const fallbackCategoryTiles = [
  {
    title: "Outerwear",
    label: "Transitional layers",
    href: "/store",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tailoring",
    label: "Sharp daily pieces",
    href: "/store",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Accessories",
    label: "Considered finishing",
    href: "/store",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
  },
]

const campaignImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=80",
]

const hasProducts = (category: Awaited<ReturnType<typeof listCategories>>[number]) => {
  return (category.products?.length ?? 0) > 0
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  const categories = await listCategories({ limit: 12 })

  if (!collections || !region) {
    return null
  }

  const {
    response: { products: latestProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 8,
    },
  })

  const categoriesWithProducts = categories?.filter(hasProducts) ?? []
  const homepageCategories = categoriesWithProducts.length
    ? categoriesWithProducts
    : categories ?? []

  const categoryTiles =
    homepageCategories
      ?.filter((category) => !category.parent_category)
      .slice(0, 3)
      .map((category) => ({
        title: category.name,
        label:
          typeof category.metadata?.label === "string"
            ? category.metadata.label
            : "Shop category",
        href: `/categories/${category.handle}`,
        image: getCategoryImage(category),
      }))
      .filter((category) => category.image) ?? fallbackCategoryTiles
  const categoryMarquee =
    (categoriesWithProducts.length ? categoriesWithProducts : categories)
      ?.slice(0, 6)
      .map((category) => category.name)
      .join(" / ") || "New In / Essentials / Sale / Outerwear / Accessories"

  return (
    <>
      <Hero />
      <section className="border-b border-[#111111]/10 bg-white">
        <div className="content-container grid gap-8 py-16 small:grid-cols-[0.85fr_1.15fr] small:py-24">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#77736d]">
              Wardrobe language
            </p>
            <h2 className="max-w-[620px] text-[38px] font-medium leading-[1] tracking-normal small:text-[64px]">
              Minimal forms, tactile fabrics, exact proportions.
            </h2>
          </div>
          <div className="grid content-end gap-8 small:grid-cols-2">
            <p className="max-w-[420px] text-[15px] leading-7 text-[#55504a]">
              Clean silhouettes, textured neutrals, and everyday statement
              pieces selected for wardrobes that move from day to night.
            </p>
            <LocalizedClientLink
              href="/store"
              className="inline-flex h-12 w-fit items-center justify-center self-end border border-[#111111] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-[#111111] hover:text-white"
            >
              Explore All
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f1ed] py-6">
        <div className="flex overflow-hidden whitespace-nowrap text-[42px] font-medium uppercase leading-none tracking-normal text-[#111111] small:text-[86px]">
          <div className="animate-[marquee_28s_linear_infinite]">
            {categoryMarquee} /
          </div>
          <div
            className="animate-[marquee_28s_linear_infinite]"
            aria-hidden="true"
          >
            {categoryMarquee} /
          </div>
        </div>
      </section>

      <section className="content-container grid gap-4 py-16 small:grid-cols-3 small:py-24">
        {categoryTiles.map((category) => (
          <LocalizedClientLink
            href={category.href}
            key={category.title}
            className="group relative min-h-[480px] overflow-hidden bg-[#e7e1d7]"
          >
            <img
              src={category.image!}
              alt={`${category.title} collection`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                {category.label}
              </p>
              <h3 className="text-[34px] font-medium leading-none">
                {category.title}
              </h3>
            </div>
          </LocalizedClientLink>
        ))}
      </section>

      <section className="bg-white">
        {latestProducts?.length > 0 && (
          <div className="content-container border-t border-[#111111]/10 py-12 small:py-24">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#77736d]">
                  Latest arrivals
                </p>
                <h2 className="text-[34px] font-medium leading-none small:text-[54px]">
                  Fresh in store
                </h2>
              </div>
              <LocalizedClientLink
                href="/store"
                className="text-[12px] font-semibold uppercase tracking-[0.14em] underline underline-offset-8"
              >
                View all
              </LocalizedClientLink>
            </div>
            <CarouselRail className="-mx-6 px-6 small:mx-0 small:px-0">
              {latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[76vw] max-w-[340px] flex-none snap-start small:w-[31vw] large:w-[23.5%]"
                >
                  <ProductPreview
                    product={product}
                    region={region}
                    isFeatured
                  />
                </div>
              ))}
            </CarouselRail>
          </div>
        )}
        {collections.length > 0 && (
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        )}
      </section>

      <section className="bg-white py-10 small:py-20">
        <div className="content-container grid gap-4 small:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-between gap-10 rounded-[22px] border border-black/10 bg-white/70 p-6 text-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.10)] backdrop-blur-2xl small:rounded-[28px] small:p-10">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#77736d]">
                Campaign
              </p>
              <h2 className="text-[40px] font-medium leading-none small:text-[70px]">
                Built for movement, styled for stillness.
              </h2>
              <p className="mt-6 max-w-[360px] text-[14px] leading-6 text-[#55504a]">
                Layered glass, stark silhouettes, and image-led commerce with
                enough edge to feel current.
              </p>
            </div>
            <LocalizedClientLink
              href="/store"
              className="inline-flex h-11 w-fit items-center justify-center rounded-[10px] border border-black/10 bg-white/70 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-colors hover:bg-[#111111] hover:text-white"
            >
              View Edit
            </LocalizedClientLink>
          </div>
          <CarouselRail
            className="-mx-6 px-6 small:mx-0 small:px-0"
            trackClassName="small:grid small:min-h-[560px] small:grid-cols-3 small:overflow-visible small:pb-0"
            controlsClassName="small:hidden"
          >
            {campaignImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Campaign look ${index + 1}`}
                className="h-[360px] w-[78vw] flex-none snap-start rounded-[22px] border border-black/10 bg-[#f3f1ed] object-contain shadow-[0_24px_70px_rgba(0,0,0,0.12)] small:h-full small:min-h-[520px] small:w-full small:rounded-[28px] small:object-cover"
              />
            ))}
          </CarouselRail>
        </div>
      </section>
    </>
  )
}
