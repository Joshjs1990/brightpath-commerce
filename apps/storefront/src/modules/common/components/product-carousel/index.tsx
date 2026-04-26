"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"

interface CarouselProps {
  items: any[]
  itemsPerView?: number
  className?: string
  title?: string
  children: (item: any) => React.ReactNode
}

export default function ProductCarousel({
  items,
  itemsPerView = 4,
  className = "",
  title,
  children,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, items.length])

  const effectiveItemsPerView = isMobile ? 2 : itemsPerView
  const visibleItems = items.slice(currentIndex, currentIndex + effectiveItemsPerView)
  const canScrollNext = currentIndex + effectiveItemsPerView < items.length

  const handlePrev = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setIsAutoPlay(false)
    if (canScrollNext) {
      setCurrentIndex((prev) => Math.min(prev + 1, items.length - effectiveItemsPerView))
    }
  }

  return (
    <section className={`py-12 small:py-16 ${className}`}>
      {title && (
        <div className="content-container mb-8 flex items-center justify-between">
          <h2 className="text-2xl small:text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <LocalizedClientLink
            href="/store"
            className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-600 hover:text-gray-900 transition-colors"
          >
            View All →
          </LocalizedClientLink>
        </div>
      )}

      <div className="content-container">
        <div className="relative group">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-500 ease-out">
              {visibleItems.map((item, index) => (
                <div
                  key={`${currentIndex}-${index}`}
                  className="flex-shrink-0 w-full small:w-[calc(25%-1.5rem)] md:w-[calc(25%-1.5rem)]"
                >
                  <div className="group/card rounded-xl overflow-hidden bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-lg-modern">
                    {children(item)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 small:-translate-x-12 z-10 p-2 rounded-lg bg-white border border-gray-200 shadow-md-modern hover:shadow-lg-modern hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed small:opacity-0 small:group-hover:opacity-100 small:translate-x-0"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-gray-900" />
          </button>

          <button
            onClick={handleNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 small:translate-x-12 z-10 p-2 rounded-lg bg-white border border-gray-200 shadow-md-modern hover:shadow-lg-modern hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed small:opacity-0 small:group-hover:opacity-100 small:-translate-x-0"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-gray-900" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(items.length / effectiveItemsPerView) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlay(false)
                    setCurrentIndex(index * effectiveItemsPerView)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === Math.floor(currentIndex / effectiveItemsPerView)
                      ? "w-8 bg-gray-900"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4 text-xs text-gray-500">
            {isAutoPlay && "Auto-playing... hover to pause"}
          </div>
        </div>
      </div>
    </section>
  )
}
