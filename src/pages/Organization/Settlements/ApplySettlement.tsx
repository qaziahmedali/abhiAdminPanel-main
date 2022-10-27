import React, { useState, useMemo } from 'react'
import {
  Spinner,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  FormControl,
  Input,
  RadioGroup,
  Radio,
  Icon
} from '@chakra-ui/react'
import { useEasyActions } from '../../../store/hooks'
import countryList from 'react-select-country-list'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { FiFile } from 'react-icons/fi'

export interface ApplySettlementProps {
  isOpen: boolean
  onClose: any
  organizationId: string
}

type FormValues = {
  file_: FileList
}

const ApplySettlement: React.FC<ApplySettlementProps> = (props) => {
  const [mediaType, setMediaType] = useState('')

  const [amount, setAmount] = useState('')
  const [transactionDate, setTransactionDate] = useState(new Date())

  const [success, setSuccess] = useState(false)
  const [alert, setAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fileUploading, setFileUploading] = useState(false)

  const [requiredFields, setRequiredFields] = useState(false)
  const [s3Url, setS3Url] = useState('')

  const [settlementFile, setSettlementFile] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [fileEvent, setFileEvent] = useState<any>([])

  const options = useMemo(() => countryList().getData(), [])

  const { getSettlements, applySettlementRequest, getSignedUrl, uploadToS3 } = useEasyActions(
    (state) => state.organization
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const setFile = async (event: any) => {
    setSettlementFile(event)
    setFileEvent(event)
    setUploadedFileName(event[0].name)
    let payload: any = {
      event,
      fileName: event[0].name,
      type: event[0].type,
      organizationId: props.organizationId
    }
    setFileUploading(true)
    const res = await getSignedUrl(payload)
    setFileUploading(false)
    setS3Url(res.data)
    // setS3GetUrl(res.data);
  }
  const uploadFile = async () => {
    if (fileEvent) {
      setFileUploading(true)

      let payload: any = {
        signedUrl: s3Url,
        fileEvent
      }
      let response = await uploadToS3(payload)
      console.log('Response', response)
      if (response) {
        setFileUploading(false)
      } else {
        setFileUploading(false)
      }
    }
  }

  const onSubmit = async () => {
    let d = new Date()
    let n = d.getTime()
    let fileName = `${uploadedFileName}_${n}`
    console.log(fileName)
    if (!amount || !transactionDate) {
      setRequiredFields(true)
      return
    }
    setAlert(false)
    setSuccess(false)
    setIsLoading(true)
    if (fileName) {
      let settlementObj = {
        media: {
          name: fileName,
          mediaType: mediaType,
          urlPath: `${props.organizationId}/${fileName}`
        },
        settlement: {
          transactionDate: transactionDate,
          amount: +amount,
          organizationId: props.organizationId
        }
      }
      const response = await applySettlementRequest(settlementObj)
      if (response) {
        let params: any = { organizationId: props.organizationId }
        getSettlements(params)
        setSuccess(true)
        setIsLoading(false)
        props.onClose()
      } else {
        setIsLoading(false)
        setAlert(true)
      }
    }
  }

  const cancelHandler = () => {
    props.onClose()
    setAlert(false)
    setSuccess(false)
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Apply For Settlement</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} id="settlementForm">
              <FormControl isRequired>
                <Stack spacing="24px">
                  {/* <Box>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      value={name}
                     
                      placeholder="Please enter name for settlement"
                      onChange={(event) => setName(event.currentTarget.value)}
                    />
                  </Box> */}
                  <Box>
                    <FormLabel htmlFor="mediaType">Media Type</FormLabel>
                    <RadioGroup onChange={(event) => setMediaType(event)} value={mediaType}>
                      <Stack direction="row">
                        <Radio value="image">Image</Radio>
                        <Radio value="document">Document</Radio>
                        {/* <Radio value="video">Video</Radio>
                        <Radio value="audio">Audio</Radio>
                        <Radio value="etc">Etc</Radio> */}
                      </Stack>
                    </RadioGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="mediaType">Receipt</FormLabel>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => setFile(event.target.files)}
                      // multiple
                    />
                    <Button
                      mt="2"
                      disabled={!props.organizationId}
                      onClick={uploadFile}
                      leftIcon={<Icon as={FiFile} />}
                    >
                      {fileUploading ? <Spinner /> : 'Upload'}
                    </Button>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="transactionDate">Payroll date</FormLabel>
                    <DatePicker
                      isClearable
                      selected={transactionDate}
                      onChange={(date: any) => setTransactionDate(date)}
                      placeholderText="Enter Payroll date"
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <Input
                      placeholder="Please enter amount"
                      onChange={(event) => setAmount(event.currentTarget.value)}
                    />
                  </Box>
                </Stack>
              </FormControl>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            {requiredFields && (
              <Text color="red" mr="5">
                Required Fields are missing
              </Text>
            )}
            {alert && (
              <Text color="red" mr="5">
                Something went wrong
              </Text>
            )}
            {success && (
              <Text color="green" mr="5">
                Successfully Added
              </Text>
            )}
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button form="settlementForm" type="submit" bg="#7367F0" colorScheme="#ffffff">
              {isLoading ? <Spinner size="md" /> : 'Submit'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ApplySettlement
