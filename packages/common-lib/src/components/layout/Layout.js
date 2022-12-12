import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box, Center, Stack, useTheme } from 'native-base'
import AppBar from './AppBar'
import { useWindowSize } from '../helper'
import HeightWidth from '../HeightWidth'
import Loading from '../Loading'
import { checkAuth } from '../../hooks/useAuthFlow'

export default function Layout({
  isDisabledAppBar,
  subHeader,
  children,
  imageUrl,
  loading,
  _appBar,
  _header,
  _subHeader,
  _footer,
  _height,
  _width
}) {
  const [width, Height] = useWindowSize()
  const [refFoot, serRefFoot] = React.useState({})
  const { components } = useTheme()
  const { Layout } = components

  React.useEffect(() => {
    checkAuth()
  }, [])

  if (typeof loading !== 'undefined' && loading) {
    return <Loading />
  }

  return (
    <Center>
      <HeightWidth _scollView={Layout?._scollView} _width={_width}>
        <Stack
          width={'100%'}
          style={{
            ...(imageUrl
              ? {
                  backgroundImage: 'url(' + imageUrl + ')',
                  backgroundColor: 'transparent'
                }
              : {}),
            justifyContent: 'center',
            backgroundSize: 'auto',
            height: _height,
            width: -_width
          }}
          space={5}
          {...(Layout?._layout ? Layout?._layout : {})}
        >
          {!isDisabledAppBar ? (
            <AppBar
              color={imageUrl ? 'white' : 'primary'}
              {...(Layout?._appBar ? Layout?._appBar : {})}
              {..._appBar}
            />
          ) : (
            <React.Fragment />
          )}
          {_header ? (
            <Header
              {...(Layout?._header ? Layout?._header : {})}
              {..._header}
            />
          ) : (
            <React.Fragment />
          )}
        </Stack>
        {subHeader ? (
          <Box
            {...{
              py: '6',
              px: '5',
              position: 'relative',
              bg: 'white',
              roundedTop: '20'
            }}
            {..._subHeader}
            {...(Layout?._subHeader ? Layout?._subHeader : {})}
          >
            {subHeader}
          </Box>
        ) : (
          <React.Fragment />
        )}
        {children}
        <Box minH={refFoot?.clientHeight ? refFoot?.clientHeight : 85}></Box>
      </HeightWidth>
      <Box w={width} ref={(e) => serRefFoot(e)}>
        <Footer {...(Layout?._footer ? Layout?._footer : {})} {..._footer} />
      </Box>
    </Center>
  )
}
