import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import Image from "next/image";
import KTextToogle from "../../../components/text/KTextToogle";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiClock,
  /*   FiFacebook,
  FiChrome, */
  FiBarChart,
} from "react-icons/fi";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
  availability: string;
  sale_price: number;
  product_type: string;
  store: string;
}

export interface productFeedItemsFilter {
  column: string;
  value: string;
  min?: number;
  max?: number;
}

export default function ProductFeed(): any {
  const router = useRouter();
  const feedId = router.query.id;
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState([]);

  const {
    data: productFeedItems,
    isLoading,
    isFetching,
    isSuccess,
    isPreviousData,
    refetch,
    // @ts-expect-error
  } = useQuery({
    queryKey: ["productFeedItems", feedId],
    queryFn: async () =>
      await ApiService.getFeedItems({
        idFeed: feedId,
        page,
        offset: page * 15,
        filters,
      }),
    config: {
      onSettled: (responseData: {
        data: { total: SetStateAction<number> };
      }) => {},
    },
  });

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const fetchFeed = async (): Promise<any> => {
    if (confirm("Este proceso puede tardar varios minutos, desea continuar?")) {
      ApiService.fetchFeed({})
        .then(() => {
          console.log("Feed generado");
        })
        .finally(() => {
          window.location.reload();
        });
    }
  };

  const handleChange = (value: string): any => {
    setFilters([
      // @ts-expect-error
      {
        column: "id",
        value,
      },
    ]);
    console.log(filters);
    void refetch();
  };

  if (isSuccess) {
    const columnHelper = createColumnHelper<productFeedItemTable>();

    console.log(productFeedItems);

    const columns = [
      columnHelper.accessor("image_link", {
        cell: (info) => (
          <Image src={info.getValue()} width={50} height={50} alt={""} />
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
        enableSorting: false,
      }),
      columnHelper.accessor("title", {
        cell: (info) => <KTextToogle text={info.getValue()} maxLength={50} />,
        header: () => "Título",
        enableSorting: false,
      }),
      columnHelper.accessor("size", {
        cell: (info) => info.getValue(),
        header: "Tallas",
      }),
      columnHelper.accessor("description", {
        cell: (info) => <KTextToogle text={info.getValue()} maxLength={50} />,
        header: () => "Descripción",
        enableSorting: false,
      }),
      columnHelper.accessor("price", {
        cell: (info) => info.getValue(),
        header: "Precio",
      }),
      columnHelper.accessor("sale_price", {
        cell: (info) => info.getValue(),
        header: "Precio en oferta",
      }),
      columnHelper.accessor("link", {
        cell: (info) => (
          <Link href={info.getValue()} target={"_blank"}>
            <KTextToogle text={info.getValue()} maxLength={50} />
          </Link>
        ),
        header: "Link",
      }),
      columnHelper.accessor("product_type", {
        cell: (info) => <KTextToogle text={info.getValue()} maxLength={50} />,
        header: () => "Descripción (Categoría)",
        enableSorting: false,
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
      <KPage title="Feeds">
        <Box overflow="scroll" max-height="100%" width="100%">
          <Flex paddingBottom={5}>
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
            <Input
              mr={3}
              placeholder={"Buscar por ID"}
              width="auto"
              defaultValue={""}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
            <Box>
              {/* <Button marginRight={5} leftIcon={<FiChrome />}>
                  Descargar Google
                </Button>
                <Button marginRight={5} leftIcon={<FiFacebook />}>
                  Descargar Facebook
                </Button> */}

              <Button onClick={fetchFeed} colorScheme="blue">
                Publicar feed
              </Button>
            </Box>
          </Flex>
          {isFetching && (
            <motion.div
              initial={{ backgroundPosition: "0%" }}
              animate={{ backgroundPosition: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, #00b09b, #96c93d, #ffdd00, #ff7bac)",
                backgroundSize: "400% 400%",
                opacity: 0.3,
              }}
            />
          )}
          {Array.isArray(productFeedItems.data.items) && !isFetching && (
            <Flex>
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
                    link,
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
                    link,
                    product_type,
                    store,
                    brand,
                  })
                )}
              />
            </Flex>
          )}
          <Box>
            <Grid templateColumns="repeat(12, 1fr)" pt={3} pb={3}>
              <GridItem colSpan={2} textAlign={"center"}>
                {productFeedItems.data.items === 0
                  ? "Sin resultados"
                  : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${page} de ${productFeedItems.data.total}`}
              </GridItem>
              <GridItem colSpan={1} textAlign={"center"}>
                <ButtonGroup gap="1" display="flex" justifyContent="center">
                  <Box cursor="pointer">
                    <ChevronLeftIcon
                      fontSize="xl"
                      onClick={() => {
                        setPage((old) => Math.max(old - 1, 0));
                        void refetch();
                      }}
                    />
                  </Box>
                  <Box cursor="pointer">
                    <ChevronRightIcon
                      fontSize="xl"
                      onClick={() => {
                        if (!isPreviousData) {
                          setPage((old) => old + 1);
                          void refetch();
                        }
                      }}
                    />
                  </Box>
                </ButtonGroup>
              </GridItem>
            </Grid>
          </Box>
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
