import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import {
  EditIcon,
  DeleteIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Link from "next/link";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { useState } from "react";

export interface areasTable {
  nb_nombre: string;
  id_usuario: string;
  de_email: string;
  nb_usuario: string;
  de_rol: string;
  nb_area: string;
}

export default function Usuarios(): any {
  const [page, setPage] = useState(0);

  const form = new FormData();

  form.append("numeropagina", page.toString());
  form.append("filaspagina", "10");
  const {
    isLoading,
    data: usuarios,
    isPreviousData,
    refetch,
  } = useQuery("usuarios", async () => await ApiService.getUsers(form));

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const columnHelper = createColumnHelper<areasTable>();

  console.log(usuarios);

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
      <Box overflow="scroll" max-height="100%" width="100%">
        <Flex
          mb={4}
          display="grid"
          justifyItems={{ base: "center", md: "flex-end", lg: "flex-end" }}
        >
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
        <Box>
          <Grid templateColumns="repeat(12, 1fr)" pt={3} pb={3}>
            <GridItem colSpan={2} textAlign={"center"}>
              {usuarios.data.items === 0
                ? "Sin resultados"
                : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  `${page} de `}
            </GridItem>
            <GridItem colSpan={1} textAlign={"center"}>
              <ButtonGroup gap="1" display="flex" justifyContent="center">
                <Box cursor="pointer">
                  <ChevronLeftIcon
                    fontSize="xl"
                    onClick={() => {
                      setPage((old) => Math.max(old - 1, 0));
                      void refetch();
                    }}
                  />
                </Box>
                <Box cursor="pointer">
                  <ChevronRightIcon
                    fontSize="xl"
                    onClick={() => {
                      if (!isPreviousData) {
                        setPage((old) => old + 1);
                        void refetch();
                      }
                    }}
                  />
                </Box>
              </ButtonGroup>
            </GridItem>
          </Grid>
        </Box>
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
