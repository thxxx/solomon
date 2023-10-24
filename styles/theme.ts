export const theme = {
  purple01: '#F3CCFF',
  purple02: '#D09CFA',
  purple03: '#A555EC',
  grey: '#EEF2F6',
  darkGrey: '#2F3747',
  blue01: '#31ace9',
  blue02: '#3496F1',
}

export const lightTheme = {
  ...theme,
  color: '#000000',
  bgColor: '#f9f9f9',
  bgColor01: '#27282E',
  bgColor02: '#F4F3F5',
  textColor02: '#000000',
  borderColor: '#000000',
  borderColor01: '#77777733',
  botChat: '#ECEDEE',
}

export const darkTheme = {
  ...theme,
  color: '#ffffff',
  bgColor: '#0E1016',
  bgColor01: '#27282E',
  bgColor02: '#1A1E28',
  textColor02: '#C1C3C4',
  borderColor: '#ffffff',
  borderColor01: '#ffffff33',
  botChat: '#ECEDEE',
}

export type ThemeType = {
  purple01: string
  purple02: string
  purple03: string
  color: string
  bgColor: string
  borderColor: string
}

export type ThemeProvide = {
  theme: ThemeType
}
