import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input,
  Spinner
  // Box,
} from '@chakra-ui/react'
// import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
// import { useEasyActions, useEasyState } from "@/store/hooks";
// import { OrganizationResults } from "@/types/organizations/organizations";
import { RoleResults } from '@/types/users/Roles'

export interface ManagePageProps {
  isOpen: boolean
  onClose: any
  isLoading: boolean
  updateRole: any
  rowData: RoleResults | undefined
}

const UpdateRoles: React.FC<ManagePageProps> = (props) => {
  const [name, setName] = useState('')
  const [roleType, setRoleType] = useState('')
  const [roleTypeMsg, setRoleTypeMsg] = useState<boolean>(false)
  const [nameMsg, setNameMsg] = useState<boolean>(false)
  // const [organizationMsg, setOrganizationMsg] = useState<boolean>(false);
  // const [organization, setOrganization] = React.useState<Option[]>([]);
  // const [offset, setOffset] = useState<number>(1);
  // const { allOrganizations } = useEasyState((state) => state.organization);
  // const { getOrganizationNames } = useEasyActions(
  //   (state) => state.organization
  // );
  // useEffect(() => {
  //   getAllOrganizationNames();
  // }, []);

  // const getAllOrganizationNames = async () => {
  //   let params = {
  //     limit: Number.MAX_SAFE_INTEGER,
  //     offset,
  //   };
  //   const OrgData: OrganizationResults[] = await getOrganizationNames(params);
  // };
  // let options = allOrganizations?.map((item, index) => ({
  //   value: item.id,
  //   label: item.name,
  // }));

  useEffect(() => {
    setRoleType(props?.rowData?.roleType ? props?.rowData?.roleType : '')
    setName(props?.rowData?.name ? props?.rowData?.name : '')
  }, [props?.isOpen])

  const handleSubmit = async () => {
    setNameMsg(false)
    setRoleTypeMsg(false)
    // setOrganizationMsg(false);
    // if (organization.length == 0) {
    //   setOrganizationMsg(true);
    //   return;
    // }
    if (name == '') {
      setNameMsg(true)
      return
    }
    if (roleType == '') {
      setRoleTypeMsg(true)
      return
    }

    setNameMsg(false)
    setRoleTypeMsg(false)
    // setOrganizationMsg(false);
    const params = {
      // organizationId: organization?.[0]?.value,
      name,
      roleType,
      rowId: props?.rowData?.id
    }

    props?.updateRole(params)
  }

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        size="sm"
        // initialFocusRef={firstField}
        onClose={props.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add Roles</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              {/* <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="organization">Organization</FormLabel>
                <Box zIndex="1000" background="white">
                  {options[0] == null ? (
                    <Spinner />
                  ) : (
                    <Autocomplete
                      options={options}
                      allowCreation={true}
                      result={organization}
                      setResult={(options: Option[]) => {
                        if (options[0]) {
                          setOrganization([options[0]]);
                        } else {
                          setOrganization([]);
                        }
                      }}
                      placeholder="Search Organization"
                    />
                  )}
                </Box>
              </Grid> 
              {organizationMsg && (
                <p style={{ color: "red" }}>Organization cannot be empty</p>
              )}*/}
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input value={name} onChange={(event) => setName(event.currentTarget.value)} />
              </Grid>
              {nameMsg && <p style={{ color: 'red' }}>Name cannot be empty</p>}
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="roleType">Role Type</FormLabel>
                <Input value={roleType} onChange={(event) => setRoleType(event.currentTarget.value)} />
              </Grid>
              {roleTypeMsg && <p style={{ color: 'red' }}>RoleType cannot be empty</p>}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button colorScheme="green" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={handleSubmit}>
              {props?.isLoading ? <Spinner /> : 'Update'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UpdateRoles
