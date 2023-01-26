import { getSession } from "next-auth/react";
import { KTableLayout } from "../../../../components/tableLayout/KTableLayout";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Box,
} from "@chakra-ui/react";

export function Contenido(): any {
  const columnHelper = createColumnHelper<any>();
  const modules: any[] = [];
  const columns = [
    columnHelper.accessor("nb_modulo", {
      cell: (info) => info.getValue(),
      header: "Nombre",
    }),
    columnHelper.accessor("nu_orden", {
      cell: (info) => info.getValue(),
      header: "Orden",
    })
    /*     columnHelper.accessor("id_modulo", {
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
        }), */
  ];
  return (
    <Box overflow="scroll" h={'700px'} width="100%" >
      <KTableLayout
        columns={columns}
        data={modules.map(({ nb_modulo, id_modulo, nu_orden }) => ({
          id_modulo,
          nb_modulo,
          nu_orden,
        }))}
      />
    </Box>
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
