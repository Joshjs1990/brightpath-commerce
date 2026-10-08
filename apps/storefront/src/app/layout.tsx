import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { DemoCartProvider } from "@modules/demo/cart-context"
import DemoNav from "@modules/demo/nav"
import DemoFooter from "@modules/demo/footer"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Edges In Motion",
    template: "%s | Edges In Motion",
  },
  description:
    "Edges In Motion is a premium fashion store for sharp silhouettes, abstract textures, and modern pieces with a future-facing edge.",
  openGraph: {
    title: "Edges In Motion",
    description:
      "Premium fashion for sharp silhouettes, abstract textures, and modern pieces with a future-facing edge.",
    siteName: "Edges In Motion",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edges In Motion",
    description:
      "Premium fashion for sharp silhouettes, abstract textures, and modern pieces with a future-facing edge.",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className="premium-grid bg-white text-[#111111] antialiased">
        <DemoCartProvider>
          <DemoNav />
          <main className="relative">{props.children}</main>
          <DemoFooter />
        </DemoCartProvider>
      </body>
    </html>
  )
}
