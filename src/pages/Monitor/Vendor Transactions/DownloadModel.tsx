import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Tr,
  Td,
  Th,
  Tbody,
  Button
} from '@chakra-ui/react'

import _ from 'lodash'
import axios from 'axios'

export interface DownloadModalProps {
  isOpen: boolean
  onClose: any
  data: any
}

const DownloadModal: React.FC<DownloadModalProps> = (props) => {
  const [isLoading, setLoading] = useState(false)

  const download = (item: any) => {
    setLoading(true)
    axios({ url: item.url, responseType: 'blob', method: 'GET' })
      .then((response: any) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', item.fileName)
        document.body.appendChild(link)
        link.click()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Download Vendor Transaction Receipt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div style={{ marginLeft: '50px', backgroundColor: '#f7fafc' }}>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Th>Label</Th>
                  <Th>Download Link</Th>
                </Tr>
                {props?.data.length > 0 ? (
                  props?.data?.map((item: any, index: number) => (
                    <Tr>
                      <Td>
                        {/* <Tooltip label={item?.fileName?.subString(0, 50)}> */} Attachment {index + 1}
                        {/* </Tooltip>{" "} */}
                      </Td>
                      <Td>
                        <Button colorScheme="purple" isLoading={isLoading} onClick={() => download(item)}>
                          Click here to download
                        </Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td>No Data Found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default DownloadModal
