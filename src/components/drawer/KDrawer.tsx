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
} from "@chakra-ui/react";
import React from "react";

interface KDrawerProps {
  colorScheme: string;
  /**
   * Este es el titulo del Boton.
   */
  titleBtnDrawer: string;
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
  variant: string;
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
  secondColorScheme: string;
  /**
   * Este es el titulo del boton situado a la derecha
   */
  titleBtnSave: string;
  /**
   * Este es el tamaño del boton
   */
  size: string;
}

function KDrawer(props: KDrawerProps): any {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        colorScheme={props.colorScheme}
        size={props.size}
        onClick={onOpen}
      >
        {props.titleBtnDrawer}
      </Button>
      <Drawer isOpen={isOpen} placement={props.placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{props.title}</DrawerHeader>

          <DrawerBody>
            <Input placeholder={props.placeholder} />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant={props.variant}
              mr={props.mr}
              colorScheme={props.colorCancel}
              onClick={onClose}
            >
              {props.titleBtnCancel}
            </Button>
            <Button colorScheme={props.secondColorScheme}>
              {props.titleBtnSave}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default KDrawer;
