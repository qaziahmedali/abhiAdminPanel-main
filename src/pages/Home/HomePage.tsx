import { useEasyActions, useEasyState } from '@/store/hooks'
import { Box } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/react'
import React from 'react'

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const { name } = useEasyState((state) => state.user)

  const { setUserName } = useEasyActions((actions) => actions.user)

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  return (
    <Box>
      <p>HomePage</p>
      <Box>Welcome: {name}</Box>
      <Box>
        <Input placeholder="Enter Name" size="md" onChange={nameChangeHandler} />
      </Box>
    </Box>
  )
}

export default HomePage
