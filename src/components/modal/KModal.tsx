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
  ResponsiveValue,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KModalProps {
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
  variant?:
    | ResponsiveValue<
        "link" | "outline" | (string & {}) | "ghost" | "solid" | "unstyled"
      >
    | undefined;
  /**
   * Este es el color del boton situado a la derecha
   */
  ColorBtnSave: string;
}

const KModal: FC<KModalProps> = ({
  BtnTitle,
  ModalHeaderTitle,
  ModalBodyTitle,
  ColorBtnCancel,
  TxtBtnClose,
  variant,
  ColorBtnSave,
  TxtBtnSave,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}> {BtnTitle} </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ModalHeaderTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{ModalBodyTitle}</ModalBody>

          <ModalFooter>
            <Button colorScheme={ColorBtnCancel} mr={3} onClick={onClose}>
              {TxtBtnClose}
            </Button>
            <Button variant={variant} colorScheme={ColorBtnSave}>
              {TxtBtnSave}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default KModal;
