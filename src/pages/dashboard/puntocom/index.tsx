import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useState } from "react";
import Mantenimiento from "../../../components/mantenimiento";
import RptPerformance from "./ReportePerformance";

export default function Web(): any {
  const [Titulo, setTitulo] = useState<string>("Reporte performance");
  const [OpcionAct, setOpcionAct] = useState<number>(1);
  const [Componente, setComponente] = useState<any>(<RptPerformance />);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const RedirigirMantenimineto = (Opcion: number) => {
    if (Opcion === 4) {
      setOpcionAct(Opcion);
      setTitulo("Reporte Performance");
      setComponente(<RptPerformance />);
    } else {
      setOpcionAct(Opcion);
      setTitulo("Mantenimiento");
      setComponente(<Mantenimiento />);
    }
    console.log(Opcion, OpcionAct);
  };

  return (
    <KPage title={Titulo}>
      <Box p={2} maxW="sm" borderRadius="lg" letterSpacing={1}>
        <Menu>
          <MenuButton as={Button} colorScheme="pink">
            Menú{" "}
          </MenuButton>
          <MenuList>
            <MenuGroup title="Catalogos">
              <MenuItem onClick={() => RedirigirMantenimineto(1)}>
                Dominios
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto(2)}>
                Paginas{" "}
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto(3)}>
                Wallet{" "}
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Reportes">
              <MenuItem onClick={() => RedirigirMantenimineto(4)}>
                Performance
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto(5)}>
                Kpis
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto(6)}>
                BenchMark
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto(7)}>
                Semanal
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto(8)}>
                Auditorias
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="Herramientas">
              <MenuItem onClick={() => RedirigirMantenimineto(9)}>
                Calculadora
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      {Componente}
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
