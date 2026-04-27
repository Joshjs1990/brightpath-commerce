import { HttpTypes } from "@medusajs/types"

const fallbackCategoryImages: Record<string, string> = {
  shirts:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
  sweatshirts:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
  pants:
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
  merch:
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
}

export const getCategoryImage = (
  category?: Pick<
    HttpTypes.StoreProductCategory,
    "handle" | "metadata" | "name"
  > | null
) => {
  const metadata = category?.metadata as Record<string, unknown> | null
  const image =
    metadata?.image_url ||
    metadata?.image ||
    metadata?.thumbnail ||
    metadata?.hero_image

  if (typeof image === "string" && image.trim()) {
    return image
  }

  return category?.handle ? fallbackCategoryImages[category.handle] : undefined
}

