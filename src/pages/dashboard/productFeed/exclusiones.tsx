// page component that shows in react-table all the exclusions that are in the database
//
import React from "react";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import KPage from "../../../components/page/KPage";
import { getSession } from "next-auth/react";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

export interface productFeedExclusionsTable {
  sku: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  active: boolean;
}

export default function ProductFeedExclusions(): any {
  const queryClient = useQueryClient();
  const router = useRouter();
  const feedId = router.query.id;

  const { data: productFeedExclusions, isLoading } = useQuery(
    ["productFeedExclusions", feedId],
    async () => await ApiService.getFeedExclusions({ idFeed: feedId })
  );

  const deleteExclusion = useMutation(
    async (sku: string) => {
      const formData = new FormData();
      formData.append("sku", sku);
      return await ApiService.deleteExclusion(formData);
    },
    {
      onSuccess: () => {
        console.log("delete success");
        void queryClient.invalidateQueries("productFeedExclusions");
      },
    }
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const columnHelper = createColumnHelper<productFeedExclusionsTable>();

  const columns = [
    columnHelper.accessor("sku", {
      header: "SKU",
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
    columnHelper.accessor("sku", {
      header: "Acciones",
      cell: (value) => (
        <Button>
          <Text>
            <FiTrash2
              onClick={() => deleteExclusion.mutate(value.getValue())}
            />
          </Text>
        </Button>
      ),
    }),
  ];

  return (
    <KPage title="Exclusiones">
      <Box overflow="scroll" max-height="100%" width="100%">
        <Flex mb={4} display="grid" justifyItems="flex-end">
          <Link href={"/dashboard/productFeed/addExclusion"}>
            <Button
              w="200px"
              alignSelf="flex-end"
              color="#fff"
              bg="#1cb35b"
              _hover={{ bg: "#238152" }}
              leftIcon={<AddIcon />}
            >
              Agregar exclusiones
            </Button>
          </Link>
        </Flex>
        <Box>
          {Array.isArray(productFeedExclusions.data.result) && (
            <KTableLayout
              columns={columns}
              data={productFeedExclusions.data.result.map(
                ({
                  sku,
                  created_at,
                  updated_at,
                  created_by,
                  updated_by,
                  active,
                }: productFeedExclusionsTable) => ({
                  sku,
                  created_at,
                  updated_at,
                  created_by,
                  updated_by,
                  active,
                })
              )}
            />
          )}
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
