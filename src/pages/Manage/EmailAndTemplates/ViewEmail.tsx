import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { Email, Item, Span, A, renderEmail } from 'react-html-email'

// Require FroalaEditor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'

// Require FroalaEditor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'
export interface ViewEmailProps {
  isOpen: boolean
  setTemplate: any
  emailSubject: string
  emailBody: string
  onClose: any
}

const emailHTML = renderEmail(
  <Email title="Hello World!">
    <Item align="center">
      <Span fontSize={20}>
        This is an example email made with:
        <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
      </Span>
    </Item>
  </Email>
)

const ViewEmail: React.FC<ViewEmailProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.emailSubject}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FroalaEditorView model={props.emailBody} />
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ViewEmail
