const maxWidth = '1080'
const fontFamily = 'Inter'
const fontSize = ''
import colorTheme from './colorTheme'

const theme = {
  colors: {
    ...colorTheme,
    attendance: {
      ...colorTheme
    },
    student: {
      ...colorTheme,
      studentAvtarBg: '#f59e0b',
      studentName: '#1f2937',
      starIconBg: '#FFC326',
      starIconColor: '#E78D12'
    },
    profile: {
      ...colorTheme,
      primaryLight: '#FFF8F7',
      presentText: '#FA8129',
      specialDuty: '#06D6A0',
      activeClass: '#10b981',
      reportBoxBg: '#FFF8F7',
      cardBgTransparent: '#18181b66'
    },
    classes: {
      ...colorTheme,
      girls: '#0ea5e9',
      boys: '#a855f7'
    },
    calendar: {
      ...colorTheme,
      timeTableFlashIcon: '#BDB3E7',
      timeTablemiddle: '#A1D6B6',
      timeTablecellborder: '#FFDFD6',
      specialDuty: '#06D6A0',
      activeClass: '#10b981'
    },
    notification: {
      ...colorTheme,
      cardBg: '#D9F0FC',
      notificationBg: '#FDDFD8'
    },
    core: { ...colorTheme },
    worksheet: {
      ...colorTheme,
      primaryLight: '#FFF8F7',
      primaryDark: '#C79AB2',
      cardBg: '#F9CCE4',
      cardBgLight: '#FEF1F9',
      secondary: '#feefeb'
    },
    schools: {
      ...colorTheme,
      cardBg: '#CDECF6',
      primaryLight: '#FFF8F7'
    },
    assessment: {
      ...colorTheme,
      primaryLight: '#FFF8F7',
      reportDetailsSubheaderBg: '#FFCAAC',
      QuationsBoxBg: '#FEF1EE',
      achiverBoxBg: '#FFF9F9'
    },
    visits: {
      ...colorTheme,
      cardBg: '#CDECF6',
      visitedCard: '#ECF7EB'
    },
    selfassesment: {
      ...colorTheme,
      cardBg: '#CDECF6',
      avatar: '#ffb926',
      landingIcon: '#5CE5F8',
      landingWarningIcon: '#E99B41',
      landingLight: '#E5FCF5',
      cloverGreen: '#41C88E'
    },
    reports: {
      primaryGreen: '#B6EC78',
      barGray: '#E9E9E9'
    },
    widgetColor: {
      400: '#7F9DAC',
      500: '#DDD8F3',
      600: '#FFE2CC',
      700: '#CCE7FF',
      800: '#C4F2C5',
      900: '#CDDAFD',
      1000: '#FFC6FF'
    },
    iconColor: {
      500: '#aba0db',
      600: '#c3916c',
      700: '#83b0d7',
      800: '#5eb05f',
      900: '#7c8dbc',
      1000: '#ea5fff'
    },
    primaryButton: {
      50: '#ecebf9',
      100: '#c5c3ee',
      200: '#9e9ce3',
      300: '#7774d7',
      400: '#504ccc',
      500: '#6461D2',
      600: '#2a288b',
      700: '#1e1c63',
      800: '#12113c',
      900: '#060614'
    }
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily
  },
  components: {
    Text: {
      baseStyle: {
        textTransform: 'none',
        fontFamily: fontFamily,
        fontSize: fontSize
      }
    },
    Actionsheet: {
      baseStyle: {
        maxW: maxWidth,
        alignSelf: 'center'
      }
    },
    Button: {
      baseStyle: {
        rounded: 'lg'
      },
      defaultProps: {
        colorScheme: 'primaryButton',
        _text: {
          fontSize: '12px',
          fontWeight: '600'
        }
      },
      variants: {
        solid: (e: any) => {
          return {
            _text: {
              color: 'white'
            }
          }
        },
        rounded: (e: any) => {
          return {
            rounded: 'full',
            colorScheme: 'primaryButton',
            bg: 'primaryButton.500',
            _text: {
              fontSize: '12px',
              fontWeight: '600'
            }
          }
        },
        secondary: (e: any) => {
          return {
            rounded: 'full',
            style: {
              background:
                'linear-gradient(90deg, #B6EC78 0.16%, #3DCE3A 103.79%)'
            },
            _text: {
              color: 'white',
              fontSize: '12px',
              fontWeight: '600'
            }
          }
        }
      }
    },
    Avatar: {
      baseStyle: {
        rounded: 'lg'
      },
      defaultProps: {
        bg: 'primary',
        _text: {
          color: 'white'
        }
      }
    }
  }
}

export default theme
