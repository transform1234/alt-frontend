import React from 'react'
import { Text } from 'native-base'

const H2 = ({ children, ...props }) => {
  return (
    <Text
      {...props}
      fontSize={{ base: '2.7vw', md: '16px', lg: '16px', sm: '12px' }}
      fontWeight='600'
    >
      {children}
    </Text>
  )
}
export default React.memo(H2)
