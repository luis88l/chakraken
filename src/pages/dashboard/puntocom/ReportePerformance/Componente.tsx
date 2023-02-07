/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import { DataGrid } from "devextreme-react";
import { Scrolling, Column, ColumnFixing } from "devextreme-react/data-grid";
import { Switch } from "devextreme-react/switch";
import "devextreme/dist/css/dx.light.css";

export interface KTablaProps {
  DataTabla: any[];
}

export function Contenido(props: KTablaProps): any {
  console.log("🚀 ~ file: Componente.tsx:14 ~ props", props);

  const onChangeEstatusAuditoria = (e: any) => {
    console.log(e);
  };

  const AuditoriaRender = (cell: any) => {
    return (
      <Switch
        id={cell.data.id_pagina}
        value={cell.value}
        onValueChanged={onChangeEstatusAuditoria}
      />
    );
  };

  return (
    <Box width="100%" h="auto">
      <DataGrid height={"600"} dataSource={props.DataTabla} showBorders>
        <Scrolling mode="virtual" />
        <ColumnFixing enabled={true} />
        <Column
          caption={"Auditar"}
          dataField={"sn_auditar"}
          editCellRender={AuditoriaRender}
          fixed
          width={"10%"}
        />
        <Column dataField={"nb_pagina"} caption="Pagina" fixed width={"30%"} />
        <Column dataField={"de_ruta"} caption="Ruta" />
      </DataGrid>
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
