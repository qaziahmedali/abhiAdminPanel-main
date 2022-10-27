import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { useDisclosure, Flex, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";

type ActionConfirmProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  content?: string;
  isOpen: boolean;
};

const ActionConfirm: React.FC<ActionConfirmProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (props.isOpen) onOpen();
    else onClose();
  }, [props.isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="lg"
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{props.title || "Are you sure?"}</ModalHeader>

          <ModalBody mb="4">
            <Text>
              {props.content || "You will not be able undo your action!"}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Flex w="full" justifyContent="flex-end">
              <Button
                mr={4}
                colorScheme="gray"
                onClick={() => {
                  onClose();
                  props.onCancel && props.onCancel();
                }}
              >
                Cancel
              </Button>
              <Button
                bg="#7367F0"
                colorScheme="white"
                onClick={() => {
                  onClose();
                  props.onConfirm && props.onConfirm();
                }}
              >
                Confirm
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ActionConfirm;
