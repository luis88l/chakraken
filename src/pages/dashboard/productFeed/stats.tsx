import { Box, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KLineChart from "../../../components/charts/KLineChart";
import KPage from "../../../components/page/KPage";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { DateTime } from "luxon";

export default function StatsPage(): any {
  const { data: feed, isSuccess } = useQuery(
    "modulos",
    async () =>
      await ApiService.getFeedList(JSON.stringify({ data: { filters: [] } }))
  );

  if (isSuccess && feed.data?.feed.length > 0) {
    return (
      <KPage title="Product Feed Stats">
        <Box overflow="scroll" max-height="100%" width="100%">
          <Box>
            <Text fontSize="xl">Flujo de productos (entries)</Text>
          </Box>
          <Box>
            <KLineChart
              data={{
                labels: feed.data.feed.map((item: { created_at: any }) =>
                  DateTime.fromISO(item.created_at).toFormat("MMMM dd, yyyy", {
                    locale: "es",
                  })
                ),
                datasets: [
                  {
                    label: "Total de productos Coppel",
                    data: feed.data.feed.map(
                      (item: { item_count: any }) => item.item_count
                    ),
                    borderWidth: 2,
                    borderColor: "#dd65b9",
                    backgroundColor: ["#dd65b9"],
                  },
                  {
                    label: "Total de productos Marketplace",
                    data: feed.data.feed.map(
                      (item: { mkp_item_count: any }) => item.mkp_item_count
                    ),

                    borderWidth: 2,
                    borderColor: "#5cd93d",
                    backgroundColor: ["#5cd93d"],
                  },
                  {
                    label: "Total de entries",
                    data: feed.data.feed.map(
                      (item: { processed_item_count: any }) =>
                        item.processed_item_count
                    ),
                    borderWidth: 2,
                    borderColor: "#656fdd",
                    backgroundColor: ["#656fdd"],
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    display: true,
                    grid: {
                      display: true,
                    },
                  },
                },
              }}
            />
          </Box>
        </Box>
      </KPage>
    );
  }
  return <KSkeletonPage />;
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
