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
  GridItem,
  Input,
  SimpleGrid,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";

export default function enviosCorreos(): any {
  const [correosConf, setCorreos] = useState([
    { id_correo: "", nb_dominio: "", nb_correo: "", estado: "" },
  ]);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const { isLoading } = useQuery(
    "correoQuery",
    async () => await ApiService.getCorreos(),
    {
      onSuccess: (data) => setCorreos(data.data.data),
    }
  );

  const crearCorreos = useMutation(async (formData: any) => {
    return await ApiService.saveCorreos(formData);
  });

  const updateCorreos = useMutation(async (formData: any) => {
    return await ApiService.updateCorreos(formData);
  });

  const deleteCorreos = useMutation(async (formData: any) => {
    return await ApiService.deleteCorreos(formData);
  });

  const handleCorreos = (e: any, index: number, op: any): void => {
    if (index === -1) {
      setCorreos([
        ...correosConf,
        {
          id_correo: "",
          nb_dominio: "",
          estado: "creado",
          nb_correo: "",
        },
      ]);
    } else {
      const name = e.target.name;
      const value = e.target.value;
      const correosArray = [...correosConf];

      // @ts-expect-error
      correosArray[index][name] = value;
      if (op.id_correo !== "") {
        correosArray[index].estado = "modificado";
      }
      setCorreos(correosArray);
    }
  };

  const handleRemoveCorreo = (opcion: number): void => {
    const c = [...correosConf];

    c[opcion].estado = "eliminado";

    setCorreos(c);
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    setUpdating(true);

    const correosEliminados = [];
    const correosModificados = [];
    const correosCreados = [];

    for (let i = 0; i < correosConf.length; i++) {
      if (
        correosConf[i].estado === "eliminado" &&
        correosConf[i].id_correo !== ""
      ) {
        correosEliminados.push(correosConf[i]);
      } else if (correosConf[i].estado === "creado") {
        correosCreados.push(correosConf[i]);
      } else if (correosConf[i].estado === "modificado") {
        correosModificados.push(correosConf[i]);
      }
    }

    if (correosEliminados.length > 0) {
      const FormDataEliminar = new FormData();
      FormDataEliminar.append("correos", JSON.stringify(correosEliminados));
      deleteCorreos.mutate(FormDataEliminar);
    }
    if (correosModificados.length > 0) {
      const FormDataModificados = new FormData();
      FormDataModificados.append("correos", JSON.stringify(correosModificados));
      updateCorreos.mutate(FormDataModificados);
    }
    if (correosCreados.length > 0) {
      const FormDataCrear = new FormData();
      FormDataCrear.append("correos", JSON.stringify(correosCreados));
      crearCorreos.mutate(FormDataCrear);
    }

    router.back();
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <KPage title="Configuración de correos">
      <Box overflow="scroll" max-height="100%" width="100%">
        <Box>
          <Button
            variant="primary"
            size="sm"
            type="button"
            bg="#3a47bd"
            borderRadius={15}
            color="#fff"
            onClick={() => {
              handleCorreos("", -1, "");
            }}
          >
            Agregar correo
          </Button>
        </Box>
        <Divider mt={2} mb={2} />
        <Box>
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={5}>
              <GridItem mt={5} colSpan={2}>
                <Grid templateColumns="1fr 1fr 50px" gap={5}>
                  <GridItem>
                    <Text>Dominio</Text>
                  </GridItem>
                  <GridItem>
                    <Text>Correo</Text>
                  </GridItem>
                  <GridItem colSpan={1}></GridItem>

                  {correosConf.length > 0 &&
                    correosConf.map((correo: any, index: number) => {
                      if (
                        correo.estado === "" ||
                        correo.estado !== "eliminado"
                      ) {
                        return (
                          <React.Fragment key={index}>
                            <GridItem>
                              <Input
                                name="nb_dominio"
                                value={correo.nb_dominio}
                                marginBottom="10px"
                                onChange={(event) => {
                                  handleCorreos(event, index, correo);
                                }}
                              />
                            </GridItem>
                            <GridItem>
                              <Input
                                name="nb_correo"
                                value={correo.nb_correo}
                                marginBottom="10px"
                                onChange={(event) => {
                                  handleCorreos(event, index, correo);
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
                                  handleRemoveCorreo(index);
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
                  disabled={isLoading}
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
                  Guardar cambios
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
