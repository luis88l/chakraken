import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, Button, ButtonGroup, Flex, Spacer } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { DateTime } from "luxon";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FiAlertCircle, FiBarChart, FiClock } from "react-icons/fi";

export interface productFeedListTable {
  created_at: string;
  version: string;
  status: string;
  description: string;
  item_count: number;
  mkp_item_count: number;
  processed_item_count: number;
  id_product_feed: string;
}

export default function ProductFeed(): any {
  const filters: any = [{}];
  const { data: productFeedList, isLoading } = useQuery(
    "productFeedList",
    async () => await ApiService.getFeedList({ filters })
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  console.log(productFeedList);
  const columnHelper = createColumnHelper<productFeedListTable>();

  const columns = [
    columnHelper.accessor("created_at", {
      cell: (info) =>
        DateTime.fromISO(info.getValue()).toFormat("dd MMMM yyyy, h:mm a", {
          locale: "es",
        }),
      header: "Created At",
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <>
          {info.getValue() === "ok" && (
            <Button colorScheme="green" variant="outline" size="sm">
              Exitoso
            </Button>
          )}
          {info.getValue() === "published" && (
            <Button colorScheme="blue" variant="outline" size="sm">
              Publicado
            </Button>
          )}
        </>
      ),
      header: "Status",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("item_count", {
      cell: (info) => info.getValue(),
      header: "Item Count",
    }),
    columnHelper.accessor("mkp_item_count", {
      cell: (info) => info.getValue(),
      header: "Mkp Item Count",
    }),
    columnHelper.accessor("processed_item_count", {
      cell: (info) => info.getValue(),
      header: "Processed Item Count",
    }),
    columnHelper.accessor("id_product_feed", {
      cell: (props) => (
        <ButtonGroup gap="2">
          <Box m={2} cursor="pointer">
            <Link
              href={{
                // eslint-disable-next-line react/prop-types
                pathname: "/dashboard/productFeed/" + props.getValue(),
              }}
            >
              <ArrowForwardIcon />
            </Link>
          </Box>
        </ButtonGroup>
      ),
      header: "Acciones",
    }),
  ];

  return (
    <KPage title="Feeds">
      <Box overflow="scroll" max-height="100%" width="100%">
        <Flex paddingBottom={5} position={"sticky"}>
          <Box>
            <Link href={"/dashboard/productFeed/exclusiones"}>
              <Button
                marginRight={3}
                leftIcon={<FiAlertCircle />}
                colorScheme="orange"
                variant="outline"
              >
                Exclusiones
              </Button>
            </Link>
            <Link href={"/dashboard/productFeed/alertas"}>
              <Button
                marginRight={3}
                leftIcon={<FiClock />}
                colorScheme="yellow"
                variant="outline"
              >
                Alertas
              </Button>
            </Link>
            <Link href={"/dashboard/productFeed/stats"}>
              <Button
                leftIcon={<FiBarChart />}
                colorScheme="purple"
                variant="outline"
              >
                Estadísticas
              </Button>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Button colorScheme="blue">Procesar feed</Button>
          </Box>
        </Flex>
        <Box>
          <KTableLayout
            columns={columns}
            data={productFeedList.data.feed.map(
              ({
                id_product_feed,
                status,
                created_at,
                description,
                item_count,
                mkp_item_count,
                processed_item_count,
              }: productFeedListTable) => ({
                id_product_feed,
                status,
                created_at,
                description,
                item_count,
                mkp_item_count,
                processed_item_count,
              })
            )}
          />
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
