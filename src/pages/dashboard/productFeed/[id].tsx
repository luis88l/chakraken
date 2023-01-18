import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, ButtonGroup } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Image from "next/image";

export interface productFeedItemTable {
  id: string | undefined;
  id_product_feed: string;
  sku: string;
  brand: string;
  title: string;
  description: string;
  price: number;
  mpn: string;
  size: string;
  image_link: string;
  additional_image_link: string;
  link: string;
  condition: string;
  availability: string;
  sale_price: number;
  product_type: string;
  store: string;
}

export interface productFeedItemsFilter {
  idFeed: string;
  page: number;
}

export default function ProductFeed(): any {
  const router = useRouter();
  const feedId = router.query.id;

  console.log(router.query.id);

  const { data: productFeedItems, isLoading } = useQuery(
    ["productFeedItems", feedId],
    async () =>
      await ApiService.getFeedItems({ idFeed: feedId, page: 1, pageSize: 10 })
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }

  console.log(productFeedItems);
  const columnHelper = createColumnHelper<productFeedItemTable>();

  const columns = [
    columnHelper.accessor("image_link", {
      cell: (info) => (
        <Image src={info.getValue()} width={100} height={100} alt={""} />
      ),
      header: "Imagen",
    }),
    columnHelper.accessor("sku", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: "Title",
    }),
    columnHelper.accessor("size", {
      cell: (info) => info.getValue(),
      header: "Tallas",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("price", {
      cell: (info) => info.getValue(),
      header: "Precio",
    }),
    columnHelper.accessor("sale_price", {
      cell: (info) => info.getValue(),
      header: "Precio en oferta",
    }),
    columnHelper.accessor("availability", {
      cell: (info) => info.getValue(),
      header: "Disponibilidad",
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
      <Box>
        <h1>Feed Items</h1>
        {Array.isArray(productFeedItems.data.items) && (
          <KTableLayout
            columns={columns}
            data={productFeedItems.data.items.map(
              ({
                sku,
                price,
                id_product_feed,
                title,
                description,
                sale_price,
                availability,
                image_link,
              }: productFeedItemTable) => ({
                sku,
                title,
                id_product_feed,
                description,
                price,
                sale_price,
                availability,
                image_link,
              })
            )}
          />
        )}
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
