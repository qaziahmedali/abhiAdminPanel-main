import React, { useState, useEffect } from 'react'
import ReactJson from 'react-json-view'

import { JsonConfigPrivate, JsonConfigPublic } from '@/types/organizations/organizationById'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { Box, Button, Flex, Stack, useToast } from '@chakra-ui/react'

export interface PoliciesProps {
  organizationConfigurations: any
}

type JSONConfig = {
  jsonConfig: JsonConfigPublic
  jsonConfigPrivate: JsonConfigPrivate
}

const Policies: React.FC<PoliciesProps> = (props) => {
  const toast = useToast()

  const [policies, setPolicies] = useState<any | null>([])

  const [jsonConfigs, setJSONConfig] = useState<Partial<JSONConfig>>({})

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (props.organizationConfigurations) {
      console.log(props.organizationConfigurations)
      const { jsonConfig, jsonConfigPrivate } = props.organizationConfigurations?.[0]

      setPolicies(props.organizationConfigurations)

      setJSONConfig({ jsonConfig, jsonConfigPrivate })
    }
  }, [props.organizationConfigurations])

  const updateOrganizationConfiguration = async () => {
    setLoading(true)

    try {
      const { id } = policies[0]

      const { jsonConfig, jsonConfigPrivate } = jsonConfigs

      const payload = { initiator: 'admin_web', jsonConfig, jsonConfigPrivate }

      await apiManager.fetch({
        name: 'OrganizationUpdateOrganizationConfiguration',
        pathVariables: { id },
        data: payload
      })

      toast({
        title: 'Update organization configurations successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (e: any) {
      toast({
        title: 'Update organization configurations failed!',
        description: e.message || 'Something was wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box ml="2" width="80%" borderWidth={1} p={4} float="left">
        <Stack spacing="24px" style={{ textAlign: 'left' }}>
          {jsonConfigs && (
            <ReactJson
              src={jsonConfigs}
              theme="monokai"
              onEdit={({ updated_src }) => setJSONConfig(updated_src)}
              onAdd={({ updated_src }) => {
                const {
                  jsonConfigPrivate: { pointsOfContact, additionPOCEmail, POCPhoneNo, additionPOCPhoneNo },
                  jsonConfig: { salaryBlackoutPeriod }
                } = updated_src as JSONConfig

                const {
                  pointsOfContact: originPointsOfContact = [],
                  additionPOCEmail: originAdditionPOCEmail = [],
                  POCPhoneNo: originPOCPhoneNo = [],
                  additionPOCPhoneNo: originAdditionPOCPhoneNo = []
                } = jsonConfigs?.jsonConfigPrivate || {}

                const { salaryBlackoutPeriod: originSalaryBlackoutPeriod = [] } = jsonConfigs?.jsonConfig || {}
                return (
                  additionPOCEmail.length !== originAdditionPOCEmail.length ||
                  pointsOfContact.length !== originPointsOfContact.length ||
                  POCPhoneNo.length !== originPOCPhoneNo.length ||
                  additionPOCPhoneNo.length !== originAdditionPOCPhoneNo.length ||
                  salaryBlackoutPeriod?.length !== originSalaryBlackoutPeriod.length
                )
              }}
            />
          )}
        </Stack>
      </Box>

      <Flex w="full" justifyContent="flex-end" mt="4">
        <Button
          colorScheme="green"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={updateOrganizationConfiguration}
        >
          Update
        </Button>
      </Flex>
    </>
  )
}

export default Policies
