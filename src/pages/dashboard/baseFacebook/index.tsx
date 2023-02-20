import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { useState } from "react";

export interface areasTable {
  id_Base: string;
  nb_Base: string;
  nu_Pixel: string;
  sn_activo: boolean;
}

export interface baseFacebookProps {
  id_Base: string;
  nb_Base: string;
  nu_Pixel: string;
  sn_activo: boolean;
}

export default function BaseFacebook(): any {
  const [page, setPage] = useState(0);

  const form = new FormData();

  form.append("numeropagina", page.toString());
  form.append("filaspagina", "10");

  const {
    isLoading,
    data: basesFaceBook,
    isSuccess,
    isPreviousData,
    refetch,
  } = useQuery("Bases", async () => await ApiService.getBases());

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const columnHelper = createColumnHelper<areasTable>();

  const columns = [
    columnHelper.accessor("nb_Base", {
      cell: (info) => info.getValue(),
      header: "Base",
    }),
    columnHelper.accessor("nu_Pixel", {
      cell: (info) => info.getValue(),
      header: "Pixel",
    }),
    columnHelper.accessor("id_Base", {
      cell: (props) => (
        <ButtonGroup gap={"2"}>
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/baseFacebook/" + props.getValue(),
              }}
            >
              <EditIcon />
            </Link>
          </Box>
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/baseFacebook/delete/" + props.getValue(),
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
      <Box w="100%">
        <KPage title="Bases Facebook">
          <Box overflow={"scroll"} w="100%">
            <Flex mb={4} display="grid" justifyItems={"flex-end"}>
              <Link href={"/dashboard/baseFacebook/new"}>
                <Button
                  alignItems={"center"}
                  size="lg"
                  mb={"5"}
                  bg="blue.500"
                  textColor={"whiteAlpha.900"}
                >
                  + Agregar Base
                </Button>
              </Link>
            </Flex>
            {Array.isArray(basesFaceBook) && (
              <KTableLayout
                columns={columns}
                data={basesFaceBook.map(
                  ({ id_Base, nb_Base, nu_Pixel, sn_activo }) => ({
                    id_Base,
                    nb_Base,
                    nu_Pixel,
                    sn_activo,
                  })
                )}
              />
            )}
            <Box alignContent={"center"}>
              <Grid templateColumns="repeat(12, 1fr)" pt={3} pb={3}>
                <GridItem colSpan={2} textAlign={"center"}>
                  {basesFaceBook.items === 0
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
      </Box>
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
