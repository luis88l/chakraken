/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getSession } from "next-auth/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { DateTime } from "luxon";
import { Box, ButtonGroup, Select, Grid, GridItem } from "@chakra-ui/react";
import {
  EditIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import ApiService from "../../../../data/services/ApiService";

export interface Push {
  id_push: string;
  de_mensaje: string;
  de_campania: string;
  Fuente: {
    nombre: string;
  };
  fh_programado: string;
  Estatus: {
    de_estatus: string;
  };
}

export default function TabHistorial(props: { parentF: Function }): any {
  const [arrPush, setArrPush] = useState([]);
  const [numeropagina, setPagina] = useState(0);
  const [filaspagina, setFilas] = useState(25);
  const [total, setTotal] = useState(0);
  const [Inicial, setIni] = useState(0);
  const [Final, setFinal] = useState(0);

  // TOPICS
  const { refetch: refetchList } = useQuery("updateListaPush", {
    queryFn: async () => {
      return await ApiService.pushNotificationsGet({
        numeropagina,
        filaspagina,
      });
    },
    onSuccess: async (res) => {
      const arrL = res.data.data.rows?.length || 0;
      setTotal(res.data.data.count);
      setArrPush(res.data.data.rows);
      const ini = (numeropagina + 1) * filaspagina - (filaspagina - 1);
      setIni(ini);
      const fin = ini + (arrL - 1);
      setFinal(fin);
    },
  });

  const columnH = createColumnHelper<Push>();
  const columnas = [
    columnH.accessor("de_mensaje", {
      cell: (info) => (
        <span
          style={{ width: 400, display: "block" }}
        >{`${info.getValue()}`}</span>
      ),
      header: "Mensaje",
    }),
    columnH.accessor("de_campania", {
      cell: (info) => (
        <span
          style={{ width: 160, display: "block" }}
        >{`${info.getValue()}`}</span>
      ),
      header: "Campaña",
    }),
    columnH.accessor("Fuente", {
      cell: (info) => info.getValue().nombre,
      header: "Fuente",
    }),
    columnH.accessor("Estatus", {
      cell: (info) => info.getValue().de_estatus,
      header: "Estatus",
    }),
    columnH.accessor("fh_programado", {
      cell: (info) =>
        info.getValue()
          ? DateTime.fromISO(info.getValue()).toFormat("dd/MM/yyyy HH:mm")
          : "",
      header: "Fecha",
    }),
    columnH.accessor("id_push", {
      cell: (info) => (
        <ButtonGroup gap="1" display="flex" justifyContent="center">
          <Box m={1} cursor="pointer">
            <EditIcon mr={6} onClick={() => editPush(info.getValue())} />
          </Box>
        </ButtonGroup>
      ),
      header: "Acciones",
    }),
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeSelect = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.currentTarget;
    await setFilas(parseInt(value));
    void refetchList();
  };

  const changePage = async (val: number) => {
    if ((val === -1 && numeropagina === 0) || (val === 1 && Final === total)) {
      return;
    }
    await setPagina(numeropagina + val);
    void refetchList();
  };

  const editPush = (id: string) => {
    props.parentF(id);
  };

  const UpdateLista = async () => {
    await setPagina(0);
    void refetchList();
  };

  return (
    <Grid templateColumns="repeat(12, 1fr)" w={1000} overflow="auto">
      <GridItem colSpan={11}></GridItem>
      <GridItem colSpan={1}>
        <ButtonGroup gap="1" display="flex" justifyContent="center">
          <Box m={1} cursor="pointer">
            <RepeatIcon onClick={async () => await UpdateLista()} />
          </Box>
        </ButtonGroup>
      </GridItem>
      <GridItem colSpan={12}>
        <KTableLayout columns={columnas} data={arrPush} />
      </GridItem>
      <GridItem colSpan={12}>&nbsp;</GridItem>
      <GridItem colSpan={{ base: 5, sm: 5, md: 1, lg: 4 }}></GridItem>
      <GridItem
        colSpan={{ base: 10, sm: 10, md: 4, lg: 2 }}
        textAlign={"right"}
      >
        Registros por página:&nbsp;
      </GridItem>
      <GridItem colSpan={{ base: 2, sm: 2, md: 1, lg: 1 }}>
        <Select
          size="sm"
          value={filaspagina}
          name="filaspagina"
          onChange={handleChangeSelect}
          textAlign={"center"}
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </GridItem>
      <GridItem
        colSpan={{ base: 11, sm: 10, md: 3, lg: 2 }}
        textAlign={{ base: "right", sm: "right", md: "center", lg: "center" }}
        mt={{ base: "10px", sm: "10px", md: 0, lg: 0 }}
        // border="solid 1px red"
      >
        {arrPush.length === 0
          ? "Sin resultados"
          : `${Inicial} - ${Final} de ${total}`}
      </GridItem>
      <GridItem
        colSpan={{ base: 1, sm: 1, md: 1, lg: 1 }}
        textAlign={{ base: "right", sm: "right", md: "center", lg: "center" }}
        mt={{ base: "5px", sm: "5px", md: 0, lg: 0 }}
      >
        <ButtonGroup gap="1" display="flex" justifyContent="center">
          <Box m={1} cursor="pointer">
            <ChevronLeftIcon onClick={async () => await changePage(-1)} />
          </Box>
          <Box m={1} cursor="pointer">
            <ChevronRightIcon onClick={async () => await changePage(1)} />
          </Box>
        </ButtonGroup>
      </GridItem>
    </Grid>
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
