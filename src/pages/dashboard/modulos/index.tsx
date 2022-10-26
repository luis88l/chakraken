import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import Link from "next/link";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";

export interface modulosTable {
  nb_modulo: string;
  id_modulo: string;
  nu_orden: number;
  acciones: string;
  de_modulo: string;
  de_clase: string;
}

export default function Modulos(): any {
  const {
    isLoading,
    data: modules,
    isSuccess,
  } = useQuery("modulos", async () => await ApiService.getModulos());

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const columnHelper = createColumnHelper<modulosTable>();

  const columns = [
    columnHelper.accessor("nb_modulo", {
      cell: (info) => info.getValue(),
      header: "Nombre",
    }),
    columnHelper.accessor("nu_orden", {
      cell: (info) => info.getValue(),
      header: "Orden",
    }),
    columnHelper.accessor("id_modulo", {
      cell: (props) => (
        <ButtonGroup gap="2">
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/modulos/" + props.getValue(),
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

  if (isSuccess) {
    return (
      <KPage title="Módulos">
        <Box>
          <Flex mb={4} display="grid" justifyItems="flex-end">
            <Link href={"/dashboard/modulos/new"}>
              <Button
                w="200px"
                alignSelf="flex-end"
                color="#fff"
                bg="#1cb35b"
                _hover={{ bg: "#238152" }}
                leftIcon={<AddIcon />}
              >
                Nuevo módulo
              </Button>
            </Link>
          </Flex>
          {Array.isArray(modules) && (
            <KTableLayout
              columns={columns}
              // @ts-expect-error
              data={modules.map(({ id_modulo, nb_modulo, nu_orden }) => ({
                id_modulo,
                nb_modulo,
                nu_orden,
              }))}
            />
          )}
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
