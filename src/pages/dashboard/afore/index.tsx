import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useQueries, useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { createColumnHelper } from "@tanstack/react-table";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";

export interface aforeTable {
  id: string;
  nombre_completo: string;
  correo: string;
  curp: string;
  telefono: string;
  nu_cliente: string;
  enviado: string;
}

export default function Afore(): any {
  const {
    isLoading,
    data: afore,
    isSuccess,
  } = useQuery("afore", async () => await ApiService);

  const columnHelper = createColumnHelper<aforeTable>();

  const columns = [
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
    columnHelper.accessor("nu_cliente", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("enviado", {
      cell: (info) => info.getValue(),
      header: "Enviado",
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
              <EditIcon />
            </Link>
          </Box>
          <Box m={2} cursor="pointer">
            <DeleteIcon />
          </Box>
        </ButtonGroup>
      ),
      header: "Acciones",
    }),
  ];

  return (
    <KPage title="Afore">
      <Box m={5} mt="10">
        <Box ml={"56"} mb="10">
          <Button
            mr={"10"}
            alignItems={"center"}
            size="lg"
            bg="blue.500"
            textColor={"white"}
            rounded="0"
          >
            Marcar enviados
          </Button>
          <Button
            rounded="0"
            size={"lg"}
            bg="blue.500"
            textColor={"white"}
            alignItems="center"
          >
            Descargar Csv
          </Button>
          <Button
            rounded="0"
            ml={"10"}
            size={"lg"}
            bg="blue.500"
            textColor={"white"}
            alignItems="center"
          >
            Actualizar lista
          </Button>
        </Box>
        <KTableLayout data={[]} columns={columns} />
      </Box>
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
