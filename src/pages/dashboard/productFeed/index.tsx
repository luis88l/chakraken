import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { DateTime } from "luxon";

export interface productFeedListTable {
  created_at: string;
  version: string;
  status: string;
  description: string;
  item_count: number;
  mkp_item_count: number;
  processed_item_count: number;
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
      cell: (info) => info.getValue(),
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
  ];

  return (
    <KPage title="Feeds">
      <Box>
        <KTableLayout
          columns={columns}
          data={productFeedList.data.feed.map(
            ({
              status,
              created_at,
              description,
              item_count,
              mkp_item_count,
              processed_item_count,
            }: productFeedListTable) => ({
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
