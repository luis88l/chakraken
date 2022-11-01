import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  ResponsiveValue,
} from "@chakra-ui/react";
import React, { FC } from "react";

export interface KDrawerProps {
  /**
   * Este es el color del Boton.
   */
  colorScheme:
    | (string & {})
    | "whiteAlpha"
    | "blackAlpha"
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink"
    | "linkedin"
    | "facebook"
    | "messenger"
    | "whatsapp"
    | "twitter"
    | "telegram"
    | undefined;
  /**
   * Este es el titulo del Boton.
   */
  titleBtnDrawer: string;
  /**
   * Esta es la posicion donde se alineara.
   */
  placement?: "right" | "left";
  /**
   * Este es el titulo del drawer
   */
  title: string;
  /**
   * Este es el texto que aparecera por encima al escribir en el Drawer.
   */
  placeholder?: string;
  /**
   * Este es el estilo que llevara el boton
   * (ghost, solid, outline)
   */
  variant?:
    | ResponsiveValue<
        (string & {}) | "link" | "outline" | "ghost" | "solid" | "unstyled"
      >
    | undefined;
  /**
   * Este es color del boton situado en la Parte izquierda
   */
  colorCancel: string;
  /**
   * Este es el margen que se aplicara al Drawer.
   */
  mr: string;
  /**
   * Este es el titulo del boton situado en la parte izquierda
   */
  titleBtnCancel: string;
  /**
   * Este es el color del boton situado a la derecha
   */
  secondColorScheme:
    | (string & {})
    | "whiteAlpha"
    | "blackAlpha"
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink"
    | "linkedin"
    | "facebook"
    | "messenger"
    | "whatsapp"
    | "twitter"
    | "telegram"
    | undefined;
  /**
   * Este es el titulo del boton situado a la derecha
   */
  titleBtnSave: string;
  /**
   * Este es el tamaño del boton
   */
  size: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs"> | undefined;
}

const KDrawer: FC<KDrawerProps> = ({
  colorScheme,
  titleBtnDrawer,
  placement,
  title,
  placeholder,
  variant,
  colorCancel,
  mr,
  titleBtnCancel,
  secondColorScheme,
  titleBtnSave,
  size,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme={colorScheme} size={size} onClick={onOpen}>
        {titleBtnDrawer}
      </Button>
      <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>
            <Input placeholder={placeholder} />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant={variant}
              mr={mr}
              colorScheme={colorCancel}
              onClick={onClose}
            >
              {titleBtnCancel}
            </Button>
            <Button colorScheme={secondColorScheme}>{titleBtnSave}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default KDrawer;
