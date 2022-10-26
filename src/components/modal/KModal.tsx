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
  /**
   * Este es el titulo del Boton
   */
  BtnTitle: string;
  /**
   * Este es el titulo del encabezado
   */
  ModalHeaderTitle: string;
  /**
   * Este es el titulo del Body del modal
   */
  ModalBodyTitle: string;
  /**
   * Este es el color del boton situado a la izquierda del Modal
   */
  ColorBtnCancel: string;
  /**
   * Este es el titulo del boton situado a la izquierda
   */
  TxtBtnClose: string;
  /**
   * Este es el titulo del boton situado a la derecha
   */
  TxtBtnSave: string;
  /**
   * Este es el estilo que llevara el boton
   * (ghost, solid, outline, unstyled)
   */
  variant: string;
  /**
   * Este es el color del boton situado a la derecha
   */
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
