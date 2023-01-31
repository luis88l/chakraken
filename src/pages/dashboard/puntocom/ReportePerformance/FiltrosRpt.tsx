import {
  Tabs,
  TabList,
  Tab,
  Grid,
  GridItem,
  Input,
  Select,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ApiService from "../../../../../data/services/ApiService";
import { orderBy } from "lodash";

export interface KFiltorsProps {
  setDataTabla: any;
  DataTabla: any[];
}

export default function Filtros(props: KFiltorsProps): any {
  const ID_DOMINIO_COPPEL = "3e22ec12-cdc3-11ea-863b-4b2d45d43637";
  /*   const ID_ROL_ADMINISTRADOR = 'f2320fd2-fd6f-4876-a8a5-e2c2d71f09aa'
    const KEY_CODE_ENTER = 13 */
  const ID_DOMINIO_PACO_EL_CHATO = "1dad3da1-4417-49db-8ecb-a583dc4a584e";
  const ID_ROL_PACO_EL_CHATO = "ac20691d-4818-4d08-8b2b-123e67108093";
  const [DataDominios, setDataDominios] = useState<any>([]);
  const [Dominio, setDominio] = useState<any>("");
  const [Busqueda, setBusqueda] = useState<any>([]);

  useEffect(() => {
    void CargarDominios();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const CargarPaginas = async () => {
    const form = new FormData();
    form.append("id_dominio", Dominio);
    form.append("numeroPagina", "0");
    form.append("registrosPorPagina", "1000");
    form.append("busqueda", Busqueda);

    await ApiService.getPaginasWithBudget(form).then((res: any) => {
      if (res.data.status === 200) {
        props.setDataTabla(orderBy(res.data.data, "sn_auditar", "desc"));
      } else {
        console.log("Ocurrio algo");
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const CargarDominios = async () => {
    const usuarioLocal = localStorage.getItem("_user");

    let dominioSlc = {
      idDominio: ID_DOMINIO_COPPEL,
      dominio: "Coppel",
    };
    let usuario = {
      nb_usuario: "",
      id_rol: "",
    };

    if (usuarioLocal != null) {
      usuario = JSON.parse(usuarioLocal);
      if (usuario.id_rol === ID_ROL_PACO_EL_CHATO) {
        dominioSlc = {
          idDominio: ID_DOMINIO_PACO_EL_CHATO,
          dominio: "Paco el Chato",
        };
      }
    }
    const dominiosIds =
      usuario.id_rol === ID_ROL_PACO_EL_CHATO ? [ID_DOMINIO_PACO_EL_CHATO] : [];

    await ApiService.getDominios(dominiosIds).then((res: any) => {
      if (res.data.status === 200) {
        setDataDominios(orderBy(res.data.data, "nb_dominio", "asc"));
        setDominio(ID_DOMINIO_COPPEL);
      } else {
        setDataDominios([dominioSlc]);
        setDominio(ID_DOMINIO_COPPEL);
      }
      void CargarPaginas();
    });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabDispositivos = (Opcion?: number) => {
    console.log(Opcion);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabReporte = (Opcion?: number) => {
    console.log(Opcion);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const TabRed = (Opcion: number) => {
    console.log(Opcion);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const ComboDominio = (e: any) => {
    const { value } = e.target;
    setDominio(value);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = (e: any) => {
    const { value } = e.target;
    setBusqueda(value);
  };

  const SelectTabColor = { color: "white", bg: "blue.500" };
  return (
    <Flex width="100%">
      <div style={{ contain: "flex-wrap", width: "100%" }}>
        <Grid width={"99%"} templateColumns="repeat(6, 1fr)" gap={4}>
          <GridItem margin={"5px"} colSpan={2}>
            <Tabs size={"sm"} variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab
                  fontSize={"inherit"}
                  border={"1px"}
                  onClick={() => TabDispositivos(1)}
                  key={1}
                  _selected={SelectTabColor}
                >
                  {"Todos"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabDispositivos(2)}
                  key={2}
                  _selected={SelectTabColor}
                >
                  {"Mobile"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabDispositivos(3)}
                  _selected={SelectTabColor}
                  key={3}
                >
                  {"Desktop"}
                </Tab>
              </TabList>
            </Tabs>
          </GridItem>
          <GridItem margin={"5px"} colStart={5} colEnd={7}>
            <Tabs size={"sm"} variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab
                  border={"1px"}
                  onClick={() => TabReporte(1)}
                  key={1}
                  _selected={SelectTabColor}
                >
                  {"Score"}
                </Tab>
                <Tab
                  fontSize={"inherit"}
                  border={"1px"}
                  onClick={() => TabReporte(2)}
                  key={2}
                  _selected={SelectTabColor}
                >
                  {"Performance Budget"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabReporte(3)}
                  key={3}
                  _selected={SelectTabColor}
                >
                  {"Metricas"}
                </Tab>
              </TabList>
            </Tabs>
          </GridItem>
        </Grid>
        <Grid
          style={{ marginTop: "2%", marginBottom: "3%" }}
          templateColumns="repeat(18, 1fr)"
          gap={18}
          width={"99%"}
          height={"-moz-max-content"}
        >
          <GridItem colSpan={1}>
            <FormLabel alignContent={"flex-end"} textAlign={"right"}>
              Dominio:{" "}
            </FormLabel>
          </GridItem>
          <GridItem alignContent={"flex-start"} colSpan={4}>
            <Select
              placeholder=""
              value={Dominio}
              onChange={(e: any) => ComboDominio(e)}
            >
              {DataDominios.map((Dominio: any, Index: number) => (
                <option key={"1" + String(Index)} value={Dominio.idDominio}>
                  {Dominio.dominio}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel textAlign={"right"}>Red:</FormLabel>
          </GridItem>
          <GridItem alignContent={"flex-start"} colSpan={2}>
            <Tabs size={"sm"} variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab
                  border={"1px"}
                  onClick={() => TabRed(1)}
                  key={1}
                  _selected={SelectTabColor}
                >
                  {"3G"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabRed(2)}
                  key={2}
                  _selected={SelectTabColor}
                >
                  {"4G"}
                </Tab>
              </TabList>
            </Tabs>
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Cache:</FormLabel>
          </GridItem>
          <GridItem colSpan={2}>
            <Tabs size={"sm"} variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab
                  border={"1px"}
                  onClick={() => TabRed(1)}
                  key={1}
                  _selected={SelectTabColor}
                >
                  {"No"}
                </Tab>
                <Tab
                  border={"1px"}
                  onClick={() => TabRed(2)}
                  key={2}
                  _selected={SelectTabColor}
                >
                  {"Si"}
                </Tab>
              </TabList>
            </Tabs>
          </GridItem>
          <GridItem colSpan={2}>
            <FormLabel>Buscar página</FormLabel>
          </GridItem>
          <GridItem colSpan={4}>
            <Input
              value={Busqueda}
              onChange={(e: any) => handleChange(e)}
              size="md"
            />
          </GridItem>
        </Grid>
      </div>
    </Flex>
  );
}
