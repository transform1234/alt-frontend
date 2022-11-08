import React, { useEffect } from 'react'
import { Box, Text, HStack, Center, Stack, Pressable } from 'native-base'
import IconByName from '../IconByName'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'
import { useWindowSize } from '../helper'

export default function Footer({ menues, routeDynamics, ...props }) {
  const [selected, setSelected] = React.useState(0)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [width, Height] = useWindowSize()
  const footerMenus = menues

  useEffect(() => {
    let path = window?.location?.pathname.toString()
    if (
      path.startsWith('/attendance') ||
      path.startsWith('/class') ||
      path.startsWith('/assessment')
    ) {
      setSelected('classes')
    } else if (path.startsWith('/worksheet')) {
      setSelected('worksheet')
    } else if (path.startsWith('/mylearning')) {
      setSelected('mylearning')
    } else if (path.startsWith('/visits') || path.startsWith('/schools')) {
      setSelected('visits')
    } else if (path.startsWith('/studentprogram')) {
      setSelected('studentprogram')
    } else if (path.startsWith('/Settings')) {
      setSelected('Settings')
    } else if (path.startsWith('/Certificate')) {
      setSelected('Certificate')
    } else {
      setSelected('app')
    }
  }, [])

  const PressableNew = ({ item, children, ...prop }) => {
    return item?.route ? (
      <Pressable
        {...prop}
        onPress={() => {
          navigate(
            routeDynamics
              ? generatePath(item.route, { ...{ id: item.id } })
              : item.route
          )
        }}
      >
        {children}
      </Pressable>
    ) : (
      <Box {...prop}>{children}</Box>
    )
  }

  return (
    <Stack>
      <Box width={width} flex={1} safeAreaTop position='fixed' bottom='0'>
        <Center flex={1}></Center>
        <HStack
          pl={'20px'}
          pr={'20px'}
          bg='white'
          alignItems='center'
          safeAreaBottom
          shadow={6}
        >
          {footerMenus?.map((item, index) => (
            <PressableNew
              item={item}
              key={index}
              cursor='pointer'
              py='3'
              flex={1}
              onPress={() => setSelected(item.moduleName)}
              alignItems='center'
            >
              {selected === item.moduleName ? (
                <HStack
                  bg='primary'
                  rounded={'full'}
                  alignItems='center'
                  p='2'
                  pr='4'
                  py='0'
                >
                  <IconByName
                    name={item.icon}
                    isDisabled
                    p='2'
                    color={'white'}
                  />
                  <Text fontSize='12' color={'white'}>
                    {t(item.title)}
                  </Text>
                </HStack>
              ) : (
                <IconByName
                  name={item.icon}
                  isDisabled
                  p='2'
                  color={'primary'}
                />
              )}
            </PressableNew>
          ))}
        </HStack>
      </Box>
    </Stack>
  )
}
