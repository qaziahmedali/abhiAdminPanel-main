import React, { useState, useEffect } from 'react'
import { Select, Link, Flex, Spacer, Button, useDisclosure, Tooltip, Spinner } from '@chakra-ui/react'
import DataTable from 'react-data-table-component'
import { useEasyActions, useEasyState } from '@/store/hooks'
export interface TestPageProps {}

// const testData = [
// 	{
// 		id: 1,
// 		name: "Zohaib",
// 		email: "z@z.com",
// 		phone: "03088676664",
// 	},
// 	{
// 		id: 1,
// 		name: "Zohaib",
// 		email: "z@z.com",
// 		phone: "03088676664",
// 	},
// 	{
// 		id: 1,
// 		name: "Zohaib",
// 		email: "z@z.com",
// 		phone: "03088676664",
// 	},
// 	{
// 		id: 1,
// 		name: "Zohaib",
// 		email: "z@z.com",
// 		phone: "03088676664",
// 	},
// 	{
// 		id: 1,
// 		name: "Zohaib",
// 		email: "z@z.com",
// 		phone: "03088676664",
// 	},
// ];
const TestPage: React.FC<TestPageProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { TestUser } = useEasyState((State) => State.test)
  const { getTestsUsers } = useEasyActions((State) => State.test)
  useEffect(() => {
    getTestUserData()
  }, [])
  const getTestUserData = async () => {
    setIsLoading(true)
    const data = await getTestsUsers()
    console.log(data)
    if (data) {
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }
  const addHandler = () => {}
  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true
    }
  ]
  return (
    <>
      <Flex mb-5>
        <Spacer />
        <Button colorScheme="#fff" bg="#7367F0" mr={3} mt={5} onClick={addHandler}>
          Add Test Data
        </Button>
      </Flex>

      {isLoading ? <Spinner /> : <DataTable columns={columns} data={TestUser} pagination />}
    </>
  )
}

export default TestPage
