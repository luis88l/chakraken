import { useState } from "react";
import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import Link from "next/link";

export interface areasTable {
  nb_area: string;
  id_area: string;
}

export default function Areas() {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);

  const {
    isLoading,
    error,
    data: areas,
  } = useQuery("areas", async () => await ApiService.getAreas());

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  const columnHelper = createColumnHelper<areasTable>();

  const columns = [
    columnHelper.accessor("nb_area", {
      cell: (info) => info.getValue(),
      header: "Nombre",
    }),
    columnHelper.accessor("id_area", {
      cell: (props) => (
        <ButtonGroup gap="2">
          <Box m={2} cursor="pointer">
            <Link
              href={{
                pathname: "/dashboard/areas/" + props.getValue(),
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
    <KPage title="Áreas">
      <Box>
        <Flex mb={4} display="grid" justifyItems="flex-end">
          <Link href={"/dashboard/areas/new"}>
            <Button
              w="200px"
              alignSelf="flex-end"
              color="#fff"
              bg="#1cb35b"
              _hover={{ bg: "#238152" }}
              leftIcon={<AddIcon />}
            >
              Nuevo área
            </Button>
          </Link>
        </Flex>
        <KTableLayout
          columns={columns}
          data={areas.map(({ id_area, nb_area }: areasTable) => ({
            id_area,
            nb_area,
          }))}
        />
      </Box>
    </KPage>
  );
}

export async function getServerSideProps(context: { req: any }) {
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
