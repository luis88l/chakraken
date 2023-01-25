import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPagePerformance";
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
import { useState } from "react";
import Mantenimiento from "../../../components/mantenimiento";
import { Contenido } from "./ReportePerformance/Componente";
import Filtros from "./ReportePerformance/FiltrosRpt";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Web(): any {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Titulo, setTitulo] = useState<string>("Reporte performance");
  const [OpcionAct, setOpcionAct] = useState<number>(4);
  const [TieneFiltros, setTieneFiltros] = useState<boolean>(true);
  const [Componente, setComponente] = useState<any>(<Contenido />);
  const [CmpFiltros, setCmpFiltros] = useState<any>(<Filtros />);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const RedirigirMantenimineto = (Opcion: number) => {
    console.log(
      "🚀 ~ file: index.tsx:30 ~ RedirigirMantenimineto ~ Opcion",
      Opcion
    );
    if (Opcion === 4) {
      setOpcionAct(Opcion);
      setTitulo("Reporte Performance");
      setTieneFiltros(true);
      setComponente(<Contenido />);
      setCmpFiltros(<Filtros />);
    } else {
      setOpcionAct(Opcion);
      setComponente("");
      setTieneFiltros(false);
      setTitulo("Mantenimiento");
    }
    console.log(Opcion, OpcionAct);
  };

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

  return (
    // eslint-disable-next-line react/no-children-prop
    <KPage
      title={Titulo}
      Menu={MenuWeb}
      Filtros={CmpFiltros}
      VisibleFiltros={TieneFiltros}
    >
      {Componente !== "" ? Componente : <Mantenimiento />}
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
    </KPage>
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
