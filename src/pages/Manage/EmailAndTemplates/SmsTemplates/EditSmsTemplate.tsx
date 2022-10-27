import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  GridItem,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Textarea,
  FormErrorMessage
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Actions, useStoreActions } from 'easy-peasy'
import { IStoreModel } from '@/types/store-types'
import { ISMSTemplate, ISMSTemplateEditFormData } from '@/types/Manage/SMSTemplateType'
import { stripTags } from '@/utils/helper'

export interface IEditSMSTemplateProps {
  isOpen: boolean
  smsTemplate: ISMSTemplate | null
  onClose: () => void
  getSMSTemplatesHandler: () => Promise<void>
}

const EditSMSTemplate: React.FC<IEditSMSTemplateProps> = (props) => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('edit') // in case of sending test SMS
  const dispatchUpdateSmsTemplate = useStoreActions((actions: Actions<IStoreModel>) => actions.manage.updateSMSTemplate)

  const onSubmit = async (data: ISMSTemplateEditFormData) => {
    setIsLoading(true)
    try {
      data.smsBody = stripTags(data.smsBody)
      const res = await dispatchUpdateSmsTemplate(data)
      toast({
        title: 'SMS Template Updated',
        description: res.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      props.getSMSTemplatesHandler()
      props.onClose()
    } catch (err) {
      toast({
        title: 'SMS Template Update Failed',
        description: 'Sorry, SMS Template Update Failed',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    setIsLoading(false)
  }
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ISMSTemplateEditFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      smsBody: props.smsTemplate?.smsBody || '',
      id: props.smsTemplate?.id || ''
    }
  })
  const submitButtonText = isLoading ? 'Updating...' : 'Update'
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      {mode === 'edit' && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Edit SMS Template</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={Boolean(errors && errors.smsBody && errors.smsBody.message)} mt={2}>
                <FormLabel htmlFor="smsBody" fontWeight={'bold'} fontSize={'sm'}>
                  SMS Template Body:
                </FormLabel>
                <Textarea
                  {...register('smsBody', {
                    required: {
                      value: true,
                      message: 'SMS Template Body is required'
                    }
                  })}
                  defaultValue={props.smsTemplate?.smsBody || ''}
                ></Textarea>
                <FormErrorMessage>{errors && errors.smsBody && errors.smsBody.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Flex justifyContent="flex-end">
                <GridItem>
                  <Button bg="#7367F0" colorScheme="#ffffff" type="submit" disabled={isLoading}>
                    {submitButtonText}
                  </Button>
                </GridItem>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      )}
    </Modal>
  )
}

export default EditSMSTemplate
