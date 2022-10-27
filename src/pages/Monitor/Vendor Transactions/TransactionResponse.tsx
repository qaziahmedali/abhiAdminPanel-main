import React, { useState, useEffect, Fragment } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Box,
  Stack,
  useClipboard,
  Heading,
  Button,
  Spinner
} from '@chakra-ui/react'

import ReactJson from 'react-json-view'

import { OneLinkVendorTransactionReqResData } from '@/types/transactions/oneLinkVendorTransactionReqRes'

export interface TransactionResponseProps {
  isOpen: boolean
  onClose: any
  OneLinkTransactionsResponse: OneLinkVendorTransactionReqResData
  // isLoading:boolean;
  // alertMessage:boolean;
  // setIsLoading:any;
}

const TransactionResponse: React.FC<TransactionResponseProps> = (props) => {
  const [request, setRequest] = useState<any[] | null>(null)
  const [response, setResponse] = useState<any[] | null>(null)
  const [oneLinkReqRes, setOneLinkReqRes] = useState<OneLinkVendorTransactionReqResData | null>(null)
  const [value, setValue] = useState('')
  const copy = (data: any) => {
    setValue(JSON.stringify(data))
    onCopy()
  }
  const { hasCopied, onCopy } = useClipboard(value)

  useEffect(() => {
    setOneLinkReqRes(props?.OneLinkTransactionsResponse)
    setRequest(props?.OneLinkTransactionsResponse?.financialTransactionsRequests)
    setResponse(props?.OneLinkTransactionsResponse?.financialTransactionsResponses)
  }, [props?.OneLinkTransactionsResponse])

  useEffect(() => {
    if (props?.isOpen && Object.keys(props?.OneLinkTransactionsResponse).length > 0) {
      setOneLinkReqRes(props?.OneLinkTransactionsResponse)
      setRequest(props?.OneLinkTransactionsResponse?.financialTransactionsRequests)
      setResponse(props?.OneLinkTransactionsResponse?.financialTransactionsResponses)
    } else {
      setOneLinkReqRes(null)
      setRequest(null)
      setResponse(null)
    }
  }, [props?.isOpen])

  const cancelHandler = () => {
    setOneLinkReqRes(null)
    setRequest(null)
    setResponse(null)
    props.onClose()
  }

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="5xl" isOpen={props.isOpen} onClose={cancelHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction Details </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {Object.keys(props?.OneLinkTransactionsResponse).length > 0 ? (
            oneLinkReqRes && oneLinkReqRes?.financialTransactionsRequests?.length >= 0 ? (
              <>
                <Box ml="2" width="48%" borderWidth={1} p={4} float="left">
                  <Stack spacing="24px">
                    <Center>
                      <Heading size="md"> Request Data</Heading>
                    </Center>
                    {request && request?.length > 0 ? (
                      <Fragment>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            copy(request)
                          }}
                          ml={2}
                        >
                          {hasCopied ? 'Copied' : 'Copy'}
                        </Button>
                        <ReactJson
                          src={request}
                          theme="monokai"
                          // onEdit={(edit) => {
                          //   console.log(edit);
                          // }}
                        />
                      </Fragment>
                    ) : (
                      <Center>
                        <p>-----No Data Found----</p>
                      </Center>
                    )}
                  </Stack>
                </Box>

                <Box ml="2" width="48%" borderWidth={1} p={4} float="left">
                  <Stack spacing="24px">
                    <Center>
                      <Heading size="md"> Response Data</Heading>
                    </Center>
                    {response && response?.length > 0 ? (
                      <Fragment>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            copy(response)
                          }}
                          ml={2}
                        >
                          {hasCopied ? 'Copied' : 'Copy'}
                        </Button>
                        <ReactJson
                          src={response}
                          theme="monokai"
                          //  onEdit={(edit) => {
                          //    console.log(edit);
                          //  }}
                        />
                      </Fragment>
                    ) : (
                      <Center>
                        <p>-----No Data Found----</p>
                      </Center>
                    )}
                  </Stack>
                </Box>
              </>
            ) : (
              <Center>
                <Spinner />
              </Center>
            )
          ) : (
            <Center>
              <p>-----No Data Found----</p>
            </Center>
          )}
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="green" mr={3} onClick={cancelHandler}>
						Close
					</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TransactionResponse
