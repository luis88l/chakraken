import { getSession } from "next-auth/react";
import { KTableLayout } from "../../../../components/tableLayout/KTableLayout";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Stack, Switch } from "@chakra-ui/react";

export interface KTablaProps {
  DataTabla: any[];
}

export function Contenido(props: KTablaProps): any {
  // console.log("🚀 ~ file: Componente.tsx:14 ~ props", props)
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("sn_auditar", {
      cell: (info) => {
        return (
          <Stack align="center" direction="row">
            <Switch size="sm" isChecked={info.getValue()} />
          </Stack>
        );
      },
      header: "Auditar",
    }),
    columnHelper.accessor("nb_pagina", {
      cell: (info) => info.getValue(),
      header: "Pagina",
    }),
  ];
  return (
    <Box overflow="scroll" h={"700px"} width="100%">
      <KTableLayout columns={columns} data={props.DataTabla} />
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
