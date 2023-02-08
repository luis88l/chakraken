import { getSession } from "next-auth/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { DateTime } from "luxon";
// import KPage from "../../../components/page/KPage";
import {
  Flex,
  Box,
  ButtonGroup,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  EditIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import ApiService from "../../../../data/services/ApiService";
import { Props } from "next/script";

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
      console.log("numeropagina", numeropagina);
      return await ApiService.pushNotificationsGet({
        numeropagina,
        filaspagina,
      });
    },
    onSuccess: async (res) => {
      const arrL = res.data.data.rows?.length || 0;
      setTotal(res.data.data.count);
      setArrPush(res.data.data.rows);
      let ini = (numeropagina + 1) * filaspagina - (filaspagina - 1);
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

  const handleChangeSelect = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    await setFilas(parseInt(value));
    refetchList();
  };

  const changePage = async (val: number) => {
    if ((val === -1 && numeropagina === 0) || (val === 1 && Final === total)) {
      return;
    }
    await setPagina(numeropagina + val);
    refetchList();
  };

  const editPush = (id: string) => {
    props.parentF(id);
  };
  return (
    <Grid templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={11}></GridItem>
      <GridItem colSpan={1}>
        <ButtonGroup gap="1" display="flex" justifyContent="center">
          <Box m={1} cursor="pointer">
            <RepeatIcon onClick={() => refetchList()} />
          </Box>
        </ButtonGroup>
      </GridItem>
      <GridItem colSpan={12}>
        <KTableLayout columns={columnas} data={arrPush} />
      </GridItem>
      <GridItem colSpan={12}>&nbsp;</GridItem>
      <GridItem colSpan={6}></GridItem>
      <GridItem colSpan={2} textAlign={"right"}>
        Registros por página:&nbsp;
      </GridItem>
      <GridItem colSpan={1}>
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
      <GridItem colSpan={2} textAlign={"center"}>
        {arrPush.length === 0
          ? "Sin resultados"
          : `${Inicial} - ${Final} de ${total}`}
      </GridItem>
      <GridItem colSpan={1} textAlign={"center"}>
        <ButtonGroup gap="1" display="flex" justifyContent="center">
          <Box m={1} cursor="pointer">
            <ChevronLeftIcon onClick={() => changePage(-1)} />
          </Box>
          <Box m={1} cursor="pointer">
            <ChevronRightIcon onClick={() => changePage(1)} />
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
