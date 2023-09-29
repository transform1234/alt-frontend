import { Box, HStack } from 'native-base'
import React from 'react'
import IconByName from '../IconByName'
import { Caption, H2 } from './HeaderTags'

export default function NameTag({ height = '55', parentBgColor = '#f8f8f9' }) {
  return (
    <HStack
      alignItems='center'
      bg='nameTag'
      roundedLeft={'full'}
      p='2'
      pl='3'
      pr='5'
      space={2}
      flex='1'
      position={'relative'}
    >
      <IconByName
        borderWidth='1'
        borderColor='white'
        p='1'
        rounded='full'
        isDisabled
        name='UserLineIcon'
        _icon={{ size: 25 }}
        color='white'
      />
      <Box>
        <H2 color='white'> Hi {localStorage.getItem('name')}</H2>
        <Caption color='white'>
          Class:{' '}
          {localStorage.getItem('grade') +
            ' ' +
            // localStorage.getItem('section') +
            // ' ' +
            localStorage.getItem('medium')}
        </Caption>
      </Box>
      <Box
        position='absolute'
        right='-1'
        style={{
          borderTop: `${(height ? height : 55) / 2}px solid transparent`,
          borderRight: `${(height ? height : 55) / 2}px solid ${parentBgColor}`,
          borderBottom: `${(height ? height : 55) / 2}px solid transparent`
        }}
      />
    </HStack>
  )
}
