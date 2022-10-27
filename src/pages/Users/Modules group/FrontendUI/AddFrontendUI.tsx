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
import { useEasyState } from '../../../../store/hooks'
import { PlatformService } from '@/types/users/Modules'
import { FeatureUi } from '@/types/users/FeatureUi'

export interface UsersProps {
  isOpen: boolean
  onClose: any
  isEditable: boolean
  featureUiData: FeatureUi | null | undefined
  isLoading: boolean
  updateFeatureUi: any
  addFeatureUi: any
}

const AddFrontendUI: React.FC<UsersProps> = (props) => {
  const [internalName, setInternalName] = useState('')
  const [platformServicesId, setPlatformServicesId] = useState('')
  const { platformService } = useEasyState((state) => state.user)

  React.useEffect(() => {
    setInternalName(props?.featureUiData?.internalName ? props?.featureUiData?.internalName : '')
    setPlatformServicesId(props?.featureUiData?.platformServicesId ? props?.featureUiData?.platformServicesId : '')
  }, [props.featureUiData, props.isOpen])

  const cancelHandler = () => {
    props.onClose()
  }

  const onSubmit = async () => {
    const payload = {
      internalName,
      platformServicesId: platformServicesId
    }
    if (props?.isEditable) {
      let params = {
        id: props?.featureUiData?.id,
        body: payload
      }
      props?.updateFeatureUi(params)
    } else {
      props?.addFeatureUi(payload)
    }
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {props.isEditable ? 'Update UI Feature' : 'Add UI Feature'}
          </DrawerHeader>

          <DrawerBody>
            <FormControl isRequired>
              <Stack spacing="24px">
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="internalName">Internal Name</FormLabel>
                  <Input
                    value={internalName}
                    placeholder="Internal Name"
                    onChange={(event) => setInternalName(event.currentTarget.value)}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="platformServicesId">PlatformServicesId</FormLabel>

                  <Select
                    placeholder="Select PlatformServicesId"
                    onChange={(event) => setPlatformServicesId(event.currentTarget.value)}
                  >
                    {platformService?.map((item: PlatformService, index: number) => (
                      <>
                        <option
                          selected={item?.id == props?.featureUiData?.platformServicesId ? true : false}
                          value={item?.id}
                        >
                          {item?.name}
                        </option>
                      </>
                    ))}
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
              {props?.isLoading ? <Spinner /> : props.isEditable ? 'Update' : 'Create'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddFrontendUI
