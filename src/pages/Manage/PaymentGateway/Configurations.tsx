import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import { Button, Flex, Text, Spacer, Tooltip, Spinner } from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'

import _ from 'lodash'

export interface ConfigurationProps {}

const my_json_object = {
  data: ['users', 'admin', 'manager'],
  a: 1,
  b: 2,
  roles: {
    admin: 2,
    users: 10
  }
}

const Configuration: React.FC<ConfigurationProps> = (props) => {
  const { getDefaultValues, updateDefaultValues } = useEasyActions((actions) => actions.manage)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [values, setValues] = useState<any | null>({})

  const oneLinkDefaultValues = useEasyState((state) => state.manage.oneLinkDefaultValues)

  React.useEffect(() => {
    defaultValues()
  }, [])

  const defaultValues = async () => {
    await getDefaultValues()
  }

  const editDefaultValues = async () => {
    setIsLoading(true)
    setAlert(false)
    setSuccess(false)
    console.log('values', values.updated_src)

    let updatedSettings = {
      settingsJson: values.updated_src
    }

    console.log(updatedSettings)
    if (!_.isEmpty(values)) {
      updateDefaultValues(updatedSettings)
        .then((res: any) => {
          setSuccess(true)
          setIsLoading(false)
        })
        .catch(() => {
          setAlert(true)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ReactJson
        src={oneLinkDefaultValues && oneLinkDefaultValues[0] && oneLinkDefaultValues[0].settingsJson}
        theme="monokai"
        onEdit={(data) => {
          setValues(data)
        }}
      />
      <Flex>
        <Button
          disabled={_.isEmpty(values.updated_src)}
          m="5"
          bg="#7367F0"
          colorScheme="#ffffff"
          onClick={editDefaultValues}
        >
          {isLoading ? <Spinner /> : 'Update'}
        </Button>
        {success && (
          <Text color="green" m="7">
            Successfully Added
          </Text>
        )}

        {alert && (
          <Text color="red" m="7">
            Something went wrong
          </Text>
        )}
      </Flex>
    </>
  )
}

export default Configuration
