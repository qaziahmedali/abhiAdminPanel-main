import React, { useState } from "react";
import {
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ReactJson from "react-json-view";
import _ from "lodash";
import LoadingSpinner from "../../../components/common/Spinner";
import { IFetchTitleResponse } from "@/types/store-types";

export interface ShowTitleProps {
  isOpen: boolean;
  onClose: () => void;
  titleData: false | IFetchTitleResponse;
  isTitleLoading: boolean;
}

const ShowTitle: React.FC<ShowTitleProps> = (props) => {
  const [isLoading, setisLoading] = useState(false)

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="2xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Title Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!props.isTitleLoading ? (
            (props.titleData) ? (
              <ReactJson src={props.titleData} theme="monokai" />
            ) : (
              <Text color="red"> Title details are not available </Text>
            )
          ) : (
            <Stack m="20">
              <LoadingSpinner />
            </Stack>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ShowTitle
