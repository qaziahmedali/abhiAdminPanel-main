import { useToast } from '@chakra-ui/react'

export const useAbhiToast = () => {
  const toast = useToast()

  const success = (title: string, description?: string) =>
    toast({
      title,
      description,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right'
    })

  const error = (title: string, description?: string) =>
    toast({
      title,
      description,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top-right'
    })

  return {
    success,
    error
  }
}
