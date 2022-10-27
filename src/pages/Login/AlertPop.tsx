import React from 'react'
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

export interface AlertProps {
  title: any
}

const AlertPop: React.FC<AlertProps> = (props) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{props.title}</AlertTitle>
    </Alert>
  )
}

export default AlertPop
