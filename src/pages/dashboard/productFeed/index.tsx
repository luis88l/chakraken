import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";

export interface productFeedListTable {
  id_product_feed: string;
  created_at: string;
  updated_at: string;
  version: string;
  status: string;
  description: string;
  item_count: number;
  mkp_item_count: number;
  processed_item_count: number;
}

export default function ProductFeed(): any {
  const filters: any = [{}];

  const {
    data: productFeedList,
    isLoading,
    isSuccess,
  } = useQuery(
    "productFeedList",
    async () => await ApiService.getFeedList({ filters })
  );

  if (isLoading && !isSuccess) {
    return <KSkeletonPage />;
  }

  if (isSuccess && typeof productFeedList !== "undefined") {
    console.log("hola jajaj", typeof productFeedList);
    const columnHelper = createColumnHelper<productFeedListTable>();

    const columns = [
      columnHelper.accessor("id_product_feed", {
        cell: (info) => info.getValue(),
        header: "ID",
      }),
      columnHelper.accessor("created_at", {
        cell: (info) => info.getValue(),
        header: "Created At",
      }),
      columnHelper.accessor("updated_at", {
        cell: (info) => info.getValue(),
        header: "Updated At",
      }),
      columnHelper.accessor("version", {
        cell: (info) => info.getValue(),
        header: "Version",
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
            data={productFeedList.map(
              ({
                id_product_feed,
                status,
                created_at,
                updated_at,
                version,
                description,
                item_count,
                mkp_item_count,
                processed_item_count,
              }: productFeedListTable) => ({
                id_product_feed,
                status,
                created_at,
                updated_at,
                version,
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
