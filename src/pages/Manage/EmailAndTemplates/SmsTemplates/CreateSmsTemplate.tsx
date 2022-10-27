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
  FormErrorMessage,
  Input,
  FormHelperText,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Actions, useStoreActions } from 'easy-peasy'
import { IStoreModel } from '@/types/store-types'
import { ISMSTemplateCreateFormData } from '@/types/Manage/SMSTemplateType'
import { stripTags } from '@/utils/helper'
import { FaSmile } from 'react-icons/fa'
import Picker, { IEmojiData } from 'emoji-picker-react'

export interface ICreateSMSTemplateProps {
  isOpen: boolean
  onClose: () => void
  getSMSTemplatesHandler: () => Promise<void>
}

const CreateSMSTemplate: React.FC<ICreateSMSTemplateProps> = (props) => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('edit') // in case of sending test SMS
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const dispatchCreateSmsTemplate = useStoreActions((actions: Actions<IStoreModel>) => actions.manage.createSMSTemplate)

  const onSubmit = async (data: ISMSTemplateCreateFormData) => {
    setIsLoading(true)
    try {
      data.smsBody = stripTags(data.smsBody)
      const res = await dispatchCreateSmsTemplate(data)
      toast({
        title: 'SMS Template Created',
        description: res.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      props.getSMSTemplatesHandler()
      setIsLoading(false)
      props.onClose()
    } catch (err) {
      toast({
        title: 'Creating SMS Template Failed',
        description: 'Sorry, Creating SMS Template Failed',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      setIsLoading(false)
    }
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues
  } = useForm<ISMSTemplateCreateFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      smsBody: '',
      name: '',
      language: 'en',
      description: ''
    }
  })

  const handleEmojiPickerClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setValue('smsBody', `${getValues('smsBody')}${emojiObject.emoji}`)
  }

  const submitButtonText = isLoading ? 'Creating...' : 'Create'

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      {mode === 'edit' && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Create New SMS Template</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                    },
                    maxLength: {
                      value: 64,
                      message: 'Name cannot be more than 64 characters long'
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
                  {...register('description', {
                    maxLength: {
                      value: 256,
                      message: 'Description cannot be more than 256 characters long'
                    }
                  })}
                  id="description"
                  placeholder="e.g. Email template for failure email"
                />
                <FormErrorMessage>{errors && errors.description && errors.description.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors && errors.smsBody && errors.smsBody.message)} mt={2}>
                <FormLabel htmlFor="smsBody" fontWeight={'bold'} fontSize={'sm'}>
                  SMS Template Body:
                </FormLabel>
                <InputGroup alignItems={'stretch'}>
                  <Textarea
                    {...register('smsBody', {
                      required: {
                        value: true,
                        message: 'SMS Template Body is required'
                      },
                      maxLength: {
                        value: 500,
                        message: 'SMS Template Body cannot be more than 500 characters long'
                      }
                    })}
                  ></Textarea>
                  <InputRightElement height="80px" position="relative" alignItems={'center'}>
                    <IconButton
                      height={'100%'}
                      aria-label="Add Emoji"
                      icon={<FaSmile />}
                      onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                    />
                  </InputRightElement>
                </InputGroup>
                {isEmojiPickerOpen && (
                  <Picker
                    pickerStyle={{
                      width: '100%'
                    }}
                    onEmojiClick={handleEmojiPickerClick}
                    disableAutoFocus={true}
                    groupNames={{ smileys_people: 'PEOPLE' }}
                    native
                  />
                )}
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

export default CreateSMSTemplate
