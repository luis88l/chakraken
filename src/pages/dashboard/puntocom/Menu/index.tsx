import { getSession } from "next-auth/react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Box,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function MenuWeb(props: any): any {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  return (
    <div>
      <Button borderWidth="3px" borderColor={"#020202"} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bgColor={"#020202"}>
          <DrawerHeader
            textColor={"white"}
            fontWeight={"bold"}
            borderBottomWidth="1px"
          >
            Catálogos
          </DrawerHeader>
          <DrawerBody>
            <Box className="my-box">
              <Link href="/dashboard/mantenimiento" color={"white"}>
                Dominio
              </Link>
            </Box>
            <Box className="my-box">
              <Link href="/dashboard/mantenimiento" color={"white"}>
                Wallet
              </Link>
            </Box>
            <Box className="my-box">
              <Link href="/dashboard/mantenimiento" color={"white"}>
                Páginas
              </Link>
            </Box>
          </DrawerBody>
          <DrawerHeader
            textColor={"white"}
            fontWeight={"bold"}
            borderBottomWidth="1px"
          >
            Reportes
          </DrawerHeader>
          <DrawerBody>
            <Box className="my-box">
              <Link href="/dashboard/mantenimiento" color={"white"}>
                Auditorias
              </Link>
            </Box>
            <Box className="my-box">
              <Link href="/dashboard/mantenimiento" color={"white"}>
                Benchmark
              </Link>
            </Box>
            <Box className="my-box">
              <Link href="/dashboard/mantenimiento" color={"white"}>
                Performance
              </Link>
            </Box>
            <Box className="my-box">
              <Link href="/dashboard/mantenimiento" color={"white"}>
                Wallet
              </Link>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export async function getServerSideProps(context: { req: any }): Promise<any> {
  const session = await getSession({ req: context.req });

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
