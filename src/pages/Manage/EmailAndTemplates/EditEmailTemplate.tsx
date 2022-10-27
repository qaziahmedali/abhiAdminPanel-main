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
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react'
// Require FroalaEditor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins/code_view.min.js'
import 'froala-editor/js/plugins/emoticons.min.js'

// Require FroalaEditor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import FroalaEditor from 'react-froala-wysiwyg'
import { IUpdateEmailTemplatePayload } from '@/types/Manage/EmailTemplateType'
import { useForm } from 'react-hook-form'
import SendTestEmail from './SendTestEmail'
import { Actions, useStoreActions } from 'easy-peasy'
import { IStoreModel } from '@/types/store-types'
import { encodeToBase64 } from '@/utils/helper'

export interface EditEmailProps {
  isOpen: boolean
  emailTemplate: IUpdateEmailTemplatePayload | null
  setTemplate: (row: any) => Promise<void>
  onClose: () => void
  getEmailTemplatesData: () => Promise<void>
}

const EditEmailTemplate: React.FC<EditEmailProps> = (props) => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('edit')
  const dispatchUpdateEmailTemplate = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.manage.updateEmailTemplate
  )

  const onSubmit = async (data: IUpdateEmailTemplatePayload) => {
    setIsLoading(true)
    data.emailBody = encodeToBase64(data.emailBody)
    try {
      const res = await dispatchUpdateEmailTemplate(data)
      toast({
        title: 'Email Template Updated',
        description: res.data.message,
        status: res.data.status,
        duration: 5000,
        isClosable: true
      })
      props.getEmailTemplatesData()
    } catch (err) {
      toast({
        title: 'Email Template Update Failed',
        description: 'Sorry, Email Template Update Failed',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    setIsLoading(false)
  }
  const {
    handleSubmit,
    setValue,
    register,
    getValues,
    formState: { errors },
    trigger
  } = useForm<IUpdateEmailTemplatePayload>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      emailSubject: props.emailTemplate?.emailSubject || '',
      emailBody: props.emailTemplate?.emailBody || '',
      id: props.emailTemplate?.id || ''
    }
  })
  const submitButtonText = isLoading ? 'Updating...' : 'Update'
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      {mode === 'edit' ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Edit Email Template</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={Boolean(errors && errors.emailSubject && errors.emailSubject.message)}>
                <FormLabel htmlFor="emailSubject" fontWeight={'bold'} fontSize={'sm'}>
                  Email Subject:
                </FormLabel>
                <Input
                  type={'text'}
                  {...register('emailSubject', {
                    required: {
                      value: true,
                      message: 'Email Subject is required.'
                    },
                    maxLength: {
                      value: 998,
                      message: 'Email Subject cannot be more than 100 characters.'
                    }
                  })}
                />
                <FormErrorMessage fontSize={'smaller'} fontWeight="bold">
                  {errors && errors.emailSubject && errors.emailSubject.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel htmlFor="emailBody" fontWeight={'bold'} fontSize={'sm'}>
                  Email Body:
                </FormLabel>
              </FormControl>
              <FroalaEditor
                model={getValues('emailBody')}
                tag="textarea"
                {...register('emailBody', { required: true })}
                onModelChange={function (editorText: string) {
                  setValue('emailBody', editorText)
                }}
              />
            </ModalBody>

            <ModalFooter>
              <Flex justifyContent="flex-end">
                <GridItem mr={'1'}>
                  <Button
                    bg="#7367F0"
                    colorScheme="#ffffff"
                    type="button"
                    onClick={() => {
                      setMode('testEmail')
                      trigger() // run validation before switching to test email
                    }}
                  >
                    Send Test Email
                  </Button>
                </GridItem>
                <GridItem>
                  <Button bg="#7367F0" colorScheme="#ffffff" type="submit" disabled={isLoading}>
                    {submitButtonText}
                  </Button>
                </GridItem>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      ) : (
        <SendTestEmail
          {...{
            setMode,
            emailTemplate: getValues(),
            parentErrors: errors
          }}
        />
      )}
    </Modal>
  )
}

export default EditEmailTemplate
