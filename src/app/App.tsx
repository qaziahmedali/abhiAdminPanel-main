import React from 'react'
import '@/assets/css/main.css'
import PublicApp from './Public'
import AuthApp from './Auth'
import { Box, Spinner, Flex } from '@chakra-ui/react'
import { useEasyState } from '@/store/hooks'
import { useStoreRehydrated } from 'easy-peasy'

function App() {
  const isRehydrated = useStoreRehydrated()
  const { isLoading } = useEasyState((state) => state.loading)
  const { loggedIn } = useEasyState((state) => state.user)

  if (!isRehydrated)
    return (
      <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    )

  if (!loggedIn) {
    return <PublicApp />
  } else {
    return (
      <Box>
        {isLoading ? <Spinner /> : null}
        <AuthApp />
      </Box>
    )
  }
}

export default App
