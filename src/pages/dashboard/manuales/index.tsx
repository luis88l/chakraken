import React, { useState } from "react";
import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { FiUpload } from "react-icons/fi";

import {
  Box,
  Stack,
  Textarea,
  Divider,
  Input,
  Text,
  CardBody,
  Button,
  Card,
  Image,
  Heading,
  SimpleGrid,
  Th,
  Td,
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { OPTIMIZED_FONT_PROVIDERS } from "next/dist/shared/lib/constants";
import { FILE } from "dns";

// interface Props {
//   onRef?: Function;
//   onChange?: Function;
//   classes: {
//     body: string;
//     buttonPrimary: string;
//     eliminar: string;
//     formTitle: string;
//     header: string;
//     headerBreadCrumb: string;
//     headerTitle: string;
//     sectionHelper: string;
//     textField: string;
//     buttonPrimaryUpload: string;
//     buttonFile: string;
//     actionsButtons: string;
//   };

//   interface State {
//     rowsPerPage: number
//     page: number
//     items: []
//     id: string
//     name: string
//     descripcion: string
//     portada: string
//     openSave: boolean
//     isVisible: boolean
//     isEdit: boolean
//     modulos: []
//     sn_editado: boolean
//     file: any
//     nombrefile: string
//     manual: string
//     nombreportada: string
//     openConfirmar: boolean
//     nombreManual: string
//     portadaaux: string
//     nombreportadaaux: string
//     eliminando: string
// }
interface IFile {
  file: File;
  uploadProgress: number;
  uploadError: string;
}

export default function Manuales(): any {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedFiles, setSelectedFiles] = useState<
    IFile[] | undefined | null
  >([]);

  const [stateObj, setStateObject] = useState<any>({
    rowsPerPage: 10,
    page: 0,
    items: [],
    id: "",
    name: "",
    openSave: false,
    isVisible: false,
    isEdit: false,
    modulos: [],
    sn_editado: false,
    file: null,
    nombrefile: "",
    manual: "",
    descripcion: "",
    portada: "",
    nombreportada: "",
    openConfirmar: false,
    nombreManual: "",
    portadaaux: "",
    nombreportadaaux: "",
    eliminando: "",
  });

  const {
    isLoading,
    data: tableros,
    isSuccess,
  } = useQuery("manuales", async () => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && stateObj.openSave) {
        closeAdd();
      }
    });

    Get();
  });

  const Get = () => {
    ApiService.getManuales().then(
      (item: { data: { status: number; data: [] } }) => {
        if (item.data.status === 200) {
          setStateObject({
            ...stateObj,
            items: item.data.data,
          });
        }
      }
    );
  };

  const closeAdd = () => {
    setStateObject({
      ...stateObj,
      name: "",
      isEdit: false,
      id: "",
      descripcion: "",
      portada: "",
      file: null,
      nombreportada: "",
      portadaaux: "",
      nombreportadaaux: "",
    }),
      () => {
        openAdd();
      };
  };

  const openAdd = () => {
    setStateObject({
      ...stateObj,
      openSave: stateObj.openSave,
    });
  };

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSelected: File[] = Array.prototype.slice.call(
      event?.target?.files
    );
    const modified = currentSelected.map((file) => {
      return {
        file,
        uploadError: "test",
        uploadProgress: 20,
      };
    });

    setSelectedFiles(modified);
    Save(modified[0].file);
  };

  const Save = (file: any) => {
    console.log(file, " el archvonn babababb");

    const filesCaptura = new FormData();
    filesCaptura.append("fileToImport", file);

    ApiService.importRecoverPassword(filesCaptura).then((response) => {
      if (response.data.status === 200) {
        console.log("Archivo guardado correctamente");
        Get();
        return;
      }
      console.log("Tuvimos algun problema al guardar el archivo");
    });
  };

  function dehash() {
    const diccionario = "abehimoprstuv";
    let seed = 83503320370387;
    let str = "";
    for (let i = 0; i < 10; i++) {
      const realNumber = seed % 17;
      console.log(realNumber, "REALNUMBER");
      console.log(seed);
      seed = (seed - realNumber) / 17;
      // console.log(seed);

      str += diccionario[realNumber];
      console.log(str);
    }

    return str;
  }

  // console.log(dehash());

  // 83503320370387;
  function hash(x: any) {
    let seed = 41;
    const diccionario = "abehimoprstuv";
    for (let i = 0; i < x.length; i++) {
      console.log(seed * 17);
      console.log(diccionario.indexOf(x[i]));

      seed = seed * 17 + diccionario.indexOf(x[i]);
    }
    console.log(seed, "pedro");

    return seed;
  }

  const onChangeHandle = async (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setStateObject({
      ...stateObj,
      [e.target.name]: e.target.value,
    });
  };

  //  const onChangeHandleTextArea = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //    setStateObject({
  //      ...stateObj,
  //      [e.target.name]: e.target.value,
  //    });
  //  };
  console.log(stateObj);

  const subirPortada = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files, "JALA PA");

    const files = e.target.files;
    let file = { File: {}, name: "", size: 0, type: "" };

    for (let i = 0; i < 1; i++) {
      if (files != null) file = files[i];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result as string,
          // file: file,
        };
        console.log(fileInfo);

        setStateObject({
          ...stateObj,
          nombreportada: fileInfo.name,
          portada: fileInfo.base64,
        });
      };
    }
  };

  if (isSuccess) {
    return (
      <KPage title="Manuales">
        <Box max-height="100%" width="100%">
          <Box textAlign="end">
            <Button
              colorScheme="blue"
              variant="solid"
              marginLeft={2}
              leftIcon={<PlusSquareIcon />}
              onClick={onOpen}
              // onClick={() => hash("perseverar")}
            >
              Agregar manual
            </Button>
          </Box>
          <Divider mt={10} />

          <SimpleGrid columns={2} gap={2} mt={10}>
            <Box w="100%" h="10">
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">The perfect latte</Heading>

                    <Text py="2">
                      Caffè latte is a coffee beverage of Italian origin made
                      with espresso and steamed milk.
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      Buy Latte
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </Box>
          </SimpleGrid>

          {/* // MODAL */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Nombre"
                  value={stateObj.nombre}
                  onChange={onChangeHandle}
                  name="nombre"
                />
                <Textarea
                  placeholder="Descripción"
                  mt={10}
                  value={stateObj.descripcion}
                  onChange={onChangeHandle}
                  name="descripcion"
                />
                <Stack mt="7" spacing="5" textAlign="center">
                  {/* <Button
                    colorScheme="blue"
                    onClick={subirPortada}
                    placeholder="nanda"
                    textAlign="center"
                    leftIcon={<FiUpload />}
                  >
                    Subir portada
                  </Button> */}
                  <Button>
                    <Input
                      type="file"
                      height="100%"
                      width="100%"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*"
                      colorScheme="blue"
                      onChange={subirPortada}
                      multiple
                    />
                    Subir archivo
                  </Button>
                  {/* <Button
                    colorScheme="blue"
                    textAlign="center"
                    leftIcon={<FiUpload />}
                  >
                    <Input
                      type="file"
                      height="100%"
                      width="100%"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept=".xml, .csv"
                      onChange={handleFileSelect}
                    />
                    Subir archivo
                  </Button> */}
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="gray"
                  mr={3}
                  onClick={onClose}
                  variant={"outline"}
                >
                  Cerrar
                </Button>
                <Button variant="outline" colorScheme={"teal"}>
                  Guardar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </KPage>
    );
  }
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
