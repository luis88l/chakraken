import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex, Select } from "@chakra-ui/react";
import Link from "next/link";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import error from "next/error";

export interface modulosTable {
  nb_modulo: string;
  id_modulo: string;
  nu_orden: number;
  acciones: string;
  de_modulo: string;
  de_clase: string;
}

export interface orderModule {
  id_modulo: string;
  nu_orden: number;
}

export default function Modulos(): any {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: modules,
    isSuccess,
  } = useQuery<modulosTable[], error>(
    "modulos",
    async () => await ApiService.getModulos()
  );

  const updateOrder = useMutation(
    async (formData: any) => {
      return await ApiService.updateOrdenModulos(formData);
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries("modulos");
        void queryClient.invalidateQueries("opcionesModulos");
      },
    }
  );

  if (isLoading && !isSuccess) {
    return <KSkeletonPage />;
  }

  if (isSuccess && typeof modules !== "undefined") {
    const columnHelper = createColumnHelper<modulosTable>();

    const orderHandler = async (
      event: {
        target: any;
        preventDefault: () => void;
      },
      id_modulo: string
    ): Promise<any> => {
      event.preventDefault();
      const positionToChange = event.target.value;
      const newOrder: orderModule[] = [];

      const currentModulo = modules?.filter(
        (modulo: { id_modulo: string | string[] | undefined }) =>
          modulo.id_modulo === id_modulo
      );

      // new position
      newOrder.push({
        nu_orden: parseInt(positionToChange),
        id_modulo: currentModulo[0].id_modulo,
      });

      // eslint-disable-next-line array-callback-return
      modules.map((module: any, index: number): any => {
        if (id_modulo !== modules[index].id_modulo) {
          newOrder.push({
            nu_orden: index,
            id_modulo: modules[index].id_modulo,
          });
        }
      });

      const form = new FormData();
      form.append("arrModulos", JSON.stringify(newOrder));
      updateOrder.mutate(form);
    };

    const columns = [
      columnHelper.accessor("nb_modulo", {
        cell: (info) => info.getValue(),
        header: "Nombre",
      }),
      columnHelper.accessor("nu_orden", {
        cell: (info) => info.getValue(),
        header: "Orden",
      }),
      columnHelper.accessor("id_modulo", {
        cell: (props) => (
          <ButtonGroup gap="2" display="flex" justifyContent="space-between">
            <Box>
              <Select
                // eslint-disable-next-line react/prop-types
                defaultValue={props.row.original.nu_orden}
                onChange={async (event) =>
                  // eslint-disable-next-line react/prop-types
                  await orderHandler(event, props.row.original.id_modulo)
                }
              >
                {modules?.map((value) => (
                  <option key={value.id_modulo} value={value.nu_orden}>
                    {value.nu_orden}
                  </option>
                ))}
              </Select>
            </Box>
            <Box>
              <Box m={1} cursor="pointer">
                <Link
                  href={{
                    // eslint-disable-next-line react/prop-types
                    pathname:
                      // eslint-disable-next-line react/prop-types
                      "/dashboard/modulos/" + props.row.original.id_modulo,
                  }}
                >
                  <EditIcon mr={6} />
                </Link>
                <DeleteIcon />
              </Box>
            </Box>
          </ButtonGroup>
        ),
        header: "Acciones",
      }),
    ];
    return (
      <KPage title="Módulos">
        <Box>
          <Flex mb={4} display="grid" justifyItems="flex-end">
            <Link href={"/dashboard/modulos/new"}>
              <Button
                w="200px"
                alignSelf="flex-end"
                color="#fff"
                bg="#1cb35b"
                _hover={{ bg: "#238152" }}
                leftIcon={<AddIcon />}
              >
                Nuevo módulo
              </Button>
            </Link>
          </Flex>
          {Array.isArray(modules) && (
            <KTableLayout
              columns={columns}
              // @ts-expect-error
              data={modules.map(({ nb_modulo, id_modulo, nu_orden }) => ({
                id_modulo,
                nb_modulo,
                nu_orden,
              }))}
            />
          )}
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
