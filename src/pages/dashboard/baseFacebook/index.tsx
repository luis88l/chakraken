import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";

export interface BaseFacebookTable {
  id_Base: string;
  nb_Base: string;
  nu_Pixel: string;
  sn_Activo: string;
}

export default function BaseFacebook(): any {
  const {
    isLoading,
    data: bases,
    isSuccess,
  } = useQuery("basesFaceBook", async () => await ApiService.getBases);

  const columnHelper = createColumnHelper<BaseFacebookTable>();

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
        <Box m={20} borderRadius="lg" outline={"100"} outlineColor="red">
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
          <KTableLayout columns={columns} data={[]} />
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
