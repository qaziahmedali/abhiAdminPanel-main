import React, { useState } from 'react'
import {
  Text,
  Select,
  Button,
  Grid,
  Drawer,
  Spinner,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input,
  FormControl
} from '@chakra-ui/react'
import _ from 'lodash'
import { useEasyActions } from '../../../store/hooks'
import { useForm } from 'react-hook-form'

export interface UsersProps {
  isOpen: boolean
  onClose: any
  isEditable: boolean
  userData: any
}

/* 
  To-Do Set Roles Array
*/
const roles = ['Manager', 'CEO', 'Executive']

const AddUsers: React.FC<UsersProps> = (props) => {
  const [userName, setUserName] = useState('')

  const [organization, setOrganization] = useState('')
  const [status, setStatus] = useState('')

  const [role, setRole] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { updateUserRole } = useEasyActions((actions) => actions.user)

  const {
    handleSubmit,
    formState: { errors }
  } = useForm()

  const setUserFullName: any = () => {
    if (!_.isEmpty(props.userData.persons)) {
      return props.userData.persons[0].firstName + ' ' + props.userData.persons[0].lastName
    }
    return
  }

  React.useEffect(() => {
    if (props.isEditable) {
      setUserName(setUserFullName())
      setStatus(props.userData.enabled ? 'Active' : 'InActive')
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [props.userData])

  const cancelHandler = () => {
    props.onClose()
    setSuccess(false)
    setAlert(false)
    setUpdated(false)
  }

  const onSubmit = async () => {
    setIsLoading(true)
    setSuccess(false)
    setAlert(false)
    setUpdated(false)

    /* 
      To Do : Set Role Id
    */
    if (props.isEditable) {
      let updateUserObj = {
        userId: props.userData.id,
        roleId: 'd5d57a03-96fe-427d-84b5-b1753a810b3a'
      }

      updateUserRole(updateUserObj)
        .then(() => {
          setIsLoading(false)
          setUpdated(true)
        })
        .catch(() => setAlert(true))
    } else {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{props.isEditable ? 'Update User' : 'Add User'}</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} id="addUserForm">
              <FormControl isRequired>
                <Stack spacing="24px">
                  <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      disabled={disabled}
                      value={userName}
                      placeholder="Enter employee name"
                      onChange={(event) => setUserName(event.currentTarget.value)}
                    />
                  </Grid>
                  <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      disabled={disabled}
                      placeholder="Enter email"
                      onChange={(event) => setOrganization(event.currentTarget.value)}
                    />
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      disabled={disabled}
                      placeholder="Enter phone"
                      onChange={(event) => setOrganization(event.currentTarget.value)}
                    />
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                    <FormLabel htmlFor="role">Role</FormLabel>

                    <Select placeholder="Select Role" onChange={(event) => setRole(event.currentTarget.value)}>
                      {roles.map((role, index) => {
                        return (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        )
                      })}
                    </Select>
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                    <FormLabel htmlFor="username">Status</FormLabel>
                    <Input
                      disabled={disabled}
                      value={status}
                      placeholder="Enter status"
                      onChange={(event) => setStatus(event.currentTarget.value)}
                    />
                  </Grid>
                </Stack>
              </FormControl>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {alert && (
              <Text color="red" mr="5">
                Something went wrong
              </Text>
            )}
            {success && (
              <Text color="green" mr="5">
                Sucessfully Added
              </Text>
            )}

            {updated && (
              <Text color="green" mr="5">
                Updated Sucessfully.
              </Text>
            )}
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button form="addUserForm" type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={onSubmit}>
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddUsers
