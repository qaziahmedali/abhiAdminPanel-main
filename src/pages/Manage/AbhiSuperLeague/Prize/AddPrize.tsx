import { apiManager } from '@/utils/apiManager/ApiManager'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Grid,
  Img,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
export interface AddPrizesProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  addPrizes: any
}

export interface Image {
  name: string
  mediaType: string
  description: string
  urlPath: string
}

export interface RunsProbability {
  run: number
  reward: any
  probabilityPercentage: number
}

export interface PrizeData {
  image: Image
  name: string
  description: string
  coins: number
  runsProbability: RunsProbability[]
}

const AddPrizes: React.FC<AddPrizesProps> = (props) => {
  const [name, setName] = useState('')
  const [nameMsg, setNameMsg] = useState<boolean>(false)
  const [description, setDescription] = useState('')
  const [descriptionMsg, setDescriptionMsg] = useState<boolean>(false)
  const [coins, setCoins] = useState<number>(0)
  const [coinsMsg, setCoinsMsg] = useState<boolean>(false)
  const [probability1, setProbability1] = useState('')
  const [probabilityMsg1, setProbabilityMsg1] = useState<boolean>(false)
  const [probability2, setProbability2] = useState('')
  const [probabilityMsg2, setProbabilityMsg2] = useState<boolean>(false)
  const [probability3, setProbability3] = useState('')
  const [probabilityMsg3, setProbabilityMsg3] = useState<boolean>(false)
  const [probability4, setProbability4] = useState('')
  const [probabilityMsg4, setProbabilityMsg4] = useState<boolean>(false)
  const [probability5, setProbability5] = useState('')
  const [probabilityMsg5, setProbabilityMsg5] = useState<boolean>(false)
  const [probability6, setProbability6] = useState('')
  const [probabilityMsg6, setProbabilityMsg6] = useState<boolean>(false)
  const [image, setImage] = useState<Image | null>(null)
  const [Files, setFiles] = useState<File | null>(null)
  const [imageMsg, setImageMsg] = useState<boolean>(false)

  useEffect(() => {
    setName('')
    setDescription('')
    setCoins(0)
    setImage(null)
    setFiles(null)
    setProbability1('')
    setProbability2('')
    setProbability3('')
    setProbability4('')
    setProbability5('')
    setProbability6('')
    setNameMsg(false)
    setDescriptionMsg(false)
    setCoinsMsg(false)
    setImageMsg(false)
    setProbabilityMsg1(false)
    setProbabilityMsg2(false)
    setProbabilityMsg3(false)
    setProbabilityMsg4(false)
    setProbabilityMsg5(false)
    setProbabilityMsg6(false)
  }, [props?.isOpen])
  console.log('Files', Files)
  const getPreSignedUrl = async (fileName: string, fileType: string): Promise<any> => {
    const { data }: any = await apiManager.fetch({
      name: 'GetSignedUrl',
      queryParams: {
        requestType: 'upload',
        scope: 'prize',
        fileName,
        fileType
      }
    })

    const imgId: any = await uploadFileToS3(data.data.signedUrl!, Files!)
    if (imgId.isTrusted) {
      let img = {
        name: fileName,
        mediaType: fileType,
        description: '',
        urlPath: data.data.urlPath
      }
      setImage(img)
    }
  }

  const uploadFileToS3 = async (url: string, f: File) => {
    return new Promise((resolve) => {
      const oReq = new XMLHttpRequest()
      const File = f === null ? '' : f
      oReq.open('PUT', url, true)
      oReq.onload = resolve
      oReq.send(File)
    })
  }

  const handleSubmit = async () => {
    setNameMsg(false)
    setDescriptionMsg(false)
    setCoinsMsg(false)
    setImageMsg(false)
    setProbabilityMsg1(false)
    setProbabilityMsg2(false)
    setProbabilityMsg3(false)
    setProbabilityMsg4(false)
    setProbabilityMsg5(false)
    setProbabilityMsg6(false)

    if (name === '') {
      setNameMsg(true)
      return
    }
    if (description === '') {
      setDescriptionMsg(true)
      return
    }
    if (image === null) {
      setImageMsg(true)
      return
    }
    if (coins === 0) {
      setCoinsMsg(true)
      return
    }
    if (probability1 === '') {
      setProbabilityMsg1(true)
      return
    }
    if (probability2 === '') {
      setProbabilityMsg2(true)
      return
    }
    if (probability3 === '') {
      setProbabilityMsg3(true)
      return
    }
    if (probability4 === '') {
      setProbabilityMsg4(true)
      return
    }
    if (probability5 === '') {
      setProbabilityMsg5(true)
      return
    }
    if (probability6 === '') {
      setProbabilityMsg6(true)
      return
    }

    setNameMsg(false)
    setDescriptionMsg(false)
    setCoinsMsg(false)
    setImageMsg(false)
    setProbabilityMsg1(false)
    setProbabilityMsg2(false)
    setProbabilityMsg3(false)
    setProbabilityMsg4(false)
    setProbabilityMsg5(false)
    setProbabilityMsg6(false)

    let runsProbability: RunsProbability[] = [
      {
        run: 0,
        reward: 'out',
        probabilityPercentage: Number(probability1)
      },
      {
        run: 1,
        reward: 1,
        probabilityPercentage: Number(probability2)
      },
      {
        run: 2,
        reward: 2,
        probabilityPercentage: Number(probability3)
      },
      {
        run: 3,
        reward: 4,
        probabilityPercentage: Number(probability4)
      },
      {
        run: 4,
        reward: 'Free Ball',
        probabilityPercentage: Number(probability5)
      },
      {
        run: 6,
        reward: 'prize',
        probabilityPercentage: Number(probability6)
      }
    ]
    const params: PrizeData = {
      image,
      name,
      description,
      coins,
      runsProbability
    }
    props?.addPrizes(params)
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add Prizes</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  placeholder="Enter Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                />
              </Grid>
              {nameMsg && <p style={{ color: 'red' }}>Name cannot be empty</p>}

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  placeholder="Enter Description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value)
                  }}
                />
              </Grid>
              {descriptionMsg && <p style={{ color: 'red' }}>Description cannot be empty</p>}

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="images">Image</FormLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    setFiles(event.target.files?.[0]!)
                    console.log(event.target.files?.[0]!)
                    getPreSignedUrl(event.target.files?.[0]?.name!, event.target.files?.[0]?.type!)
                  }}
                />
                {Files == null ? null : <img src={URL.createObjectURL(Files)} />}
              </Grid>
              {imageMsg && <p style={{ color: 'red' }}>Image cannot be empty</p>}

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="coins">Coins</FormLabel>

                <NumberInput
                  placeholder="Enter Coins"
                  value={coins}
                  defaultValue={0}
                  min={0}
                  max={100}
                  onChange={(value) => setCoins(Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Grid>
              {coinsMsg && <p style={{ color: 'red' }}>Coin cannot be empty</p>}

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="probability">Probability</FormLabel>
                <>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Runs</Th>
                        <Th>Reward</Th>
                        <Th> Probability</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>0</Td>
                        <Td>out</Td>
                        <Td>
                          <Input
                            value={probability1}
                            onChange={(event) => {
                              setProbability1(event.target.value.replace(/[^0-9]/gi, ''))
                            }}
                          />
                          {probabilityMsg1 && <p style={{ color: 'red' }}>Probability1 cannot be empty</p>}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>1</Td>
                        <Td>1</Td>
                        <Td>
                          <Input
                            value={probability2}
                            onChange={(event) => {
                              setProbability2(event.target.value.replace(/[^0-9]/gi, ''))
                            }}
                          />
                          {probabilityMsg2 && <p style={{ color: 'red' }}>Probability2 cannot be empty</p>}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>2</Td>
                        <Td>2</Td>
                        <Td>
                          <Input
                            value={probability3}
                            onChange={(event) => {
                              setProbability3(event.target.value.replace(/[^0-9]/gi, ''))
                            }}
                          />
                          {probabilityMsg3 && <p style={{ color: 'red' }}>Probability3 cannot be empty</p>}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>3</Td>
                        <Td>4</Td>
                        <Td>
                          <Input
                            value={probability4}
                            onChange={(event) => {
                              setProbability4(event.target.value.replace(/[^0-9]/gi, ''))
                            }}
                          />
                          {probabilityMsg4 && <p style={{ color: 'red' }}>Probability4 cannot be empty</p>}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>4</Td>
                        <Td>Free Ball</Td>
                        <Td>
                          <Input
                            value={probability5}
                            onChange={(event) => {
                              setProbability5(event.target.value.replace(/[^0-9]/gi, ''))
                            }}
                          />
                          {probabilityMsg5 && <p style={{ color: 'red' }}>Probability5 cannot be empty</p>}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>6</Td>
                        <Td>Prize</Td>
                        <Td>
                          <Input
                            value={probability6}
                            onChange={(event) => {
                              setProbability6(event.target.value.replace(/[^0-9]/gi, ''))
                            }}
                          />
                          {probabilityMsg6 && <p style={{ color: 'red' }}>Probability6 cannot be empty</p>}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </>
              </Grid>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button colorScheme="green" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={handleSubmit} disabled={props?.isLoading}>
              {props?.isLoading ? <Spinner /> : 'Add'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddPrizes
