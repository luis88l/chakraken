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
  } 
    from '@chakra-ui/react';
    import React from 'react';

  function KDrawer(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
      <>
        <Button ref={btnRef} colorScheme={props.colorScheme} size={props.size} onClick={onOpen}>
          {props.titleBtnDrawer}
        </Button>
        <Drawer
          isOpen={isOpen}
          placement={props.placement}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{props.title}</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder={props.placeholder} />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant={props.variant} mr={props.mr} colorScheme={props.colorCancel} onClick={onClose}>
                {props.titleBtnCancel}
              </Button>
              <Button colorScheme={props.secondColorScheme}>{props.titleBtnSave}</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default KDrawer;