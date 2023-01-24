import { getSession } from "next-auth/react";
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

export default function MenuWeb(): any {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const RedirigirMantenimineto = (url: string) => {
    // eslint-disable-next-line no-return-assign
    return (window.location.href = url);
  };
  return (
    <div style={{ width: "100%" }}>
      <Box mt={4} mb={5} width="100%">
        <Menu>
          <MenuButton as={Button} colorScheme="pink">
            Menú{" "}
          </MenuButton>
          <MenuList>
            <MenuGroup title="Catalogos">
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimiento")}>
                Dominios
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimiento")}>
                Paginas{" "}
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimiento")}>
                Wallet{" "}
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Reportes">
              <MenuItem
                onClick={() =>
                  RedirigirMantenimineto("puntocom/ReportePerformance")
                }
              >
                Performance
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimineto")}>
                Kpis
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimineto")}>
                BenchMark
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimineto")}>
                Semanal
              </MenuItem>
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimineto")}>
                Auditorias
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="Herramientas">
              <MenuItem onClick={() => RedirigirMantenimineto("mantenimineto")}>
                Calculadora
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
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
