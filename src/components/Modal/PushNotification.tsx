import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/modal";

import {
  useDisclosure,
  Textarea,
  Flex,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  chakra,
  Switch,
  Select,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import ActionConfirm from "./ActionConfirm";

export type Notification = {
  title: string;
  message: string;
  youtubeLink?: string;
  type: "in-app" | "out-app";
};

type PushNotificationProps = {
  onSubmit: (notification: Notification) => void;
  onChangePushToAll?: (state: boolean) => void;
  label?: string;
  modalLabel?: string;
  isLoading?: boolean;
  isPushToAll?: boolean;
};

const PushNotification: React.FC<PushNotificationProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ reValidateMode: "onBlur" });

  const [openActionConfirm, setOpenActionConfirm] = React.useState(false);

  const notification = React.useRef<Notification>({
    title: "",
    message: "",
    youtubeLink: "",
    type: "in-app",
  });

  const onSubmit = (values: any) => {
    notification.current = values;
    setOpenActionConfirm(true);
  };

  const onConfirm = () => {
    setOpenActionConfirm(false);
    props.onSubmit(notification.current);
  };

  const isYoutubeLink = (link: string) => {
    if (link === "") return true;

    try {
      // const url = new URL(link);
      // return url.hostname === "www.youtube.com";
      // Remove validation for Youtube link
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    if (
      props.isLoading === false &&
      notification.current.title &&
      notification.current.message
    ) {
      notification.current = {
        title: "",
        message: "",
        youtubeLink: "",
        type: "in-app",
      };
      onClose();
    }
  }, [props.isLoading]);

  return (
    <>
      <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={onOpen}>
        {props.modalLabel || "Push Notification"}
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
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>{props.label || "Push notification"}</ModalHeader>
              <ModalCloseButton disabled={props.isLoading} />

              <ModalBody mb="4">
                <Flex mb="4">
                  <FormControl>
                    <FormLabel>Message type:</FormLabel>
                    <Select {...register("type")}>
                      <option value="in-app">In-App message</option>
                      <option value="out-app">Out-App message</option>
                    </Select>
                  </FormControl>

                  {typeof props.isPushToAll === "boolean" && (
                    <FormControl alignItems="center" ml={4}>
                      <FormLabel htmlFor="push-to-all" mb="4">
                        Push notification to all organization?
                        {props.isPushToAll}
                      </FormLabel>
                      <Switch
                        isChecked={props.isPushToAll}
                        onChange={(e) => {
                          props.onChangePushToAll &&
                            props.onChangePushToAll(e.target.checked);
                        }}
                      />
                    </FormControl>
                  )}
                </Flex>

                <FormControl isInvalid={Boolean(errors["title"])}>
                  <FormLabel>Title:</FormLabel>

                  <Input
                    disabled={props.isLoading}
                    {...register("title", {
                      required: "Please fill out this field!",
                    })}
                  />

                  <FormErrorMessage>
                    {errors["title"] && errors["title"].message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors["youtubeLink"])} mt="4">
                  <FormLabel>Youtube Link:</FormLabel>

                  <Input
                    disabled={props.isLoading}
                    {...register("youtubeLink", {
                      validate: isYoutubeLink,
                    })}
                  />

                  <FormErrorMessage>
                    {errors["youtubeLink"] &&
                      errors["youtubeLink"].type === "validate" &&
                      "Please input a valid Youtube Link"}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors["message"])} mt="4">
                  <FormLabel>Message:</FormLabel>

                  <Textarea
                    disabled={props.isLoading}
                    {...register("message", {
                      required: "Please fill out this field!",
                    })}
                  />

                  <FormErrorMessage>
                    {errors["message"] && errors["message"].message}
                  </FormErrorMessage>
                </FormControl>
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
                    type="submit"
                    bg="#7367F0"
                    colorScheme="white"
                    isLoading={props.isLoading}
                  >
                    Push
                  </Button>
                </Flex>
              </ModalFooter>
            </chakra.form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default PushNotification;
