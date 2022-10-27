import React, { useState } from 'react'
import {
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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ISendTestEmailPayload, IUpdateEmailTemplatePayload } from "@/types/Manage/EmailTemplateType";
import { DeepMap, DeepPartial, FieldError, useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { Actions, useStoreActions } from "easy-peasy";
import { IStoreModel } from "@/types/store-types";
import { encodeToBase64 } from "@/utils/helper";

export interface ISendTestEmailProps {
  emailTemplate: IUpdateEmailTemplatePayload | null
  setMode: (mode: string) => void
  parentErrors: DeepMap<DeepPartial<IUpdateEmailTemplatePayload>, FieldError>
}

type TFormData = {
  recipient: string
}

const SendTestEmail: React.FC<ISendTestEmailProps> = ({ emailTemplate, setMode, parentErrors }) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const dispatchSendTestEmail = useStoreActions((actions: Actions<IStoreModel>) => actions.manage.sendTestEmailTemplate)
  const onSubmit = async (data: TFormData) => {
    if (parentErrors && Object.keys(parentErrors).length > 0) {
      setMode('edit')
      return
    }
    setIsLoading(true)
    if (emailTemplate) {
      emailTemplate.emailBody = encodeToBase64(emailTemplate.emailBody);
      const payload: ISendTestEmailPayload = {
        ...data,
        ...emailTemplate
      }
      delete payload.id
      try {
        const res = await dispatchSendTestEmail(payload)
        toast({
          title: 'Email Sent',
          description: res.data.message,
          status: res.data.status,
          duration: 5000
        })
      } catch (err: any) {
        toast({
          title: 'Email Sending Failed',
          description: 'Sorry, Email Sending Failed',
          status: 'error',
          duration: 5000
        })
      }
      setIsLoading(false)
    }
  }
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      recipient: ''
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalContent>
        <ModalHeader>Send Email Template</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={Boolean(errors && errors.recipient && errors.recipient.message)}>
            <Input
              placeholder="Write email e.g. a@b.c"
              type={'text'}
              {...register('recipient', {
                required: {
                  value: true,
                  message: 'Email is required'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                  message: 'Email is invalid'
                }
              })}
            />
            {errors && errors.recipient && (
              <FormErrorMessage fontWeight={'bold'}>{errors.recipient.message}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Flex justifyContent="flex-end">
            <GridItem mr={'1'}>
              <Button bg="#7367F0" colorScheme="#ffffff" type="button" onClick={() => setMode('edit')}>
                Back
              </Button>
            </GridItem>
            <GridItem>
              <Button bg="#7367F0" colorScheme="#ffffff" type="submit" disabled={isLoading} leftIcon={<FiSend />}>
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </GridItem>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </form>
  )
}

export default SendTestEmail
