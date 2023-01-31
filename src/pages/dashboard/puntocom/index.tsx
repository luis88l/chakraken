import { getSession } from "next-auth/react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Mantenimiento from "../../../components/mantenimiento";
import ReportePerformance from "./ReportePerformance";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Web(): any {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [OpcionAct, setOpcionAct] = useState<number>(4);
  const [Componente, setComponente] = useState<any>();
  const FocusSubmenu = {
    ".my-box:hover &": {
      color: "#ea4c89",
    },
  };
  const MenuWeb = (
    <Button borderWidth="3px" borderColor={"#020202"} onClick={onOpen}>
      <HamburgerIcon />
    </Button>
  );

  useEffect(() => {
    setComponente(<ReportePerformance MenuWeb={MenuWeb} />);
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const RedirigirMantenimineto = (Opcion: number) => {
    if (Opcion === 4) {
      setOpcionAct(Opcion);
      setComponente(<ReportePerformance MenuWeb={MenuWeb} />);
    } else {
      setOpcionAct(Opcion);
      setComponente(<Mantenimiento />);
    }
    console.log(Opcion, OpcionAct);
  };

  return (
    // eslint-disable-next-line react/no-children-prop
    <div>
      {Componente}
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
              <Box
                color={"white"}
                sx={FocusSubmenu}
                onClick={() => RedirigirMantenimineto(1)}
              >
                Dominios
              </Box>
            </Box>
            <Box className="my-box">
              <Box
                color={"white"}
                sx={FocusSubmenu}
                onClick={() => RedirigirMantenimineto(2)}
              >
                Wallet
              </Box>
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
              <Box
                color={"white"}
                sx={FocusSubmenu}
                onClick={() => RedirigirMantenimineto(4)}
              >
                Performance
              </Box>
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
