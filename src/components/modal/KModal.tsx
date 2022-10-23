import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

interface KModalProps {
  BtnTitle: string;
  ModalHeaderTitle: string;
  ModalBodyTitle: string;
  ColorBtnCancel: string;
  TxtBtnClose: string;
  TxtBtnSave: string;
  variant: string;
  ColorBtnSave: string;
}

function KModal(props: KModalProps): any {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}> {props.BtnTitle} </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.ModalHeaderTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.ModalBodyTitle}</ModalBody>

          <ModalFooter>
            <Button colorScheme={props.ColorBtnCancel} mr={3} onClick={onClose}>
              {props.TxtBtnClose}
            </Button>
            <Button variant={props.variant} colorScheme={props.ColorBtnSave}>
              {props.TxtBtnSave}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default KModal;
