import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import Image from "next/image";
import KTextToogle from "../../../components/text/KTextToogle";
import Link from "next/link";
import {
  FiAlertCircle,
  FiClock,
  FiFacebook,
  FiChrome,
  FiBarChart,
} from "react-icons/fi";
import { KPaginatedTable } from "../../../components/tableLayout/KPaginatedTable";

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
      await ApiService.getFeedItems({
        idFeed: feedId,
      })
  );

  if (isLoading) {
    return <KSkeletonPage />;
  }
  const columnHelper = createColumnHelper<productFeedItemTable>();

  const columns = [
    columnHelper.accessor("image_link", {
      cell: (info) => (
        <Image src={info.getValue()} width={100} height={100} alt={""} />
      ),
      header: "Imagen",
    }),
    columnHelper.accessor("availability", {
      cell: (info) => (
        <>
          {info.getValue() === "in stock" && (
            <Button colorScheme="green" variant="outline" size="xs">
              Disponible
            </Button>
          )}

          {info.getValue() === "out of stock" && (
            <Button colorScheme="red" variant="outline" size="xs">
              Sin stock
            </Button>
          )}
        </>
      ),
      header: "Disponibilidad",
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
      cell: (info) => <KTextToogle text={info.getValue()} maxLength={50} />,
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
    columnHelper.accessor("additional_image_link", {
      cell: (info) => <KTextToogle text={info.getValue()} maxLength={50} />,
      header: "Imagenes adicionales",
    }),
    columnHelper.accessor("link", {
      cell: (info) => (
        <Link href={info.getValue()} target={"_blank"}>
          {info.getValue()}
        </Link>
      ),
      header: "Link",
    }),
    columnHelper.accessor("condition", {
      cell: (info) => info.getValue(),
      header: "Condición",
    }),
    columnHelper.accessor("product_type", {
      cell: (info) => info.getValue(),
      header: "Tipo de producto",
    }),
    columnHelper.accessor("store", {
      cell: (info) => info.getValue(),
      header: "Tienda",
    }),
    columnHelper.accessor("brand", {
      cell: (info) => info.getValue(),
      header: "Marca",
    }),
  ];

  return (
    <>
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
              <Button marginRight={5} leftIcon={<FiChrome />}>
                Descargar Google
              </Button>
              <Button marginRight={5} leftIcon={<FiFacebook />}>
                Descargar Facebook
              </Button>
              <Button colorScheme="blue">Publicar feed</Button>
            </Box>
          </Flex>
          {Array.isArray(productFeedItems.data.items) && (
            <KPaginatedTable
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
                  additional_image_link,
                  link,
                  condition,
                  product_type,
                  store,
                  brand,
                }: productFeedItemTable) => ({
                  sku,
                  title,
                  id_product_feed,
                  description,
                  price,
                  sale_price,
                  availability,
                  image_link,
                  additional_image_link,
                  link,
                  condition,
                  product_type,
                  store,
                  brand,
                })
              )}
            />
          )}
        </Box>
      </KPage>
    </>
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
