import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, Button, ButtonGroup, Checkbox } from "@chakra-ui/react";
import Link from "next/link";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { createColumnHelper } from "@tanstack/react-table";
import { DeleteIcon } from "@chakra-ui/icons";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import React, { useState } from "react";

export interface aforeTable {
  id: string;
  nombre_completo: string;
  correo: string;
  curp: string;
  telefono: string;
}

export interface aforeTableProps {
  id: string;
  nombre_completo: string;
  correo: string;
  curp: string;
  telefono: string;
  enviado: boolean;
}

export default function Afore(): any {
  const [afo, setafo] = useState(null);

  const {
    isLoading,
    data: aforeModulo,
    isSuccess,
  } = useQuery("Afore", async () => await ApiService.aforeGet(true));

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const aforeData = aforeModulo.data.data;
  const columnHelper = createColumnHelper<aforeTable>();

  const handleClick = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    void ApiService.aforeGet(true).then((response) => {
      const datos = response.data.data;
      setafo(datos);
    });
  };

  const datos = afo == null ? aforeData : afo;
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("nombre_completo", {
      cell: (info) => info.getValue(),
      header: "Nombres",
    }),
    columnHelper.accessor("correo", {
      cell: (info) => info.getValue(),
      header: "Correo",
    }),
    columnHelper.accessor("curp", {
      cell: (info) => info.getValue(),
      header: "Curp",
    }),
    columnHelper.accessor("telefono", {
      cell: (info) => info.getValue(),
      header: "Telefono",
    }),
    columnHelper.accessor("id", {
      cell: (props) => (
        <ButtonGroup gap={"2"}>
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/afore/" + props.getValue(),
              }}
            >
              <DeleteIcon />
            </Link>
          </Box>
        </ButtonGroup>
      ),
      header: "Acciones",
    }),
  ];

  if (isSuccess) {
    return (
      <KPage title="Afore">
        <Box overflow="scroll" max-height="100%" width="100%">
          <Box ml={"52"} mb="5" mt={3}>
            <Button
              mr={"5"}
              alignItems={"center"}
              size="md"
              bg="blue.500"
              textColor={"white"}
              rounded="5"
            >
              Marcar enviados
            </Button>
            <Button
              rounded="5"
              size={"md"}
              bg="blue.500"
              textColor={"white"}
              alignItems="center"
            >
              Descargar Csv
            </Button>
            <Button
              onClick={handleClick}
              rounded="5"
              ml={"5"}
              size={"md"}
              bg="blue.500"
              textColor={"white"}
              alignItems="center"
            >
              Actualizar lista
            </Button>
            <Checkbox
              alignContent={"center"}
              size="lg"
              ml={5}
              mt={1.5}
              spacing={"3"}
            >
              Todos
            </Checkbox>
          </Box>
          <Box bg={"ButtonShadow"} alignItems="center">
            {Array.isArray(datos) && (
              <KTableLayout
                columns={columns}
                data={datos.map(
                  ({ id, nombre_completo, correo, curp, telefono }) => ({
                    id,
                    nombre_completo,
                    correo,
                    curp,
                    telefono,
                  })
                )}
              />
            )}
          </Box>
        </Box>
      </KPage>
    );
  }
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
