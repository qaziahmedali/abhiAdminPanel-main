import {
  Button,
  Flex,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import ActionConfirm from "./ActionConfirm";
import { useAbhiToast } from "@/Hook/useAbhiToast";

type SendBulkSMSProps = {
  onSubmit: (message: string) => void;
  onChangePushToAll?: (state: boolean) => void;
  label?: string;
  modalLabel?: string;
  isLoading?: boolean;
  isSendToAll?: boolean;
};

export const SendBulkSMS: React.FC<SendBulkSMSProps> = (props) => {
  const toast = useAbhiToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openActionConfirm, setOpenActionConfirm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.isLoading === false && message) {
      setMessage("");
      onClose();
    }
  }, [props.isLoading]);

  const onConfirm = () => {

    setOpenActionConfirm(false);
    if (message.length === 0) {
      return toast.error("Please input SMS message!");
    }
    props.onSubmit(message);
  };

  return (
    <>
      <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={onOpen}>
        {props.modalLabel || "Send SMS"}
      </Button>

      <ActionConfirm
        isOpen={openActionConfirm}
        onConfirm={onConfirm}
        onCancel={() => setOpenActionConfirm(false)}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="2xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{props.label || "Send SMS"}</ModalHeader>
            <ModalCloseButton disabled={props.isLoading} />

            <ModalBody mb="4">
              {typeof props.isSendToAll === "boolean" && (
                <Flex>
                  <FormLabel htmlFor="push-to-all" mb="4">
                    Send SMS to all organization?
                    {props.isSendToAll}
                  </FormLabel>
                  <Switch
                    isChecked={props.isSendToAll}
                    onChange={(e) => {
                      props.onChangePushToAll &&
                        props.onChangePushToAll(e.target.checked);
                    }}
                  />
                </Flex>
              )}

              <Textarea
                disabled={props.isLoading}
                onChange={(v) => setMessage(v.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Flex w="full" justifyContent="flex-end">
                <Button
                  mr={4}
                  colorScheme="gray"
                  onClick={onClose}
                  isDisabled={props.isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => setOpenActionConfirm(true)}
                  bg="#7367F0"
                  colorScheme="white"
                  isLoading={props.isLoading}
                >
                  Push
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
