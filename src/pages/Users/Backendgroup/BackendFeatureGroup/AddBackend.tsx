import React, { useState } from 'react'
import {
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
  FormControl,
  Select
} from '@chakra-ui/react'
import _ from 'lodash'
export interface UsersProps {
  isOpen: boolean
  onClose: any
  isLoading: boolean
  isEditable: boolean
  backendFeatureData: any
  updateBackendFeaturesGroup: any
  addBackendFeaturesGroup: any
}

const AddBackend: React.FC<UsersProps> = (props) => {
  const [groupName, setGroupName] = useState('')
  const [internalName, setInternalName] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [httpMethod, setHttpMethod] = useState('')

  React.useEffect(() => {
    setGroupName(props?.backendFeatureData?.groupName ? props?.backendFeatureData?.groupName : '')
    setInternalName(props?.backendFeatureData?.internalName ? props?.backendFeatureData?.internalName : '')
    setEndPoint(props?.backendFeatureData?.endPoint ? props?.backendFeatureData?.endPoint : '')
    setHttpMethod(props?.backendFeatureData?.httpMethod ? props?.backendFeatureData?.httpMethod : '')
  }, [props.backendFeatureData, props.isOpen])

  const cancelHandler = () => {
    props.onClose()
  }

  const onSubmit = async () => {
    const body = {
      groupName,
      internalName,
      endPoint,
      httpMethod
    }
    if (props?.isEditable) {
      const params = {
        id: props?.backendFeatureData?.id,
        body
      }
      props?.updateBackendFeaturesGroup(params)
    } else {
      props?.addBackendFeaturesGroup(body)
    }
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {props.isEditable ? 'Update Backend Feature' : 'Add Backend Feature'}
          </DrawerHeader>

          <DrawerBody>
            <FormControl isRequired>
              <Stack spacing="24px">
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="groupName">Group Name</FormLabel>
                  <Input
                    value={groupName}
                    placeholder="Group Name"
                    onChange={(event) => setGroupName(event.currentTarget.value)}
                  />
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="internalName">Internal Name</FormLabel>
                  <Input
                    value={internalName}
                    placeholder="Internal Name"
                    onChange={(event) => setInternalName(event.currentTarget.value)}
                  />
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="endPoint">End Point</FormLabel>
                  <Input
                    value={endPoint}
                    placeholder="End Point"
                    onChange={(event) => setEndPoint(event.currentTarget.value)}
                  />
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="httpMethod">Http Method</FormLabel>
                  <Select
                    isRequired
                    placeholder={'Select Method'}
                    defaultValue={httpMethod}
                    onChange={(event) => setHttpMethod(event.currentTarget.value)}
                  >
                    <option value="GET" selected={httpMethod == 'GET' ? true : false}>
                      GET
                    </option>
                    <option value="POST" selected={httpMethod == 'POST' ? true : false}>
                      POST
                    </option>
                    <option value="PUT" selected={httpMethod == 'PUT' ? true : false}>
                      PUT
                    </option>
                    <option value="PATCH" selected={httpMethod == 'PATCH' ? true : false}>
                      PATCH
                    </option>
                    <option value="DELETE" selected={httpMethod == 'DELETE' ? true : false}>
                      DELETE
                    </option>
                  </Select>
                </Grid>
              </Stack>
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button form="addUserForm" type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={onSubmit}>
              {props?.isLoading ? <Spinner /> : props?.isEditable ? 'Update' : 'Create'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddBackend
