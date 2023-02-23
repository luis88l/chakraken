/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  useMediaQuery,
} from "@chakra-ui/react";
import ApiService from "../../../../data/services/ApiService";
import { useQuery, useMutation } from "react-query";
import { DateTime } from "luxon";

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

export default function TabEnvio(props: {
  id_push: string;
  updateId: Function;
}): any {
  const [notification, setNotificatiion] = useState({
    titulo: "",
    url: "/",
    mensaje: "",
    url_imagen: "",
    tokenRef: "",
    campania: "",
    fuente: "",
    id_topic: "",
    id_medio: "",
    nu_HorasVida: 24,
    fh_programado: "",
    id_estatus: 101,
    de_estatus: "Nueva",
    id_push: "",
    icon: "https://cdn2.coppel.com/wcsstore/AuroraStorefrontAssetStore/emarketing/pwa/logo-coppel-512.png",
  });

  const [isLargerThan450] = useMediaQuery("(min-width: 800px)");

  const [disableButtons, setDisable] = useState(false);
  const [tokenUsuario, setTokenUsuario] = useState("");
  const [arrTopics, setTopics] = useState([]);
  const [arrMedios, setMedios] = useState([]);
  const [arrFuentes, setFuentes] = useState([]);
  const [tipoSubmit, setSubmit] = useState("");

  // GET USER TOKEN
  // TOPICS
  useQuery("UserToken", async () => await ApiService.getTokenUser(), {
    onSuccess: (res) => {
      if (res?.data?.data[0]?.de_tokenPush) {
        setTokenUsuario(res?.data?.data[0]?.de_tokenPush);
      }
    },
  });

  // FETCH
  const { refetch: actualizarPush } = useQuery(["searchPush", props.id_push], {
    queryFn: async () => {
      if (!props.id_push) {
        return "";
      } else {
        return await ApiService.pushNotificationsGet({
          id_push: props.id_push,
          numeropagina: 0,
          filaspagina: 1,
        });
      }
    },
    onSuccess: async (res) => {
      if (res?.status !== 200) {
        return;
      }

      const objP = res.data.data.rows[0];
      setNotificatiion((prevState) => ({
        ...prevState,
        titulo: objP.de_titulo,
        url: objP.de_url,
        mensaje: objP.de_mensaje,
        url_imagen: objP.url_imagen,
        campania: objP.de_campania,
        fuente: objP.id_fuente,
        id_topic: objP.id_topic,
        id_medio: objP.id_medio,
        nu_HorasVida: objP.nu_HorasVida,
        fh_programado: objP.fh_programado
          ? DateTime.fromISO(objP.fh_programado).toISO({
              includeOffset: false,
              suppressSeconds: true,
              suppressMilliseconds: true,
            })
          : "",
        id_estatus: objP.id_estatus,
        de_estatus: objP.Estatus.de_estatus,
        id_push: objP.id_push,
      }));
    },
  });

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
    let { name, value } = e.currentTarget;
    if (name === "url" && (!value || !value.startsWith("/"))) {
      value = "/";
    }
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
    setDisable(true);
    if (tipoSubmit === "save") {
      savePush.mutate();
    } else if (tipoSubmit === "cancelar") {
      cancelarPush.mutate();
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
      id_estatus: 101,
      de_estatus: "Nueva",
      id_push: "",
    }));

    props.updateId("");
  };

  const savePush = useMutation("addPush", {
    mutationFn: async () => {
      return await ApiService.pushNotificationsSave(notification);
    },
    onSuccess: (res) => {
      setDisable(false);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!notification.id_push) {
        props.updateId(res.data.data.id_push);
      }
      void actualizarPush();
    },
    onError(error, variables, context) {
      setDisable(false);
      console.error("ERROR", error);
    },
  });

  const testPush = useMutation("testPush", {
    mutationFn: async () => {
      const jsonPeticion = {
        ...notification,
        tokenUsuarioPrueba: tokenUsuario,
      };
      return await ApiService.pushNotificationsTest(jsonPeticion);
    },
    onSuccess: (res) => {
      setDisable(false);
    },
    onError(error, variables, context) {
      setDisable(false);
      console.error("ERROR", error);
    },
  });

  const cancelarPush = useMutation("cancelarPush", {
    mutationFn: async () => {
      const jsonPeticion = {
        id_push: notification.id_push,
      };
      return await ApiService.cancelPush(jsonPeticion);
    },
    onSuccess: (res) => {
      setDisable(false);
      void actualizarPush();
    },
    onError(error, variables, context) {
      setDisable(false);
      console.error("ERROR", error);
    },
  });

  return (
    <Box>
      <Flex>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
        >
          <GridItem>
            <Text fontSize="2xl"> Enviar Push </Text>
            <br />
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(6, 1fr)" gap={1}>
                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 8 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 10, lg: 2 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 2, lg: 2 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 12 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 12 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 12 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 11, lg: 7 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 1, lg: 5 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 7 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 5 }}>
                  <FormControl>
                    <FormLabel>Hora de envio</FormLabel>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                      onChange={handleChange}
                      name="fh_programado"
                      value={notification.fh_programado}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 7 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 5 }}>
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

                <GridItem colSpan={{ base: 12, sm: 12 }}>
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

                <GridItem
                  colSpan={{ base: 12, sm: 12, md: 12, lg: 12 }}
                  alignItems={{
                    base: "center",
                    sm: "center",
                    md: "center",
                    lg: "center",
                  }}
                >
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
                    {notification.id_estatus === 101 ? (
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
                    ) : (
                      ""
                    )}

                    {notification.id_push &&
                    (notification.id_estatus === 101 ||
                      notification.id_estatus === 102) ? (
                      <Button
                        colorScheme="red"
                        width="200px"
                        borderRadius={50}
                        size="md"
                        variant="solid"
                        marginLeft={5}
                        type="submit"
                        disabled={disableButtons}
                        onClick={() => setSubmit("cancelar")}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      ""
                    )}
                  </Center>
                </GridItem>
              </Grid>
            </form>
          </GridItem>
          {isLargerThan450 ? (
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
          ) : null}
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
