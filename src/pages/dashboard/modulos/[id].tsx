import React, { useState } from "react";
import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useMutation, useQuery } from "react-query";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";

export interface modulosTable {
  nb_modulo: string;
  id_modulo: string;
  nu_orden: number;
  acciones: string;
}

interface moduloProps {
  id_modulo: string;
  nb_modulo: string;
  de_clase: string;
  de_modulo: string;
}

export default function Modulo(): any {
  const colSpan = { base: 2, md: 1 };
  const router = useRouter();
  const [nombreModulo, setNombreModulo] = useState("");
  const [claseModulo, setClaseModulo] = useState("");
  const [descripcionModulo, setDescripcionModulo] = useState("");
  const [updating, setUpdating] = useState(false);
  const [opcionesModulo, setOpcionesModulo] = useState([
    { nb_opcion: "", de_ruta: "", estado: "", nu_orden: 0, id_modulo: "" },
  ]);

  const getOpcionModulo: any = async () => {
    const formData = new FormData();
    formData.append("id_modulo", moduloDetails.id_modulo);
    const gola = await ApiService.getOpcionesModulos(formData);
    return gola.data.data;
  };

  const { isLoading: cargandoOpciones } = useQuery(
    "opciones",
    getOpcionModulo,
    {
      onSuccess: setOpcionesModulo,
    }
  );

  const { isLoading, data: modules } = useQuery(
    "modulos",
    async () => await ApiService.getModulos()
  );

  const updateModulo = useMutation(
    async (formData: any) => {
      return await ApiService.updateModulos(formData);
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  if (isLoading && cargandoOpciones) {
    return <p>Cargando...</p>;
  }

  const modulo = modules?.filter(
    (modulo: { id_modulo: string | string[] | undefined }) =>
      modulo.id_modulo === router.query.id
  );

  const handleOpciones = (e: any, index: number, op: any) => {
    if (index === -1) {
      setOpcionesModulo([
        ...opcionesModulo,
        {
          nb_opcion: "",
          de_ruta: "",
          estado: "creado",
          id_modulo: "",
          nu_orden: 0,
        },
      ]);
    } else {
      const name = e.target.name,
        value = e.target.value,
        opcionesArray = [...opcionesModulo];

      // @ts-expect-error
      opcionesArray[index][name] = value;
      if (op.id_modulo !== "") {
        opcionesArray[index].estado = "modificado";
      }

      setOpcionesModulo(opcionesArray);
    }
  };

  const handleRemoveOpcion = (opcion: number) => {
    const opciones = [...opcionesModulo];

    opciones[opcion].estado = "eliminado";

    setOpcionesModulo(opciones);
  };

  // @ts-expect-error
  const moduloDetails: moduloProps = modulo[0];

  const crearOpcionesModulo = useMutation(async (formData: any) => {
    return await ApiService.saveOpcionesModulos(formData);
  });

  const updateOpcionesModulo = useMutation(async (formData: any) => {
    return await ApiService.updateOpcionesModulos(formData);
  });

  const deleteOpcionesModulo = useMutation(async (formData: any) => {
    return await ApiService.deleteOpcionesModulos(formData);
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setUpdating(true);
    let ordenOpciones = 0;
    const opcionesEliminadas = [],
      opcionesModificadas = [],
      opcionesCreadas = [];
    for (let i = 0; i < opcionesModulo.length; i++) {
      if (
        opcionesModulo[i].estado === "eliminado" &&
        opcionesModulo[i].id_modulo !== ""
      ) {
        opcionesEliminadas.push(opcionesModulo[i]);
      } else if (opcionesModulo[i].estado === "creado") {
        opcionesModulo[i].nu_orden = ordenOpciones;
        opcionesModulo[i].id_modulo = moduloDetails.id_modulo;
        ordenOpciones = ordenOpciones + 1;
        opcionesCreadas.push(opcionesModulo[i]);
      } else if (opcionesModulo[i].estado === "modificado") {
        opcionesModulo[i].nu_orden = ordenOpciones;
        ordenOpciones = ordenOpciones + 1;
        opcionesModificadas.push(opcionesModulo[i]);
      }
    }

    if (opcionesEliminadas.length > 0) {
      const FormDataEliminar = new FormData();
      FormDataEliminar.append("Opciones", JSON.stringify(opcionesEliminadas));
      deleteOpcionesModulo.mutate(FormDataEliminar);
    }
    if (opcionesModificadas.length > 0) {
      const FormDataModificadas = new FormData();
      FormDataModificadas.append(
        "Opciones",
        JSON.stringify(opcionesModificadas)
      );
      updateOpcionesModulo.mutate(FormDataModificadas);
    }
    if (opcionesCreadas.length > 0) {
      const FormDataCrear = new FormData();
      FormDataCrear.append("Opciones", JSON.stringify(opcionesCreadas));
      crearOpcionesModulo.mutate(FormDataCrear);
    }

    const formData = new FormData();
    formData.append("id_modulo", moduloDetails.id_modulo);
    formData.append(
      "nb_modulo",
      nombreModulo === "" ? moduloDetails.nb_modulo : nombreModulo
    );
    formData.append(
      "de_clase",
      claseModulo === "" ? moduloDetails.de_clase : claseModulo
    );
    formData.append(
      "de_modulo",
      descripcionModulo === "" && moduloDetails.de_modulo !== ""
        ? moduloDetails.de_modulo
        : descripcionModulo
    );
    updateModulo.mutate(formData);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <KPage title={"Módulo " + moduloDetails.nb_modulo}>
      <Box overflow="scroll" max-height="100%" width="100%">
        <Box>
          <Text fontSize="l" fontWeight="bold">
            Actualizar módulo
          </Text>
        </Box>
        <Divider mt={2} mb={2} />
        <Box>
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={5}>
              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    defaultValue={moduloDetails.nb_modulo}
                    onChange={(event) => {
                      setNombreModulo(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Clase</FormLabel>
                  <Input
                    defaultValue={moduloDetails.de_clase}
                    onChange={(event) => {
                      setClaseModulo(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea
                    defaultValue={moduloDetails.de_modulo}
                    onChange={(event) => {
                      setDescripcionModulo(event.currentTarget.value);
                    }}
                  ></Textarea>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}></GridItem>
              <GridItem mt={10} colSpan={2}>
                <Flex alignItems="center" gap={2}>
                  <Text fontSize="l" fontWeight="bold">
                    Opciones de módulo
                  </Text>
                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    bg="#3a47bd"
                    borderRadius={15}
                    color="#fff"
                    onClick={() => {
                      handleOpciones("", -1, "");
                    }}
                  >
                    Agregar opción
                  </Button>
                </Flex>
                <Grid mt={5} templateColumns="1fr 1fr 50px" gap={5}>
                  <GridItem>
                    <Text>Nombre</Text>
                  </GridItem>
                  <GridItem>
                    <Text>Ruta</Text>
                  </GridItem>
                  <GridItem colSpan={1}></GridItem>

                  {opcionesModulo.length > 0 &&
                    opcionesModulo.map((opcion: any, index: number) => {
                      if (
                        opcion.estado === "" ||
                        opcion.estado !== "eliminado"
                      ) {
                        return (
                          <React.Fragment key={index}>
                            <GridItem>
                              <Input
                                name="nb_opcion"
                                value={opcion.nb_opcion}
                                marginBottom="10px"
                                onChange={(event) => {
                                  handleOpciones(event, index, opcion);
                                }}
                              />
                            </GridItem>
                            <GridItem>
                              <Input
                                name="de_ruta"
                                value={opcion.de_ruta}
                                marginBottom="10px"
                                onChange={(event) => {
                                  handleOpciones(event, index, opcion);
                                }}
                              />
                            </GridItem>
                            <GridItem>
                              <Button
                                variant="primary"
                                size="md"
                                type="button"
                                bg="red"
                                borderRadius={15}
                                color="#fff"
                                onClick={() => {
                                  handleRemoveOpcion(index);
                                }}
                              >
                                <FiX />
                              </Button>
                            </GridItem>
                          </React.Fragment>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                </Grid>
              </GridItem>
              <GridItem colSpan={1}></GridItem>
              <GridItem colSpan={1}></GridItem>
              <GridItem colSpan={1}>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  bg="#3a47bd"
                  borderRadius={15}
                  color="#fff"
                  rightIcon={
                    updating ? (
                      <CircularProgress
                        isIndeterminate
                        color="white"
                        size={"20px"}
                      />
                    ) : undefined
                  }
                >
                  Actualizar
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
        </Box>
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
