"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
import { defaultCountry } from "@lib/demo/catalog"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: unknown
}) => {
  const { countryCode } = useParams()

  return (
    <Link href={`/${countryCode || defaultCountry}${href}`} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
