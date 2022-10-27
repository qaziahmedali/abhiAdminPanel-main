import React, { useState } from 'react'
import { Table, Td, Tbody, Grid, FormLabel, Stack, Input, Thead, Tr, Th } from '@chakra-ui/react'
import { PrizesResult } from '@/types/Manage/PrizesType'

export interface ViewPrizeProps {
  prizeData: PrizesResult | null
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
const ViewPrize: React.FC<ViewPrizeProps> = (props) => {
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
  const [Files, setFiles] = useState<File>()
  const [imageMsg, setImageMsg] = useState<boolean>(false)
  return (
    <Stack spacing="24px">
      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          disabled
          value={props?.prizeData?.name}
          // onChange={(event) => setIndustry(event.currentTarget.value)}
        />
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
        <FormLabel htmlFor="coins">Coins/ball</FormLabel>
        <Input
          disabled
          value={props?.prizeData?.coins}
          // onChange={(event) => setIndustry(event.currentTarget.value)}
        />
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
        <FormLabel htmlFor="gameModel">Game Model</FormLabel>
      </Grid>

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
              {props?.prizeData?.runsProbability.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.run}</Td>
                  <Td>{item.reward}</Td>
                  <Td>
                    <Input
                      value={item.probabilityPercentage}
                      // onChange={(event) => {
                      // 	setProbability1(
                      // 		event.target.value.replace(/[^0-9]/gi, "")
                      // 	);
                      // }}
                    />
                    {/* {probabilityMsg1 && (
											<p style={{ color: "red" }}>
												Probability1 cannot be empty
											</p>
										)} */}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      </Grid>
    </Stack>
  )
}

export default ViewPrize
