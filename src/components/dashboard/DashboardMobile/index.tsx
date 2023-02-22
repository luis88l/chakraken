import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import Dashboard from "../Dashboard";

interface DashboardProps {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  userOptions: void | undefined[] | any[];
}

export default function DashboardMobile(props: DashboardProps): any {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex justifyContent={"center"}>
      <Tooltip
        width="100%"
        label=""
        placement="bottom"
        bg="black"
        color="white"
      >
        <span
          style={{
            zIndex: 99999,
            position: "fixed",
            marginLeft: "calc(200% - 100px)",
            marginTop: "5px",
            textAlign: "center",
          }}
        >
          <Button color="black" onClick={onOpen} leftIcon={<HamburgerIcon />}>
            Menu
          </Button>
        </span>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent w={"80%"} bg="#020202">
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Box>
              <Dashboard
                userOptions={props.userOptions}
                cerrarModal={onClose}
              />
            </Box>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Flex>
  );
}
