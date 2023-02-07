import { getSession } from "next-auth/react";
import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Center,
  Text,
  Input,
  Flex,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Select,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import ApiService from "../../../../data/services/ApiService";
import { useQuery, useMutation } from "react-query";

export interface topics {
  id_topic: string;
  de_topic: string;
}

export interface medios {
  id_medio: string;
  de_medio: string;
}

export interface fuentes {
  id_fuente: string;
  de_fuente: string;
}

export default function TabEnvio(): any {
  const [notification, setNotificatiion] = useState({
    titulo: "",
    url: "",
    mensaje: "",
    url_imagen: "",
    tokenRef: "",
    campania: "",
    fuente: "",
    id_topic: "",
    id_medio: "",
    nu_HorasVida: 24,
    fh_programado: "",
    de_estatus: "Nueva",
    id_push: "",
    icon: "https://cdn2.coppel.com/wcsstore/AuroraStorefrontAssetStore/emarketing/pwa/logo-coppel-512.png",
  });

  const [disableButtons, setDisable] = useState(false);
  const [tokenUsuario, setTokenUsuario] = useState("");
  const [arrTopics, setTopics] = useState([]);
  const [arrMedios, setMedios] = useState([]);
  const [arrFuentes, setFuentes] = useState([]);
  const [tipoSubmit, setSubmit] = useState("");

  // FETCH
  // TOPICS
  useQuery("updateTopics", async () => await ApiService.getTopics(), {
    onSuccess: (res) => {
      setTopics(res.data.data);
    },
  });

  // MEDIOS
  useQuery("updateMedios", async () => await ApiService.getMedios(), {
    onSuccess: (res) => {
      setMedios(res.data.data);
    },
  });

  // FUENTES
  useQuery("updateFuentes", async () => await ApiService.getFuentes(), {
    onSuccess: (res) => {
      setFuentes(res.data.data);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
    const { name, value } = e.currentTarget;
    setNotificatiion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>): any => {
    const { value } = e.currentTarget;
    setTokenUsuario(value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): any => {
    const { name, value } = e.currentTarget;
    setNotificatiion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent): Promise<any> => {
    event.preventDefault();
    if (tipoSubmit === "save") {
      savePush.mutate();
    } else {
      testPush.mutate();
    }
  };

  const LimpiarPantalla = (): any => {
    setNotificatiion((prevState) => ({
      ...prevState,
      titulo: "",
      url: "",
      mensaje: "",
      url_imagen: "",
      tokenRef: "",
      campania: "",
      fuente: "",
      id_topic: "",
      id_medio: "",
      nu_HorasVida: 24,
      fh_programado: "",
      de_estatus: "Nueva",
      id_push: "",
    }));
  };

  const savePush = useMutation("addPush", {
    mutationFn: async () => {
      setDisable(true);
      return await ApiService.pushNotificationsSave(notification);
    },
    onSuccess: (res) => {
      setDisable(false);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (notification.id_push) return;
      setNotificatiion((prevState) => ({
        ...prevState,
        id_push: res.data.data.id_push,
      }));
    },
    onError(error, variables, context) {
      setDisable(false);
      console.error("ERROR", error);
    },
  });

  const testPush = useMutation("testPush", {
    mutationFn: async () => {
      setDisable(true);

      return await ApiService.pushNotificationsTest(notification);
    },
    onSuccess: (res) => {
      setDisable(false);
      console.log(res);
    },
    onError(error, variables, context) {
      setDisable(false);
      console.error("ERROR", error);
    },
  });

  return (
    <Box>
      <Flex>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Text fontSize="2xl"> Enviar Push </Text>
            <br />
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Título</FormLabel>
                    <Input
                      value={notification.titulo}
                      onChange={handleChange}
                      placeholder="Título"
                      size="md"
                      name="titulo"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Topic</FormLabel>
                    <Select
                      placeholder="Topic"
                      size="md"
                      value={notification.id_topic}
                      name="id_topic"
                      onChange={handleChangeSelect}
                    >
                      {arrTopics.map((obj: topics, i: number) => {
                        return (
                          <option key={obj.id_topic} value={obj.id_topic}>
                            {obj.de_topic}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Horas de vida</FormLabel>
                    <Input
                      value={notification.nu_HorasVida}
                      onChange={handleChange}
                      placeholder="Horas de vida"
                      size="md"
                      type="number"
                      name="nu_HorasVida"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                  <FormControl isRequired>
                    <FormLabel>Url Coppel</FormLabel>
                    <Input
                      value={notification.url}
                      onChange={handleChange}
                      placeholder="URL"
                      size="md"
                      name="url"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                  <FormControl isRequired>
                    <FormLabel>Mensaje</FormLabel>
                    <Input
                      value={notification.mensaje}
                      onChange={handleChange}
                      placeholder="Mensaje"
                      size="md"
                      name="mensaje"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                  <FormControl isRequired>
                    <FormLabel>Url imagen</FormLabel>
                    <Input
                      value={notification.url_imagen}
                      onChange={handleChange}
                      placeholder="URL imagen"
                      size="md"
                      name="url_imagen"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Campaña</FormLabel>
                    <Input
                      value={notification.campania}
                      onChange={handleChange}
                      placeholder="Campaña"
                      size="md"
                      name="campania"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Fuente</FormLabel>
                    <Select
                      size="md"
                      name="fuente"
                      onChange={handleChangeSelect}
                      value={notification.fuente}
                      placeholder="Fuente"
                    >
                      {arrFuentes.map((obj: fuentes, i: number) => {
                        return (
                          <option key={obj.id_fuente} value={obj.id_fuente}>
                            {obj.de_fuente}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Medio</FormLabel>
                    <Select
                      size="md"
                      name="id_medio"
                      value={notification.id_medio}
                      onChange={handleChangeSelect}
                      placeholder="Medio"
                    >
                      {arrMedios.map((obj: medios, i: number) => {
                        return (
                          <option key={obj.id_medio} value={obj.id_medio}>
                            {obj.de_medio}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Hora de envio</FormLabel>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                      onChange={handleChange}
                      name="fh_programado"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Estatus</FormLabel>
                    <Input
                      value={notification.de_estatus}
                      placeholder="Estatus"
                      size="md"
                      name="Estatus"
                      disabled
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={5}>
                  <FormControl>
                    <FormLabel>Toke de prueba</FormLabel>
                    <Input
                      value={tokenUsuario}
                      onChange={handleChangeToken}
                      placeholder="Token usuario para prueba"
                      size="md"
                      name="tokenUsuario"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormLabel>&nbsp;</FormLabel>
                  <Button
                    colorScheme="blue"
                    size="md"
                    variant="ghost"
                    verticalAlign={"bottom"}
                    disabled={disableButtons}
                    onClick={() => setSubmit("test")}
                    type="submit"
                    width={"100%"}
                  >
                    Test
                  </Button>
                </GridItem>

                <GridItem colSpan={6}>
                  <Center>
                    <Button
                      colorScheme="white"
                      size="md"
                      variant="outline"
                      width="200px"
                      borderRadius={50}
                      onClick={LimpiarPantalla}
                      disabled={disableButtons}
                    >
                      Nueva
                    </Button>
                    <Button
                      colorScheme="blue"
                      width="200px"
                      borderRadius={50}
                      size="md"
                      variant="solid"
                      marginLeft={5}
                      type="submit"
                      disabled={disableButtons}
                      onClick={() => setSubmit("save")}
                    >
                      Guardar
                    </Button>
                  </Center>
                </GridItem>
              </Grid>
            </form>
          </GridItem>
          <GridItem>
            <Tabs variant="soft-rounded" colorScheme="gray" align="center">
              <TabList>
                <Tab>Iphone </Tab>
                <Tab> Android </Tab>
                <Tab> Web </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one! </p>
                </TabPanel>
                <TabPanel>
                  <p>two! </p>
                </TabPanel>
                <TabPanel>
                  <p>Web! </p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </Grid>
      </Flex>
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
