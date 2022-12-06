import React from 'react'

import { HStack, Text, VStack, Box, FlatList, Pressable } from 'native-base'
import { generatePath } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import IconByName from './IconByName'
import { BodyLarge } from './layout/HeaderTags'
import { chunk } from './helper'

const PressableNew = ({ item, children, routeDynamics, ...prop }) => {
  return item?.route ? (
    <Pressable {...prop}>
      <Link
        style={{ color: 'rgb(63, 63, 70)', textDecoration: 'none' }}
        to={
          routeDynamics
            ? generatePath(item.route, { ...{ id: item.id } })
            : item.route
        }
      >
        {children}
      </Link>
    </Pressable>
  ) : item?.onPress ? (
    <Pressable onPress={item.onPress} {...prop}>
      <Box {...prop}>{children}</Box>
    </Pressable>
  ) : (
    <Box {...prop}>{children}</Box>
  )
}

export default function Menu({
  items,
  type,
  routeDynamics,
  bg,
  _box,
  _boxMenu,
  _icon,
  ...props
}) {
  const { t } = useTranslation()

  if (type === 'vertical') {
    const newItems = chunk(items, props?.gridCount ? props.gridCount : 3)

    return (
      <VStack bg={bg} {..._box}>
        {newItems.map((subItems, index) => (
          <HStack
            key={index}
            justifyContent='center'
            space={4}
            {...props?._hstack}
          >
            {subItems.map((item) => (
              <PressableNew
                routeDynamics={routeDynamics}
                key={item.keyId ? item.keyId : item.id}
                item={item}
                bg='button.500'
                rounded={'md'}
                p='1'
                minW={item?.boxMinW ? item?.boxMinW : '104px'}
                {...props?._pressable}
                {...item?._pressable}
              >
                <VStack
                  space='2'
                  my='2'
                  mx='1'
                  alignItems={'center'}
                  textAlign='center'
                  {...props?._vstack}
                >
                  {item.icon ? (
                    <IconByName
                      isDisabled
                      name={item.icon}
                      p='0'
                      color='white'
                      _icon={{
                        style: {
                          fontSize: '28px'
                        }
                      }}
                      {..._icon}
                    />
                  ) : (
                    <React.Fragment />
                  )}
                  <Text
                    color='white'
                    maxW={20}
                    lineHeight={14}
                    {...props?._text}
                    {...item?._text}
                  >
                    {item.title}
                  </Text>
                </VStack>
              </PressableNew>
            ))}
          </HStack>
        ))}
      </VStack>
    )
  } else {
    return (
      <Box bg={bg} {..._box}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <SubMenu {...{ item, bg, _boxMenu, routeDynamics, _icon }} />
          )}
          keyExtractor={(item, index) => (item.id ? item.id : index)}
        />
      </Box>
    )
  }
}

export const SubMenu = ({
  item,
  routeDynamics,
  bg,
  _boxMenu,
  _icon,
  onPress
}) => {
  const { t } = useTranslation()
  return (
    <Box
      borderBottomWidth='1'
      _dark={{
        borderColor: 'gray.600'
      }}
      borderLeftWidth={'5'}
      borderLeftColor={
        item.activeMenu
          ? 'primary.500'
          : item?._boxMenu?.bg
          ? item._boxMenu.bg
          : _boxMenu?.bg
          ? _boxMenu?.bg
          : bg
      }
      borderColor={'coolGray.200'}
      {..._boxMenu}
      {...item._boxMenu}
    >
      <PressableNew {...{ routeDynamics, item }}>
        <HStack space={3} justifyContent={'space-between'} width={'100%'}>
          <HStack
            space={item.leftText || item.icon ? '7' : ''}
            alignItems='center'
          >
            {item.leftText ? (
              <BodyLarge>{item.leftText}</BodyLarge>
            ) : item.icon ? (
              <IconByName name={item.icon} p='0' {..._icon} />
            ) : (
              <React.Fragment />
            )}
            <BodyLarge>{t(item.title)}</BodyLarge>
          </HStack>
          <IconByName
            name={item.rightIcon ? item.rightIcon : 'ArrowRightSLineIcon'}
            p='0'
            {..._icon}
          />
        </HStack>
      </PressableNew>
    </Box>
  )
}
