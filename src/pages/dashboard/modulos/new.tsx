import React, { useState } from "react";
import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useMutation } from "react-query";
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
  Grid,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";

export default function New(): any {
  const colSpan = { base: 2, md: 1 };
  const router = useRouter();
  const [nombreModulo, setNombreModulo] = useState("");
  const [claseModulo, setClaseModulo] = useState("");
  const [descripcionModulo, setDescripcionModulo] = useState("");
  const [updating, setUpdating] = useState(false);
  const [opcionesModulo, setOpcionesModulo] = useState([
    { nb_opcion: "", de_ruta: "" },
  ]);

  const crearModulo = useMutation(
    async (formData: any) => {
      return await ApiService.saveModulos(formData);
    },
    {
      onSuccess: (data) => {
        const { id_modulo } = data.data.data[0];
        if (opcionesModulo.length > 0 && opcionesModulo[0].nb_opcion !== "") {
          const opciones = opcionesModulo.map((opcion: any, index: number) => ({
            ...opcion,
            id_modulo: id_modulo,
            nu_orden: index,
          }));

          const formDataOpciones = new FormData();
          formDataOpciones.append("Opciones", JSON.stringify(opciones));
          crearOpcionesModulo.mutate(formDataOpciones);
        } else {
          router.back();
        }
      },
    }
  );

  const crearOpcionesModulo = useMutation(
    async (formData: any) => {
      return await ApiService.saveOpcionesModulos(formData);
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  const handleOpciones = (e: any, index: number) => {
    if (index === -1) {
      setOpcionesModulo([
        ...opcionesModulo,
        {
          nb_opcion: "",
          de_ruta: "",
        },
      ]);
    } else {
      const name = e.target.name,
        value = e.target.value,
        opcionesArray = [...opcionesModulo];

      // @ts-expect-error
      opcionesArray[index][name] = value;

      setOpcionesModulo(opcionesArray);
    }
  };

  const handleRemoveOpcion = (opcion: number) => {
    const opciones = opcionesModulo.filter(
      (valor: any, i: number) => i !== opcion
    );

    setOpcionesModulo(opciones);
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append("nb_modulo", nombreModulo);
    formData.append("de_clase", claseModulo);
    formData.append("de_modulo", descripcionModulo);
    crearModulo.mutate(formData);
  };

  return (
    <KPage title="Crear módulo">
      <Box overflow="scroll" max-height="100%" width="100%">
        <Box>
          <Text fontSize="l" fontWeight="bold">
            Crear módulo
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
                      handleOpciones("", -1);
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
                    opcionesModulo.map((opcion: any, index: number) => (
                      <React.Fragment key={index}>
                        <GridItem>
                          <Input
                            name="nb_opcion"
                            value={opcion.nb_opcion}
                            marginBottom="10px"
                            onChange={(event) => {
                              handleOpciones(event, index);
                            }}
                          />
                        </GridItem>
                        <GridItem>
                          <Input
                            name="de_ruta"
                            value={opcion.de_ruta}
                            marginBottom="10px"
                            onChange={(event) => {
                              handleOpciones(event, index);
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
                    ))}
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
                  Crear módulo
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
