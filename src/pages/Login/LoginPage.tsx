import { useEasyActions } from '@/store/hooks'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  VStack,
  Spinner,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AlertPop from './AlertPop'
import { AxiosError } from 'axios'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  let history = useHistory()

  const [showPassword, setShowPassword] = useState(false)
  const { login } = useEasyActions((actions) => actions.user)
  const [isLoading, setLoading] = useState(false)
  const [loggedIn, setLoggedin] = useState(false)
  const [reCAPTCHA, setReCAPTCHA] = useState<string | null>(null)
  const [alert, setAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleShowClick = () => setShowPassword(!showPassword)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onChange = (value: any) => {
    setReCAPTCHA(value)
  }

  const onSubmit = async (value: any) => {
    setLoggedin(false)
    setAlert(false)
    setLoading(true)

    if (value.email && value.password && reCAPTCHA !== null) {
      const payload = {
        email: value.email,
        password: value.password,
        initiator: 'admin_web'
      } // Passing admin_web as the mandatory argument...

      const res = await login(payload)
      if (res instanceof Error) {
        const axiosError = res as AxiosError<any, any>
        setErrorMessage(axiosError?.response?.data?.message)
        setLoggedin(false)
        setAlert(true)
        setLoading(false)
        return
      }
      history.push('/dashboard')
      setLoggedin(true)
      setErrorMessage('')
    } else {
      setLoggedin(false)
      setAlert(true)
      setErrorMessage('Checked ReCaptcha')
    }
    setLoading(false)
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <VStack spacing={6}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                  <Input
                    type="text"
                    placeholder="Email Address"
                    {...register('email', {
                      required: 'Please enter email'
                      // pattern: {
                      //   value:
                      //     /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/,
                      //   message: "Invalid Email",
                      // },
                    })}
                  />
                </InputGroup>

                {errors.email && <AlertPop title={errors.email.message} />}

                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      {...register('password', {
                        required: 'Please enter Password',
                        minLength: { value: 3, message: 'Too short' }
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <ReCAPTCHA sitekey="6LeLhVYdAAAAAMvJulDmg7O5Ie5RRt_eCzPhJ9AV" size={'normal'} onChange={onChange} />

                  {false && (
                    <FormHelperText textAlign="right">
                      <Link>forgot password?</Link>
                    </FormHelperText>
                  )}
                </FormControl>

                {errors.password && <AlertPop title={errors.password.message} />}

                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {!loggedIn ? 'Login' : <Spinner />}
                </Button>
              </VStack>

              {alert && <AlertPop title={errorMessage} />}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default LoginPage
