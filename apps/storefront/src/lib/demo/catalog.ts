// The demo catalogue is bundled at build time. Nothing is fetched from Medusa.
export type DemoProduct = {
  handle: string
  title: string
  category: string
  collection: string
  price: number
  image: string
  description: string
  sizes: string[]
  material: string
}

export const defaultCountry = process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk"
export const countries = Array.from(
  new Set([defaultCountry, "dk", "gb", "us", "de", "se", "fr", "es", "it"])
)

export const categories = [
  {
    handle: "outerwear",
    name: "Outerwear",
    image: "/images/demo/essentials.jpg",
  },
  { handle: "essentials", name: "Essentials", image: "/images/demo/shirt.jpg" },
  {
    handle: "tailoring",
    name: "Tailoring",
    image: "/images/demo/tailoring.jpg",
  },
  { handle: "accessories", name: "Accessories", image: "/images/demo/bag.jpg" },
]

export const collections = [
  { handle: "new-in", title: "New In" },
  { handle: "everyday-edit", title: "The Everyday Edit" },
]

export const products: DemoProduct[] = [
  {
    handle: "sculpted-blazer",
    title: "Sculpted Blazer",
    category: "tailoring",
    collection: "new-in",
    price: 185,
    image: "/images/demo/tailoring.jpg",
    description:
      "Clean lines and considered proportions. A statement layer for an effortless day-to-night wardrobe.",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Textured wool blend",
  },
  {
    handle: "motion-tracksuit",
    title: "Motion Tracksuit",
    category: "essentials",
    collection: "everyday-edit",
    price: 65,
    image: "/images/demo/layers.jpg",
    description:
      "An easy silhouette with a soft finish. A relaxed co-ord for days on the move.",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Cotton blend",
  },
  {
    handle: "city-layers",
    title: "City Layering Jacket",
    category: "outerwear",
    collection: "new-in",
    price: 145,
    image: "/images/demo/outerwear.jpg",
    description:
      "A versatile outer layer with a relaxed shape. Built around movement, texture and everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    material: "Cotton twill",
  },
  {
    handle: "straight-denim",
    title: "Straight Leg Denim",
    category: "essentials",
    collection: "everyday-edit",
    price: 95,
    image: "/images/demo/denim.jpg",
    description:
      "A familiar staple, refined. Structured denim with a straight leg and an understated finish.",
    sizes: ["26", "28", "30", "32", "34"],
    material: "Cotton denim",
  },
  {
    handle: "essential-coat",
    title: "Essential Long Coat",
    category: "outerwear",
    collection: "everyday-edit",
    price: 220,
    image: "/images/demo/essentials.jpg",
    description:
      "A defining silhouette for cooler days. A longline coat with clean detailing and space for layering.",
    sizes: ["XS", "S", "M", "L"],
    material: "Wool blend",
  },
  {
    handle: "utility-backpack",
    title: "Utility Backpack",
    category: "accessories",
    collection: "new-in",
    price: 85,
    image: "/images/demo/bag.jpg",
    description:
      "An everyday companion with a purposeful shape. Carry the essentials while keeping your hands free.",
    sizes: ["One size"],
    material: "Durable woven canvas",
  },
  {
    handle: "studio-tee",
    title: "Studio Cotton Tee",
    category: "essentials",
    collection: "everyday-edit",
    price: 40,
    image: "/images/demo/shirt.jpg",
    description:
      "The foundation of a considered wardrobe. Soft cotton, a relaxed fit and a clean neckline.",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Cotton jersey",
  },
  {
    handle: "wide-leg-trousers",
    title: "Wide Leg Trousers",
    category: "tailoring",
    collection: "new-in",
    price: 135,
    image: "/images/demo/dress.jpg",
    description:
      "An expressive silhouette with an easy drape. A modern piece for moments that call for something special.",
    sizes: ["XS", "S", "M", "L"],
    material: "Lightweight woven blend",
  },
]

// One illustrative EUR price list across all demo countries; no live exchange rates.
export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount)

export const demoPaths: string[][] = [
  [],
  ["store"],
  ["cart"],
  ["checkout"],
  ["account"],
  ["shipping"],
  ["terms"],
  ["privacy"],
  ...products.map((product) => ["products", product.handle]),
  ...categories.map((category) => ["categories", category.handle]),
  ...collections.map((collection) => ["collections", collection.handle]),
]
