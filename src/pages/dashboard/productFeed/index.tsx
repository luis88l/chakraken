import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { useReactTable } from "@tanstack/react-table";

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
  const {
    data: productFeedList,
    isLoading,
    isSuccess,
  } = useQuery("productFeedList", async () => await ApiService.getFeedList({}));

  if (isLoading && !isSuccess) {
    return <KSkeletonPage />;
  }

  // use React Table to create a table with the productFeedList data
  const { Table, Pagination } = useReactTable({
    data: productFeedList,
    columns: [
      {
        Header: "ID",
        accessor: "id_product_feed",
      },
      {
        Header: "Created At",
        accessor: "created_at",
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
      },
      {
        Header: "Version",
        accessor: "version",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Item Count",
        accessor: "item_count",
      },
      {
        Header: "Mkp Item Count",
        accessor: "mkp_item_count",
      },
      {
        Header: "Processed Item Count",
        accessor: "processed_item_count",
      },
    ],
  });

  if (isSuccess && typeof productFeedList !== "undefined") {
    return (
      <KPage title="Product Feed">
        <Box>hi</Box>
        {Table}
        {Pagination}
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
