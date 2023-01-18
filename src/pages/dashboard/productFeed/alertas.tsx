// page that shows in a react-table all the alerts that are in the database
//
import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import KPage from "../../../components/page/KPage";
import { getSession } from "next-auth/react";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";

export interface productFeedAlertsTable {
  email: string;
  on_creation: boolean;
  on_publish: boolean;
  on_error: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  active: boolean;
}

export default function ProductFeedAlerts(): any {
  const { data: productFeedExclusions, isLoading } = useQuery(
    ["productFeedAlerts"],
    async () => await ApiService.getFeedExclusions({})
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const columnHelper = createColumnHelper<productFeedAlertsTable>();

  const columns = [
    columnHelper.accessor("email", {
      header: "Email",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("on_creation", {
      header: "On Creation",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("on_publish", {
      header: "On Publish",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("on_error", {
      header: "On Error",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: "Created At",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("updated_at", {
      header: "Updated At",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("created_by", {
      header: "Created By",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("updated_by", {
      header: "Updated By",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("active", {
      header: "Active",
      cell: (value) => (
        <HStack>
          <Text>{value.getValue()}</Text>
        </HStack>
      ),
    }),
  ];

  return (
    <KPage title="Alertas">
      <Box>
        <KTableLayout columns={columns} data={productFeedExclusions} />
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
