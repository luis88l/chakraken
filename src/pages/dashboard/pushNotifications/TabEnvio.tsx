import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Center,
  Text,
  Input,
  Wrap,
  WrapItem,
  Flex,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Select,
  Button,
} from "@chakra-ui/react";
import ApiService from "../../../../data/services/ApiService";

export default function TabEnvio(): any {
  const [notification, setNotificatiion] = useState({
    titulo: "",
    topic: "",
    horas: "",
    url: "",
    mensaje: "",
    url_imagen: "",
    campa: "",
    fecha: "",
    tokenUsuario: "",
    tokenRef: "",
    campania: "",
    id_fuentePush: "",
    id_topicPush: "",
    id_medioPush: "",
    nu_HorasVida: "",
    fh_programado: "",
    id_push: "",
  });

  const [tokenUsuarioPrueba, setTokenUsuarioPrueba] = useState("");

  const [testBtnDisabled, setTestBtnDisabled] = useState(false);
  const [itemsMedio, setItemsMedio] = useState([
    { id_medio: "", de_medio: "" },
  ]);
  const [itemsFuente, setItemsFuente] = useState([
    { id_fuente: "", de_fuente: "" },
  ]);

  const [id_push, setId_push] = useState("");
  const [id_estatusPush, setId_estatusPush] = useState("");

  const [nameTopic, setNameTopic] = useState("");
  const [nameMedio, setNameMedio] = useState("");
  const [nameTopicModal, setNameTopicModal] = useState("");
  const [nameMedioModal, setNameMedioModal] = useState("");
  const [nameFuente, setNameFuente] = useState("");
  const [nameFuenteModal, setNameFuenteModal] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalMedios, setOpenModalMedios] = useState(false);
  const [openModalFuente, setOpenModalFuente] = useState(false);
  const [crearMedioAjustes, setCrearMedioAjustes] = useState(false);
  const [crearFuenteAjustes, setCrearFuenteAjustes] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [rowsPerPageEnvio, setRowsPerPageEnvios] = useState(false);
  const [items, setItems] = useState([]);
  const [pageEnvio, setPageEnvio] = useState(false);
  const [numeroregistros, setNumeroRegistros] = useState(0);
  const [itemsTopic, setItemsTopic] = useState([]);

  // const [pageEnvio, setPageEnvio] = useState(false);

  useEffect(() => {
    ApiService.getMedios().then((item: any) => {
      if (item.data.status === 200) {
        setItemsMedio(item.data.data);
      }
    });

    ApiService.getFuentes().then((item: any) => {
      if (item.data.status === 200) {
        setItemsFuente(item.data.data);
      }
    });

    ApiService.getTopics().then((item: any) => {
      if (item.data.status === 200) {
        setItemsTopic(item.data.data);
      }
    });

    ApiService.getFuentes().then((item: any) => {
      if (item.data.status === 200) {
        setItemsFuente(item.data.data);
      }
    });
  }, []);

  const onChangeHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificatiion({
      ...notification,
      [e.target.name]: e.target.value,
    });
  };

  const test = () => {
    setTestBtnDisabled(true);
    const {
      mensaje,
      titulo,
      url,
      campania,
      id_fuentePush,
      id_topicPush,
      id_medioPush,
      tokenRef,
      url_imagen,
      nu_HorasVida,
    } = notification;

    // if (!this.validarCampos()) {
    //   this.setState({
    //     testBtnDisabled: false,
    //   });
    //   return;
    // }

    // VALIDAR TOKEN
    // if (!tokenUsuarioPrueba) {
    //   let CampoL = tokenRef.current;
    //   // toast.error(
    //   //   <div>
    //   //     <i className="uil uil-exclamation-triangle"></i>&nbsp;&nbsp;Falta
    //   //     token de usuario
    //   //   </div>
    //   // );
    //   setTimeout(() => {
    //     CampoL.focus();
    //   }, 500);
    //   this.setState({
    //     testBtnDisabled: false,
    //   });
    //   return;
    // }

    let deMmedio: string = "";
    for (let i = 0; i < itemsMedio.length; i++) {
      if (itemsMedio[i].id_medio === id_medioPush) {
        deMmedio = itemsMedio[i].de_medio;
      }
    }
    let deFuente = "";
    for (let x = 0; x < itemsFuente.length; x++) {
      if (itemsFuente[x].id_fuente === id_fuentePush) {
        deFuente = itemsFuente[x].de_fuente;
      }
    }

    const form = new FormData();
    form.append("programado", "false");
    form.append("mensaje", mensaje);
    form.append("titulo", titulo);
    form.append("url", url);
    form.append("campania", campania);
    form.append("fuente", deFuente);
    form.append("id_topic", id_topicPush);
    form.append("de_medio", deMmedio);
    form.append("content_available", "true");
    form.append("priority", "high");
    form.append("tokenUsuarioPrueba", tokenUsuarioPrueba);
    form.append(
      "icon",
      "https://cdn2.coppel.com/wcsstore/AuroraStorefrontAssetStore/emarketing/pwa/logo-coppel-512.png"
    );
    form.append("url_imagen", url_imagen);
    form.append("nu_HorasVida", nu_HorasVida.toString());

    ApiService.pushNotificationsTest(form).then((item: any) => {
      if (item.status === 200) {
        // toast.success(
        //   <div>
        //     <i className="uil uil-check"></i>Se envio notificación
        //   </div>
        // );
        setTestBtnDisabled(false);
        return;
      }
      // toast.error(
      //   <div>
      //     <i className="uil uil-exclamation-triangle"></i>Problema al enviar
      //     notificación
      //   </div>
      // );

      setTestBtnDisabled(false);
    });
  };

  const Send = () => {
    const {
      mensaje,
      titulo,
      url,
      campania,
      id_fuentePush,
      id_topicPush,
      id_medioPush,
      fh_programado,
      id_push,
      url_imagen,
      nu_HorasVida,
    } = notification;
    const form = new FormData();

    // if (!this.validarCampos()) {
    //     return
    // }
    form.append("programado", "false");
    form.append("mensaje", mensaje);
    form.append("titulo", titulo);
    form.append("url", url);
    form.append("campania", campania);
    form.append("fuente", id_fuentePush);
    form.append("id_topic", id_topicPush);
    form.append("id_medio", id_medioPush);
    form.append("content_available", "true");
    form.append("priority", "high");
    form.append("fh_programado", fh_programado);
    form.append(
      "icon",
      "https://cdn2.coppel.com/wcsstore/AuroraStorefrontAssetStore/emarketing/pwa/logo-coppel-512.png"
    );
    form.append("id_push", id_push);
    form.append("url_imagen", url_imagen);
    form.append("nu_HorasVida", nu_HorasVida.toString());

    ApiService.pushNotificationsSave(form).then((item: any) => {
      if (item && item.status === 200) {
        setId_push(item.data.data.id_push);
        setId_estatusPush(item.data.data.id_estatus);

        // toast.success(
        //   <div>
        //     <i className="uil uil-check"></i>Se guardo notificación
        //   </div>
        // );
        Get();
        closeAdd();
      }
      // toast.error(
      //   <div>
      //     <i className="uil uil-exclamation-triangle"></i>Problema al guardar
      //     notificación
      //   </div>
      // );
    });
  };

  const Get = () => {
    const form = new FormData();

    form.append("numeropagina", pageEnvio as any);
    form.append("filaspagina", rowsPerPageEnvio as any);
    ApiService.pushNotificationsGet(form).then((item: any) => {
      if (item.data.status === 200) {
        if (items.length < numeroregistros) {
          console.log("entro en el primer if");
          const itemsArray = items;

          const nuevoitems = itemsArray.concat(item.data.data.rows);

          setItems(nuevoitems);
        } else {
          if (items.length === 0) {
            setItems(item.data.data.rows);
            setNumeroRegistros(item.data.data.count);
          }
        }
      }
    });
  };

  const closeAdd = () => {
    setNameTopic("");
    setNameMedio("");
    setNameTopicModal("");
    setNameMedioModal("");
    setNameFuente("");
    setNameFuenteModal("");
    setIsEdit(false);
    setOpenModal(false);
    setOpenModalMedios(false);
    setOpenModalFuente(false);
    setCrearFuenteAjustes(false);
    setCrearMedioAjustes(false);
    openAdd();
  };

  const openAdd = () => {
    setOpenSave(!openSave);

    const form = new FormData();

    ApiService.getTokenUser(form).then((item: any) => {
      if (item.status === 200) {
        const token = item.data.data[0].de_tokenPush;

        setTokenUsuarioPrueba(token);
      }
      // toast.error(<div><i className="uil uil-exclamation-triangle"></i>Problema al enviar notificación</div>)
    });
  };

  console.log(notification);
  console.log(itemsFuente);
  console.log(itemsTopic);
  console.log(itemsMedio);

  return (
    <Box>
      <Flex>
        <Grid margin={0} templateColumns="repeat(2, 1fr)" gap={1}>
          <GridItem padding="7px" w="100%">
            <Box w="100%">
              <Text fontSize="2xl"> Enviar mensaje </Text>
              <br />
              <Wrap spacing="10px">
                <WrapItem>
                  <Center w="180px">
                    <Input
                      value={notification.titulo}
                      onChange={onChangeHandle}
                      placeholder="Título"
                      size="md"
                      name="titulo"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="160px">
                    <Select
                      placeholder="Topic"
                      size="md"
                      value={notification.topic}
                      // onChange={onChangeHandle}
                    >
                      {itemsTopic.map((obj: any, i: number) => {
                        return (
                          <option key={i} value={obj.id_topic}>
                            {obj.de_topic}
                          </option>
                        );
                      })}
                    </Select>
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="140px">
                    <Input
                      value={notification.horas}
                      onChange={onChangeHandle}
                      placeholder="Horas de vida"
                      size="md"
                      type="number"
                      name="horas"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="500px">
                    {" "}
                    <Input
                      value={notification.url}
                      onChange={onChangeHandle}
                      placeholder="URL"
                      size="md"
                      name="url"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="500px">
                    <Input
                      value={notification.mensaje}
                      onChange={onChangeHandle}
                      placeholder="Mensaje"
                      size="md"
                      name="mensaje"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="500px">
                    <Input
                      value={notification.url_imagen}
                      onChange={onChangeHandle}
                      placeholder="URL imagen"
                      size="md"
                      name="url_imagen"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="200px">
                    <Input
                      value={notification.campa}
                      onChange={onChangeHandle}
                      placeholder="Campaña"
                      size="md"
                      name="campa"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="140px">
                    <Select size="md">
                      {itemsFuente.map((obj: any, i: number) => {
                        return (
                          <option key={i} value={obj.id_fuente}>
                            {obj.de_fuente}
                          </option>
                        );
                      })}
                    </Select>
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="140px">
                    <Select size="md">
                      {itemsMedio.map((obj: any, i: number) => {
                        return (
                          <option key={i} value={obj.id_medio}>
                            {obj.de_medio}
                          </option>
                        );
                      })}
                    </Select>
                  </Center>
                </WrapItem>

                <WrapItem>
                  <Center w="270px">
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="220px">
                    <Input
                      value={notification.fecha}
                      onChange={onChangeHandle}
                      placeholder="Fecha enviada"
                      size="md"
                      name="fecha"
                      disabled
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="300px">
                    <Input
                      value={notification.tokenUsuario}
                      onChange={onChangeHandle}
                      placeholder="Token usuario para prueba"
                      size="md"
                      name="tokenUsuario"
                    />
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="100px">
                    <Button
                      colorScheme="blue"
                      size="md"
                      variant="ghost"
                      onClick={test}
                    >
                      Test
                    </Button>
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="240px">
                    <Button
                      colorScheme="white"
                      size="md"
                      variant="outline"
                      width="200px"
                      borderRadius={50}
                    >
                      Nueva
                    </Button>
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center w="240px">
                    <Button
                      onClick={Send}
                      colorScheme="blue"
                      width="200px"
                      borderRadius={50}
                      size="md"
                      variant="solid"
                    >
                      Guardar
                    </Button>
                  </Center>
                </WrapItem>
              </Wrap>
            </Box>
          </GridItem>
          <GridItem padding="7px" w="100%">
            <Box w="100%" bg="">
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
            </Box>
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
