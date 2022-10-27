import { intpW } from '@ali_nawaz/style-kit'
import { css } from '@emotion/react'

export let fontSize = 16

window.onload = () => {
  fontSize = +window.getComputedStyle(document.body).fontSize.replace('px', '')
}

export const pxToRemNoUnit = (px: number) => px / fontSize
export const pxToRem = (px: number) => pxToRemNoUnit(px) + 'rem'

export const intpGeneratorBetween2Point =
  (screenWidth1: number, screenWidth2: number) => (value1: number, value2: number) =>
    intpW('rem', [screenWidth1, pxToRemNoUnit(value1)], [screenWidth2, pxToRemNoUnit(value2)])

export const standardIntPx = intpGeneratorBetween2Point(320, 1280)
export const intPx = (value1: number, value2: number) => standardIntPx(value1, value2)

export const down = (width: string, style: ReturnType<typeof css>) => {
  return css`
    @media only screen and (max-width: ${width}) {
      ${style}
    }
  `
}

export const up = (width: string, style: ReturnType<typeof css>) => {
  return css`
    @media only screen and (min-width: ${width}) {
      ${style}
    }
  `
}

export const between = ([min, max]: [string, string], style: ReturnType<typeof css>) => {
  return css`
    @media (min-width: ${min}) and (max-width: ${max}) {
      ${style}
    }
  `
}
