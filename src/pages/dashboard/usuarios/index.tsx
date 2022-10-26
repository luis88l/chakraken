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

export interface areasTable {
  nb_nombre: string;
  id_usuario: string;
  de_email: string;
  nb_usuario: string;
  de_rol: string;
  nb_area: string;
}

export default function Usuarios(): any {
  const form = new FormData();
  form.append("numeropagina", "1");
  form.append("filaspagina", "10");
  const { isLoading, data: usuarios } = useQuery(
    "usuarios",
    async () => await ApiService.getUsers(form)
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const columnHelper = createColumnHelper<areasTable>();

  const columns = [
    columnHelper.accessor("nb_nombre", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelper.accessor("de_email", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelper.accessor("nb_usuario", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelper.accessor("de_rol", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelper.accessor("nb_area", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelper.accessor("id_usuario", {
      cell: (props) => (
        <ButtonGroup gap="2">
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/usuarios/" + props.getValue(),
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
    <KPage title="Usuarios">
      <Box>
        <Flex mb={4} display="grid" justifyItems="flex-end">
          <Link href={"/dashboard/usuarios/new"}>
            <Button
              w="200px"
              alignSelf="flex-end"
              color="#fff"
              bg="#1cb35b"
              _hover={{ bg: "#238152" }}
              leftIcon={<AddIcon />}
            >
              Nuevo usuario
            </Button>
          </Link>
        </Flex>
        <KTableLayout
          columns={columns}
          data={usuarios.data.data.rows.map(
            ({
              // @ts-expect-error
              nb_nombre,
              // @ts-expect-error
              de_email,
              // @ts-expect-error
              nb_usuario,
              // @ts-expect-error
              de_rol,
              // @ts-expect-error
              nb_area,
              // @ts-expect-error
              id_usuario,
            }) => ({
              nb_nombre,
              de_email,
              nb_usuario,
              de_rol,
              nb_area,
              id_usuario,
            })
          )}
        />
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
