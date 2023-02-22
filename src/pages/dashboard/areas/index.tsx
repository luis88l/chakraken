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
  nb_area: string;
  id_area: string;
}

export default function Areas(): any {
  const { isLoading, data: areas } = useQuery(
    "areas",
    async () => await ApiService.getAreas()
  );

  if (isLoading) {
    return <KSkeletonPage />;
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
                // eslint-disable-next-line react/prop-types
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
      <Box
        overflow="scroll"
        max-height="100%"
        w={{ base: "100%", md: "100%", lg: "100%" }}
      >
        <Flex
          mb={4}
          display="grid"
          justifyItems={{
            base: "center",
            md: "end",
            lg: "end",
            sm: "end",
          }}
        >
          <Link href={"/dashboard/areas/new"}>
            <Button
              w={{ base: "200px", md: "200px", lg: "200px", sm: "200px" }}
              color="#fff"
              bg="#1cb35b"
              _hover={{ bg: "#238152" }}
              leftIcon={<AddIcon />}
            >
              Nueva área
            </Button>
          </Link>
        </Flex>
        <KTableLayout
          columns={columns}
          // @ts-expect-error
          data={areas.map(({ id_area, nb_area }: areasTable) => ({
            id_area,
            nb_area,
          }))}
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
