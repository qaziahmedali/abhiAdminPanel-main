// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react'
import { pxToRem } from './Helper'
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    primaryColor: '#3ECE9E',
    secondaryColor: '#13384A',
    lightBGColor: '#F7FFFC',
    inputBorder: 'rgba(0, 0, 0, 0.12)',
    headingColor: '#323233',
    focusedInput: '#6481DC',
    darkGray: '#8792A2',
    lightGray: 'rgba(19, 56, 74, 0.25)',
    lightText: 'rgba(0, 0, 0, 0.6)',
    darkText: '#828282',
    navItemBg: '#3ece9e4d'
  },
  fonts: {
    body: 'IBMPlexSans-Regular',
    regular: 'IBMPlexSans-Regular',
    heading: 'IBMPlexSans-Regular',
    medium: 'IBMPlexSans-Medium',
    bold: 'IBMPlexSans-Bold'
  }
})
export type AppColors = keyof typeof theme.colors
