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
  titleBtnDrawer: string;
  placement?: "right" | "left";
  title: string;
  placeholder?: string;
  variant: string;
  colorCancel: string;
  mr: string;
  titleBtnCancel: string;
  secondColorScheme: string;
  titleBtnSave: string;
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
