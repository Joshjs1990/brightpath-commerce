"use client"

import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { MouseEvent, PointerEvent, ReactNode, useRef, useState } from "react"

type CarouselRailProps = {
  children: ReactNode
  className?: string
  trackClassName?: string
  controlsClassName?: string
}

export default function CarouselRail({
  children,
  className = "",
  trackClassName = "",
  controlsClassName = "",
}: CarouselRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isPointerDown = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const dragged = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const scroll = (direction: "prev" | "next") => {
    const track = trackRef.current

    if (!track) {
      return
    }

    track.scrollBy({
      left:
        direction === "next"
          ? track.clientWidth * 0.86
          : -track.clientWidth * 0.86,
      behavior: "smooth",
    })
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    isPointerDown.current = true
    dragged.current = false
    startX.current = event.clientX
    startScrollLeft.current = track.scrollLeft
    setIsDragging(true)
    track.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current

    if (!track || !isPointerDown.current) {
      return
    }

    const delta = event.clientX - startX.current

    if (Math.abs(delta) > 6) {
      dragged.current = true
    }

    track.scrollLeft = startScrollLeft.current - delta
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current

    isPointerDown.current = false
    setIsDragging(false)
    track?.releasePointerCapture(event.pointerId)

    if (dragged.current) {
      window.setTimeout(() => {
        dragged.current = false
      }, 0)
    }
  }

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragged.current) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 select-none touch-pan-x ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } ${trackClassName}`}
      >
        {children}
      </div>
      <div className={`mt-5 flex justify-end gap-2 ${controlsClassName}`}>
        <button
          type="button"
          onClick={() => scroll("prev")}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-black/10 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-colors hover:bg-white"
          aria-label="Previous items"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll("next")}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-black/10 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-colors hover:bg-white"
          aria-label="Next items"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
