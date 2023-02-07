import { getSession } from "next-auth/react";
import React from "react";
// import KPage from "../../../components/page/KPage";
import {
  TableContainer,
  Table,
  Thead,
  Th,
  Td,
  Tr,
  Flex,
  Box,
  Tbody,
  TableCaption,
} from "@chakra-ui/react";

export default function TabHistorial(): any {
  // const [notification, setNotificatiion] = useState({
  //   titulo: "",
  //   topic: "",
  //   horas: "",
  //   url: "",
  //   mensaje: "",
  //   url_imagen: "",
  //   campa: "",
  //   fecha: "",
  //   tokenUsuario: "",
  // });

  // const onChangeHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNotificatiion({
  //     ...notification,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <Box>
      <Flex>
        <Box w="100%">
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>
                {/* Imperial to metric conversion factors */}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Mensaje</Th>
                  <Th>Fuente</Th>
                  <Th>Fecha</Th>
                  <Th>Estatus</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Contenido de mensaje</Td>
                  <Td>Contenido de fuente</Td>
                  <Td>01/01/2022/</Td>
                  <Td>Estatus</Td>
                </Tr>
              </Tbody>
              {/* <Tfoot>
                      <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                      </Tr>
                    </Tfoot> */}
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Box>
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
