import { Box, HStack, Pressable, Text } from 'native-base'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Breadcrumb({ data, _hstack, _box, _text, _link }) {
  const navigate = useNavigate()
  return Array.isArray(data) ? (
    <HStack space={2} {..._hstack}>
      {data.map((item, index) => (
        <HStack space={2} {..._box} key={index}>
          {typeof item === 'string' ? (
            <Text {..._text}>{item}</Text>
          ) : item?.link ? (
            <Pressable onPress={(e) => navigate(item?.link)} {..._link}>
              <Text color={'primary'} {..._text}>
                {item?.label ? item?.label : item?.title ? item?.title : ''}
              </Text>
            </Pressable>
          ) : (
            <Text {..._text}>
              {item?.label ? item?.label : item?.title ? item?.title : ''}
            </Text>
          )}
          {data.length > index + 1 ? <Text>/</Text> : <React.Fragment />}
        </HStack>
      ))}
    </HStack>
  ) : (
    <Text>{`data ${typeof data} expected array`}</Text>
  )
}
