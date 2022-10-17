import React from 'react'

export default function SVGLogo({ imageUrl, w, h, fillColor, ...prop }) {
  return (
    <svg
      xmlns={imageUrl}
      fill={fillColor}
      viewbox='0 0 200 200'
      width={w}
      height={h}
    >
      <polygon points='100,0 30,200 200,70 0,70 170,200' />
    </svg>
  )
}
