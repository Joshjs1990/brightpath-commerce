import React from "react"

import { IconProps } from "types/icon"

const BrightpathLogo: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      {...attributes}
    >
      <path
        d="M16 2.5 29.5 16 16 29.5 2.5 16 16 2.5Z"
        stroke={color}
        strokeWidth="2.2"
      />
      <path
        d="M11 8.5v15h6.7c4.1 0 6.8-2.1 6.8-5.2 0-2-1.2-3.5-3.2-4.2 1.3-.7 2.1-1.8 2.1-3.3 0-2.7-2.3-4.3-6.1-4.3H11Zm4 3.1h2.1c1.3 0 2 .5 2 1.5s-.7 1.5-2.1 1.5h-2v-3Zm0 5.8h2.8c1.5 0 2.3.6 2.3 1.7s-.8 1.8-2.4 1.8H15v-3.5Z"
        fill={color}
      />
    </svg>
  )
}

export default BrightpathLogo
