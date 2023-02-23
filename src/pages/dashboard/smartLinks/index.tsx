import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";

export interface SmartTable {
  id_page: string;
  nb_nombre: string;
  nb_url: string;
  nb_description: string;
  nb_keyWords: string;
}

export default function SmartLinks(): any {
  const { isLoading, data: SmartLinks } = useQuery(
    "SmartLinks",
    async () => await ApiService.getSmartLink()
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const columnHelper = createColumnHelper<SmartTable>();

  const columns = [
    columnHelper.accessor("nb_nombre", {
      cell: (info) => info.getValue(),
      header: "Nombre",
    }),
    columnHelper.accessor("nb_description", {
      cell: (info) => info.getValue(),
      header: "Descripcion",
    }),
    columnHelper.accessor("nb_url", {
      cell: (info) => info.getValue(),
      header: "URL",
    }),
    columnHelper.accessor("nb_keyWords", {
      cell: (info) => info.getValue(),
      header: "KeyWords",
    }),
    columnHelper.accessor("id_page", {
      cell: (props) => (
        <ButtonGroup
          gap={"2"}
          display={"flex"}
          justifyContent="space-around"
          alignItems="center"
        >
          <Box>
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/smartLinks/" + props.getValue(),
              }}
            >
              <EditIcon />
            </Link>
          </Box>
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/smartLinks/delete/" + props.getValue(),
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

  return (
    <KPage title="Smart Links">
      <Box
        overflowY={"hidden"}
        _hover={{
          overflowY: "auto",
        }}
      >
        <Flex mb={4} display="grid" justifyItems={"flex-end"}>
          <Link href={"/dashboard/smartLinks/new"}>
            <Button
              alignItems={"center"}
              size="lg"
              mb={"5"}
              bg="blue.500"
              textColor={"whiteAlpha.900"}
            >
              + Agregar Formulario
            </Button>
          </Link>
        </Flex>

        {Array.isArray(SmartLinks) && (
          <KTableLayout
            columns={columns}
            data={SmartLinks.map(
              ({
                id_page,
                nb_nombre,
                nb_description,
                nb_url,
                nb_keyWords,
              }) => ({
                id_page,
                nb_nombre,
                nb_description,
                nb_url,
                nb_keyWords,
              })
            )}
          />
        )}
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
