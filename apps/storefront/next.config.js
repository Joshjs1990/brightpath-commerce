/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  // Static hosting has no image optimisation server. All demo images are local.
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}
