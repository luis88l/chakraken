import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, Button, ButtonGroup, Flex, Select } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";

export interface areasTable {
  id_Base: string;
  nb_Base: string;
  nu_Pixel: string;
}

export default function BaseFacebook(): any {
  const {
    isLoading,
    data: basesFaceBook,
    isSuccess,
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
            <DeleteIcon />
          </Box>
        </ButtonGroup>
      ),
      header: "Acciones",
    }),
  ];

  if (isSuccess) {
    return (
      <KPage title="Bases Facebook">
        <Box>
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
              data={basesFaceBook.map(({ id_Base, nb_Base, nu_Pixel }) => ({
                id_Base,
                nb_Base,
                nu_Pixel,
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
