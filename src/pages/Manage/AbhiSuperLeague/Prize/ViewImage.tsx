import React from 'react'
import {
  Grid,
  FormLabel,
  Stack,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import { PrizesResult } from '@/types/Manage/PrizesType'

export interface ViewImageProps {
  prize: PrizesResult
  isOpen: boolean
  onClose: () => void
}

const ViewImage: React.FC<ViewImageProps> = (props) => {
  return (
    <Modal scrollBehavior="inside" isCentered={true} size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Download Vendor Transaction Receipt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="24px">
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              <FormLabel htmlFor="title">Image</FormLabel>
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                <img src={props?.prize?.image?.urlPath} alt="log" width="100px" height="100px" />
              </div>
            </Grid>
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ViewImage
