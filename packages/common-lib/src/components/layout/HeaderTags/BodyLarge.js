import React from 'react'
import { Text } from 'native-base'

const BodyLarge = ({ children, ...props }) => {
  return (
    <Text
      {...props}
      fontSize={{ base: '3.1vw', md: '14px', lg: '14px', sm: '12px' }}
      fontWeight='500'
    >
      {children}
    </Text>
  )
}
export default React.memo(BodyLarge)
