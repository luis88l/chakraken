import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, ButtonGroup } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";

export interface SmartTable {
  id_page: string;
  nb_nombre: string;
  nb_url: string;
  nb_description: string;
  nb_keyWords: string;
  sn_activo: boolean;
}

export default function SmartLinks(): any {
  const {
    isLoading,
    data: SmartLinks,
    isSuccess,
  } = useQuery("SmartLinks", async () => await ApiService.getSmartLink());

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
        <ButtonGroup gap={"2"}>
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/smartLinks/",
              }}
            >
              <EditIcon />
            </Link>
          </Box>
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/smartLinks/",
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
      <Box></Box>
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
