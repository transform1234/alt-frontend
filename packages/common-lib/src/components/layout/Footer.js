import React, { useEffect } from 'react'
import {
  Box,
  Text,
  HStack,
  Center,
  Stack,
  Pressable,
  VStack
} from 'native-base'
import IconByName from '../IconByName'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'
import { useWindowSize } from '../helper'

export default function Footer({ menues, routeDynamics, ...props }) {
  const path = window?.location?.pathname.toString()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [width, Height] = useWindowSize()
  const footerMenus = menues

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
              alignItems='center'
            >
              {Array.isArray(item?.selected) &&
              (item?.selected?.find((e) => path.startsWith(e) && e !== '/') ||
                item.selected.includes(path)) ? (
                <VStack alignItems='center'>
                  <IconByName
                    name={item.icon}
                    isDisabled
                    p='2'
                    pb='1'
                    color={'primary'}
                  />
                  <Text fontSize='12' color={'primary'}>
                    {t(item.title)}
                  </Text>
                </VStack>
              ) : (
                <VStack alignItems={'center'}>
                  <IconByName
                    name={item.icon}
                    isDisabled
                    p='2'
                    pb='1'
                    color={'lightGray1'}
                  />
                  <Text fontSize='12' color={'lightGray1'}>
                    {t(item.title)}
                  </Text>
                </VStack>
              )}
            </PressableNew>
          ))}
        </HStack>
      </Box>
    </Stack>
  )
}
