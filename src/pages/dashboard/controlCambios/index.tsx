import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import { DateTime } from "luxon";
import KPage from "../../../components/page/KPage";
import {
  Box,
  Container,
  Divider,
  Icon,
  Input,
  Text,
  SimpleGrid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import ApiService from "../../../../data/services/ApiService";

import { RepeatIcon, CalendarIcon } from "@chakra-ui/icons";

export default function controlCambios(): any {
  const [stateObj, setStateObject] = useState<any>({
    rows: [],
    items: [],
    users: [],
    comentarios: [],
    usuarios: [],
    revisoresSeleccionados: [],
    id_revisorSeleccionado: "",
    sn_Editado: false,
    bloquear: false,
    openAlerta: false,
    abrirAgregar: false,
    abrirMensaje: false,
    id_responsable: "",
    id_Area: "",
    de_Area: "",
    id_tipoPeticion: "",
    de_Descripcion: "",
    fh_Requerido: "",
    id_estatus: "",
    de_estatus: "",
    url_Imagenes: "",
    url_Alts: "",
    url_Enlaces: "",
    url_copy: "",
    TiposPeticiones: [],
    EstatusPeticiones: [],
    Peticiones: [],
    InformacionUsuario: [],
    id_peticion: "",
    rowsPerPage: 25,
    page: 0,
    rowsPerPageTipos: 25,
    pageTipos: 0,
    snBloquearEstatus: false,
    de_tipoPeticion: "",
    id_rol: "",
    de_comentario: "",
    id_estatusOriginal: "",
    id_responsableRef: React.createRef(),
    id_tipoPeticionRef: React.createRef(),
    de_tipoPeticionRef: React.createRef(),
    de_DescripcionRef: React.createRef(),
    fh_RequeridoRef: React.createRef(),
    url_ImagenesRef: React.createRef(),
    url_AltsRef: React.createRef(),
    url_EnlacesRef: React.createRef(),
    url_copyRef: React.createRef(),
    de_comentarioRef: React.createRef(),
    viewSelected: "peticiones",
    id_autorPeticion: "",
    id_usuarioActual: "",
    openLoading: false,
    id_filtroEstatus: "",
    de_filtroResponsable: "",
    id_filtroPeticion: "",
    fh_filtroInicial: DateTime.local()
      .minus({ days: 7 })
      .toFormat("MMMM dd, yyyy"),
    fh_filtroFinal: DateTime.local().toFormat("MMMM dd, yyyy"),

    de_filtroUsuario: "",
    id_filtroTipo: "",

    mostrarCalendario: false,
    peticionesCalendario: [],

    resources: [
      {
        fieldName: "type",
        title: "Tipo",
        instances: [
          { id: "101", text: "Activa", color: "#3279a8" },
          { id: "102", text: "Rechazada", color: "#db162a" },
          { id: "103", text: "En desarrollo", color: "#1dcca6" },
          { id: "104", text: "En revisión", color: "#e36e1b" },
          { id: "105", text: "Terminada", color: "#24d41e" },
        ],
      },
    ],

    openConfirmar: false,
    verPeticion: false,
    eliminando: "",
  });

  const {
    isLoading,
    data: dataControlCambios,
    isSuccess,
  } = useQuery("dataControlCambios", async () => getConf());

  const getConf = () => {
    console.log(localStorage.getItem("idpeticion"), "HOLAAAAAA");
    const form = new FormData();
    filtrarPeticiones();
    console.log(stateObj, "ESTADOOOOO");

    ApiService.GetUserInfo(form).then((itemsInfo: any) => {
      ApiService.GetEstatusPeticiones().then((itemsE: any) => {
        ApiService.GetTiposPeticiones().then((itemsP: any) => {
          form.append("id_rol", "9cba1d03-71b0-4027-9037-bab15f5447fe"); // rol web Dev
          ApiService.getByRol(form).then((itemsUR: any) => {
            setStateObject({
              ...stateObj,
              EstatusPeticiones: itemsE.data.data,
              TiposPeticiones: itemsP.data.data,
              InformacionUsuario: itemsInfo.data.data,
              id_rol: itemsInfo.data.data[0].Rol.id_rol,
              users: itemsUR.data.data,
            });

            if (localStorage.getItem("idpeticion") !== null) {
              GetPeticionId(localStorage.getItem("idpeticion")!);
              // this.getAllUsers()
              // this.filtrarPeticiones()
            } else {
              getAllUsers();
            }
          });
        });
      });
    });
  };

  const GetPeticionId = (id: string) => {
    const form = new FormData();
    form.append("id", id);

    ApiService.getPeticionId(form).then((item: any) => {
      if (item.data.status === 200) {
        openEdit(item.data.data);
        
      }
    });
  };

  const openEdit = (item: any) => {
    const objUsuario = JSON.parse(localStorage.getItem("_user") || "{}");
    let snBloquear = true;
    let snBloquearEstatus = true;
    if (item.id_estatusPeticion !== 105 && item.id_estatusPeticion !== 102) {
      if (
        stateObj.InformacionUsuario[0].Rol.id_rol ===
          "f2320fd2-fd6f-4876-a8a5-e2c2d71f09aa" ||
        stateObj.InformacionUsuario[0].Rol.id_rol ===
          "9cba1d03-71b0-4027-9037-bab15f5447fe"
      ) {
        snBloquear = false;
        snBloquearEstatus = false;
      } else if (
        objUsuario.id_usuario === item.id_usuarioPeticion &&
        item.id_estatusPeticion === 101
      ) {
        snBloquear = false;
      }
    }

    setStateObject({
      ...stateObj,
      abrirAgregar: true,
      de_Area: item.nb_area ? item.nb_area : "sin asignar area",
      id_tipoPeticion: item.id_tipoPeticion,
      de_Descripcion: item.de_descripcion ? item.de_descripcion : "",
      fh_Requerido: item.fh_requerido.split("T")[0],
      url_Alts: item.url_alts ? item.url_alts : "",
      url_Enlaces: item.url_enlaces ? item.url_enlaces : "",
      url_Imagenes: item.url_imagenes ? item.url_imagenes : "",
      url_copy: item.url_copy ? item.url_copy : "",
      bloquear: snBloquear,
      de_tipoPeticion: "",
      id_peticion: item.id_peticion,
      snBloquearEstatus,
      id_responsable: item.id_responsable ? item.id_responsable : "",
      de_comentario: "",
      comentarios: [],
      revisoresSeleccionados: [],
      id_revisorSeleccionado: "",
      id_estatus: String(item.id_estatusPeticion),
      id_estatusOriginal: String(item.id_estatusPeticion),
      id_autorPeticion: item.id_usuarioPeticion,
      id_usuarioActual: objUsuario.id_usuario,
    }),
      () => {
        getComentarios();
        getRevisoresPeticion();
      };
  };

  const getRevisoresPeticion = () => {
    const { id_peticion } = stateObj;
    if (!id_peticion) {
      return;
    }
    const form = new FormData();
    form.append("id_peticion", id_peticion);

    ApiService.getRevisoresPeticion(form).then((item: any) => {
      if (item.data.status === 200) {
        setStateObject({
          ...stateObj,
          revisoresSeleccionados: item.data.data,
        });
        
      }
      // toast.error(
      //   <div>
      //     <i className="uil uil-exclamation-triangle"></i>Error al cargar
      //     Revisores
      //   </div>
      // );
    });
  };

  const getComentarios = () => {
    const { id_peticion } = stateObj;
    if (!id_peticion) {
      return;
    }
    const form = new FormData();
    form.append("id_peticion", id_peticion);

    ApiService.getComentarios(form).then((item: any) => {
      if (item.data.status === 200) {
        setStateObject({
          ...stateObj,
          comentarios: item.data.data,
        });
        
      }
      // toast.error(
      //   <div>
      //     <i className="uil uil-exclamation-triangle"></i>Error al cargar
      //     comentarios
      //   </div>
      // );
    });
  };

  const getAllUsers = () => {
    ApiService.getUserName().then((item: any) => {
      if (item.data.status === 200) {
        setStateObject({
          ...stateObj,
          usuarios: item.data.data,
        });
        
      }
      // toast.error(
      //   <div>
      //     <i className="uil uil-exclamation-triangle"></i>Error al cargar
      //     usuarios
      //   </div>
      // );
    });
  };

  const filtrarPeticiones = () => {
    const {
      id_filtroEstatus,
      de_filtroResponsable,
      id_filtroPeticion,
      fh_filtroInicial,
      fh_filtroFinal,
      de_filtroUsuario,
      id_filtroTipo,
    } = stateObj;

    const form = new FormData();

    if (!isNaN(parseInt(id_filtroPeticion, 10))) {
      form.append("id_peticion", id_filtroPeticion);
    }

    form.append("id_estatus", id_filtroEstatus);
    form.append("de_responsable", de_filtroResponsable);
    form.append("fh_inicio", fh_filtroInicial);
    form.append("fh_fin", fh_filtroFinal);
    form.append("de_usuario", de_filtroUsuario);
    form.append("id_tipo", id_filtroTipo);

    ApiService.GetPeticionesFiltros(form).then((items: any) => {
      if (items.data.status === 200) {
        setStateObject({
          ...stateObj,
          abrirAgregar: false,
          abrirMensaje: true,
          Peticiones: items.data.data[0],
        }),
          () => GetPenticionesResponsables(items.data.data[0]);
        
      }
      // toast.error(<div><i className="uil uil-exclamation-triangle"></i>
      //     &nbsp;&nbsp;Error al listar peticiones
      // </div>)
    });
  };

  const GetPenticionesResponsables = (peticiones: any) => {
    const peticionesaux = [];
    for (let i = 0; i < peticiones.length; i++) {
      // var fechainicio = moment(peticiones[i].fh_requerido.split('T')[0]).hour(8)
      // var fechaFin = moment(peticiones[i].fh_requerido.split('T')[0]).hour(18)
      const fechainicio = DateTime.local(
        peticiones[i].fh_requerido.split("T")[0]
      );
      const fechaFin = DateTime.local(peticiones[i].fh_requerido.split("T")[0]);
      peticionesaux.push({
        startDate: fechainicio,
        endDate: fechaFin,
        title: "Folio " + peticiones[i].id_peticion,
        type: peticiones[i].id_estatusPeticion.toString(),
        descripcion: peticiones[i].de_descripcion,
        solicitante: peticiones[i].nb_solicitante,
        responsable: peticiones[i].nb_responsable,
        peticion: peticiones[i],
      });
    }
    setStateObject({
      ...stateObj,
      peticionesCalendario: peticionesaux,
    });
  };

  const stableSort = (array: any, cmp: any) => {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });

    return stabilizedThis.map((el: any) => el[0]);
  };

  const desc = (a: any, b: any, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  };
  const getSorting = (order: any, orderBy: any) => {
    return order === "desc"
      ? (a: any, b: any) => {
          desc(a, b, orderBy);
        }
      : (a: any, b: any) => -desc(a, b, orderBy);
  };

  console.log(stateObj, "ESTADO COMPLETO");

  return (
    <KPage title="Web Developers > Control de Cambios">
      <Box max-height="100%" width="100%">
        <Container maxW="container.sm">
          <SimpleGrid columns={4} gap={2}>
            <Box w="100%" h="10">
              <Input placeholder="Folio" size="md" />
            </Box>

            <Box w="100%" h="10">
              <Input placeholder="Solicitante" size="md" />
            </Box>
            <Box w="100%" h="10">
              <Input placeholder="Tipo de peticion" size="md" />
            </Box>
            <Box w="100%" h="10">
              <Input placeholder="Responsable" size="md" />
            </Box>
            <Box w="100%" h="10">
              <Text mb="8px"> Fecha reg inicial:</Text>
              <Input
                placeholder="Fecha inicio"
                size="md"
                type="datetime-local"
              />
            </Box>
            <Box w="100%" h="10">
              <Text mb="8px"> Fecha reg final:</Text>
              <Input
                placeholder="Fecha inicio"
                size="md"
                type="datetime-local"
              />
            </Box>
            <Box w="100%" h="10" mt={8}>
              <Input placeholder="Estatus" size="md" />
            </Box>
            <Box w="100%" h="10" mt={8}>
              <Button colorScheme="teal" variant="solid" bg={"#f50057"}>
                <Icon as={RepeatIcon} />
              </Button>
              <Button colorScheme="teal" variant="solid" marginLeft={2}>
                Filtrar
              </Button>
            </Box>
          </SimpleGrid>
        </Container>

        <Divider mt={10} mb={10} />

        <SimpleGrid>
          <Box w="100%" h="10" textAlign="end">
            <Button
              colorScheme="teal"
              variant="solid"
              marginLeft={2}
              bg={"#f50057"}
              leftIcon={<CalendarIcon />}
            >
              Calendario
            </Button>
          </Box>
        </SimpleGrid>

        <Container maxW="container.lg">
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Folio</Th>
                  <Th>Solicitante</Th>
                  <Th>Tipo</Th>
                  <Th>Responsable</Th>
                  <Th>Requerido</Th>
                  <Th>Registro</Th>
                  <Th>Estatus</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {stableSort(stateObj.Peticiones, getSorting("asc", "createdAt"))
                .slice(
                  stateObj.page * stateObj.rowsPerPage,
                  stateObj.page * stateObj.rowsPerPage + stateObj.rowsPerPage
                )
                .map((item: any, key: any) => {
                  return (
                    // <RowItem
                    //   key={key}
                    //   item={item}
                    //   openEdit={this.openEdit}
                    //   getItems={this.Get}
                    //   deletePeticion={this.DeletePeticion}
                    //   id_rol={this.state.id_rol}
                    // />

                    <Tr>
                      <Td>{item.Folio}</Td>
                    </Tr>
                  );
                })} */}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </KPage>
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
