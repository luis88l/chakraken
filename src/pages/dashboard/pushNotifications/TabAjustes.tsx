import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Flex,
  Box,
  Input,
  FormControl,
  CircularProgress,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

export interface standarClass {
  id: string;
  de: string;
}

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

export default function TabAjustes(): any {
  const [de_topic, setTopic] = useState("");
  const [de_medio, setMedio] = useState("");
  const [de_fuente, setFuente] = useState("");
  const [updating, setUpdating] = useState(false);
  const [arrTopics, setTopics] = useState([]);
  const [arrMedios, setMedios] = useState([]);
  const [arrFuentes, setFuentes] = useState([]);

  // TOPICS
  const { refetch: refetchTopics } = useQuery(
    "updateTopics",
    async () => await ApiService.getTopics(),
    {
      onSuccess: (res) => {
        setTopics(res.data.data);
      },
    }
  );

  const addTopic = useMutation("addTopic", {
    mutationFn: async () => {
      setUpdating(true);
      const formData = new FormData();
      formData.append("name", de_topic);
      return await ApiService.saveTopics(formData);
    },
    onSuccess: (data) => {
      setUpdating(false);
      setTopic("");
      refetchTopics();
    },
    onError(error, variables, context) {
      console.error("ERROR", error);
    },
  });

  // COLUMNAS DE TABLAS
  const columnHelperTopics = createColumnHelper<topics>();
  const columnasTopics = [
    columnHelperTopics.accessor("de_topic", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelperTopics.accessor("id_topic", {
      id: "id_topic",
      header: "Eliminar",
      cell: (props) => (
        <ButtonGroup gap="1">
          <Button
            m={2}
            cursor="pointer"
            onClick={() => deleteTopic.mutate(props.getValue())}
          >
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      ),
    }),
  ];

  const handleSubmitTopics = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();
    addTopic.mutate();
  };

  const deleteTopic = useMutation("deleteTopic", {
    mutationFn: async (id: string) => {
      const formData = new FormData();
      formData.append("id", id);
      return await ApiService.deleteTopics(formData);
    },
    onSuccess: (data) => {
      refetchTopics();
    },
    onError(error, variables, context) {
      console.error("ERROR ON DELETE", error);
    },
  });

  // MEDIOS
  const { refetch: refetchMedios } = useQuery(
    "updateMedios",
    async () => await ApiService.getMedios(),
    {
      onSuccess: (res) => {
        setMedios(res.data.data);
      },
    }
  );

  const addMedio = useMutation("addMedio", {
    mutationFn: async () => {
      setUpdating(true);
      if (!de_medio) {
        return;
      }
      const formData = new FormData();
      formData.append("name", de_medio);
      return await ApiService.saveMedios(formData);
    },
    onSuccess: (data) => {
      setUpdating(false);
      setMedio("");
      refetchMedios();
    },
    onError(error, variables, context) {
      console.error("ERROR", error);
    },
  });

  // COLUMNAS DE TABLAS
  const columnHelperMedios = createColumnHelper<medios>();
  const columnasMedios = [
    columnHelperMedios.accessor("de_medio", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelperMedios.accessor("id_medio", {
      id: "id_medio",
      header: "Eliminar",
      cell: (props) => (
        <ButtonGroup gap="1">
          <Button
            m={2}
            cursor="pointer"
            onClick={() => deleteMedio.mutate(props.getValue())}
          >
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      ),
    }),
  ];

  const handleSubmitMedios = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();
    addMedio.mutate();
  };

  const deleteMedio = useMutation("deleteMedio", {
    mutationFn: async (id: string) => {
      const formData = new FormData();
      formData.append("id", id);
      return await ApiService.deleteMedios(formData);
    },
    onSuccess: (data) => {
      refetchMedios();
    },
    onError(error, variables, context) {
      console.error("ERROR ON DELETE", error);
    },
  });

  // FUENTES
  const { refetch: refetchFuentes } = useQuery(
    "updateFuentes",
    async () => await ApiService.getFuentes(),
    {
      onSuccess: (res) => {
        setFuentes(res.data.data);
      },
    }
  );

  const addFuente = useMutation("addFuente", {
    mutationFn: async () => {
      setUpdating(true);
      const formData = new FormData();
      formData.append("name", de_fuente);
      return await ApiService.saveFuentes(formData);
    },
    onSuccess: (data) => {
      setUpdating(false);
      setFuente("");
      refetchFuentes();
    },
    onError(error, variables, context) {
      console.error("ERROR", error);
    },
  });

  // COLUMNAS DE TABLAS
  const columnHelperFuentes = createColumnHelper<fuentes>();
  const columnasFuentes = [
    columnHelperFuentes.accessor("de_fuente", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelperFuentes.accessor("id_fuente", {
      id: "id_fuente",
      header: "Eliminar",
      cell: (props) => (
        <ButtonGroup gap="1">
          <Button
            m={2}
            cursor="pointer"
            onClick={() => deleteFuente.mutate(props.getValue())}
          >
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      ),
    }),
  ];

  const handleSubmitFuentes = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();
    addFuente.mutate();
  };

  const deleteFuente = useMutation("deleteFuente", {
    mutationFn: async (id: string) => {
      const formData = new FormData();
      formData.append("id", id);
      return await ApiService.deleteFuentes(formData);
    },
    onSuccess: (data) => {
      refetchFuentes();
    },
    onError(error, variables, context) {
      console.error("ERROR ON DELETE", error);
    },
  });

  return (
    <Box w="100%">
      <Flex>
        <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={4}>
          {/* TOPICS  */}
          <GridItem colSpan={1}>
            <h2>Topics</h2>
            <form onSubmit={handleSubmitTopics}>
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={3}>
                  <FormControl isRequired>
                    <Input
                      value={de_topic}
                      onChange={(event) => {
                        setTopic(event.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} verticalAlign={"middle"}>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    bg="#3a47bd"
                    borderRadius={5}
                    rightIcon={
                      updating ? (
                        <CircularProgress
                          isIndeterminate
                          color="white"
                          size={"20px"}
                        />
                      ) : (
                        <AddIcon color="white" width={20} />
                      )
                    }
                  />
                </GridItem>
              </Grid>
            </form>
            <KTableLayout columns={columnasTopics} data={arrTopics} />
          </GridItem>
          {/* MEDIOS  */}
          <GridItem colSpan={1}>
            <h2>Medios</h2>
            <form onSubmit={handleSubmitMedios}>
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={3}>
                  <FormControl isRequired>
                    <Input
                      value={de_medio}
                      onChange={(event) => {
                        setMedio(event.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} verticalAlign={"middle"}>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    bg="#3a47bd"
                    borderRadius={5}
                    rightIcon={
                      updating ? (
                        <CircularProgress
                          isIndeterminate
                          color="white"
                          size={"20px"}
                        />
                      ) : (
                        <AddIcon color="white" width={20} />
                      )
                    }
                  />
                </GridItem>
              </Grid>
            </form>
            <KTableLayout columns={columnasMedios} data={arrMedios} />
          </GridItem>
          {/* FUENTES  */}
          <GridItem colSpan={1}>
            <h2>Fuente</h2>
            <form onSubmit={handleSubmitFuentes}>
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={3}>
                  <FormControl isRequired>
                    <Input
                      value={de_fuente}
                      onChange={(event) => {
                        setFuente(event.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2} verticalAlign={"middle"}>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    bg="#3a47bd"
                    borderRadius={5}
                    rightIcon={
                      updating ? (
                        <CircularProgress
                          isIndeterminate
                          color="white"
                          size={"20px"}
                        />
                      ) : (
                        <AddIcon color="white" width={20} />
                      )
                    }
                  />
                </GridItem>
              </Grid>
            </form>
            <KTableLayout columns={columnasFuentes} data={arrFuentes} />
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
