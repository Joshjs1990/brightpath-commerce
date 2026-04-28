"use client"

import React, { useEffect, useState } from "react"

import { IconProps } from "types/icon"

const EdgesInMotionLogo: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  ...attributes
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (reducedMotion.matches) {
      return
    }

    let frame = 0

    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        setScrollProgress(Math.min(window.scrollY / 480, 1))
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
    }
  }, [])

  const frameRotation = scrollProgress * 10

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
      {...attributes}
    >
      <g transform={`rotate(${frameRotation} 24 24)`}>
        <path
          d="M24 4.5 43.5 24 24 43.5 4.5 24 24 4.5Z"
          stroke={color}
          strokeWidth="2.75"
          strokeLinejoin="round"
          opacity={0.42 + scrollProgress * 0.18}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}

export default EdgesInMotionLogo
