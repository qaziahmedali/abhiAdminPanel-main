import React, { useState } from 'react'
import {
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
  Input,
  FormHelperText,
  FormControl,
  Textarea,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
// Require FroalaEditor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins/code_view.min.js'
import 'froala-editor/js/plugins/emoticons.min.js'

// Require FroalaEditor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'
import { Actions, useStoreActions } from 'easy-peasy'
import { IStoreModel } from '@/types/store-types'
import { encodeToBase64 } from '@/utils/helper'

export interface AddEmailProps {
  isOpen: boolean
  onClose: () => void
}

export interface ICreateEmailTemplateFormData {
  name: string
  description: string
  emailSubject: string
  emailBody: string
  emailType: string
  language: string
}

const AddEmail: React.FC<AddEmailProps> = (props) => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const dispatchCreateEmailTemplate = useStoreActions(
    (actions: Actions<IStoreModel>) => actions.manage.createEmailTemplate
  )

  const onSubmit = async (data: ICreateEmailTemplateFormData) => {
    setIsLoading(true)
    data.emailBody = encodeToBase64(data.emailBody)
    try {
      const res = await dispatchCreateEmailTemplate(data)
      toast({
        title: 'Email Template Created',
        description: 'Email Template Created Successfully',
        status: res.data.status,
        duration: 5000,
        isClosable: true
      })
      props.onClose()
    } catch (err) {
      toast({
        title: 'Email Template Create Failed',
        description: 'Sorry, Email Template Create Failed',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    setIsLoading(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
      emailSubject: '',
      emailBody: '',
      emailType: 'user',
      language: 'en'
    }
  })

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Email Templates</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <FormControl mb={4} isInvalid={Boolean(errors && errors.name)}>
                  <FormLabel htmlFor="name" fontWeight={'bold'}>
                    Name *
                  </FormLabel>
                  <Input
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Name is required'
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_-]*$/,
                        message: 'Name can only contain letters, numbers, underscores and dashes'
                      }
                    })}
                    id="name"
                    placeholder="e.g. 1link_failure_en"
                  />
                  <FormHelperText fontSize={'10px'} mb={1}>
                    Should not contain spaces or special characters except "_"
                  </FormHelperText>
                  {errors && errors.name && errors.name.message && (
                    <FormErrorMessage fontWeight={'bold'} fontSize={'12px'}>
                      {errors.name.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mb={4} isInvalid={Boolean(errors && errors.description)}>
                  <FormLabel htmlFor="description" fontWeight={'bold'}>
                    Description
                  </FormLabel>
                  <Textarea
                    {...register('description')}
                    id="description"
                    placeholder="e.g. Email template for failure email"
                  />
                </FormControl>

                <FormControl mb={4} isInvalid={Boolean(errors && errors.emailSubject)}>
                  <FormLabel htmlFor="emailSubject" fontWeight={'bold'}>
                    Email Subject *
                  </FormLabel>
                  <Input
                    placeholder="e.g. Advance Transaction Failed"
                    {...register('emailSubject', {
                      required: {
                        value: true,
                        message: 'Email Subject is required'
                      }
                    })}
                    id="emailSubject"
                  />
                  {errors && errors.emailSubject && errors.emailSubject.message && (
                    <FormErrorMessage fontWeight={'bold'} fontSize={'12px'}>
                      {errors.emailSubject.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mb={4} isInvalid={Boolean(errors && errors.emailBody)}>
                  <FormLabel htmlFor="emailBody" fontWeight={'bold'}>
                    Email Body *
                  </FormLabel>
                  <FroalaEditor
                    config={{
                      toolbarSticky: false
                    }}
                    model={getValues('emailBody')}
                    tag="textarea"
                    {...register('emailBody', {
                      required: {
                        value: true,
                        message: 'Email Body is required'
                      }
                    })}
                    onModelChange={function (editorText: string) {
                      setValue('emailBody', editorText)
                    }}
                  />
                  {errors && errors.emailBody && errors.emailBody.message && (
                    <FormErrorMessage fontWeight={'bold'} fontSize={'12px'}>
                      {errors.emailBody.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button colorScheme="green" mr={3} onClick={props.onClose}>
                Cancel
              </Button>
              <Button type="submit" bg="#7367F0" colorScheme="#ffffff" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  )
}

export default AddEmail
