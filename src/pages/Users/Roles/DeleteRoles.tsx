import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner
} from '@chakra-ui/react'

import { RoleResults } from '@/types/users/Roles'

export interface ManagePageProps {
  isOpen: boolean
  onClose: any
  isLoading: boolean
  rowId: string
  deleteRole: any
}

const DeleteRoles: React.FC<ManagePageProps> = (props) => {
  const cancelRef = React.useRef<any | undefined>()

  const handleDelete = () => {
    let params = {
      rowId: props?.rowId
    }
    props.deleteRole(params)
  }
  return (
    <>
      <AlertDialog isOpen={props?.isOpen} onClose={props?.onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Role
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You want tp delete this role.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props?.onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                {props?.isLoading ? <Spinner /> : 'Delete'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteRoles
