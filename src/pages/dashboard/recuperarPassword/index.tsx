import { getSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import KPage from "../../../components/page/KPage";
import {
  Box,
  Stack,
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Divider,
  CardFooter,
  Input,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";

import ApiService from "../../../../data/services/ApiService";

interface UploaderProps {
  fileType?: string | AcceptedFileType[];
}

enum AcceptedFileType {
  Text = ".txt",
  Gif = ".gif",
  Jpeg = ".jpg",
  Png = ".png",
  Doc = ".doc",
  Pdf = ".pdf",
  AllImages = "image/*",
  AllVideos = "video/*",
  AllAudios = "audio/*",
}

interface IFile {
  file: File;
  uploadProgress: number;
  uploadError: string;
}

export default function RecuperarPassword(props: UploaderProps): any {
  const { fileType } = props;
  const acceptedFormats: string | AcceptedFileType[] | undefined =
    typeof fileType === "string"
      ? fileType
      : Array.isArray(fileType)
      ? fileType?.join(",")
      : Object.values(AcceptedFileType);
  const [selectedFiles, setSelectedFiles] = useState<
    IFile[] | undefined | null
  >([]);

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

  console.log(selectedFiles);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateObj, setStateObject] = useState({
    rowsPerPage: 0,
    page: 0,
    pendings: 0,
    pendingOther: 0,
    sent: 0,
    gmail: 0,
    outlook: 0,
    hotmail: 0,
    other: 0,
    pendingGmail: 0,
    pendingOutlook: 0,
    pendingHotmail: 0,
    openSave: false,
    isVisible: false,
    isEdit: false,
    file: "",
    sincronizarActivo: false,
  });

  // const [items, setItems] = useState([]);
  // const [file, setFile] = useState("");
  useEffect(() => {
    Get();
    GetProceso();
  }, []);

  const [fileSelected, setFileSelected] = React.useState<File>(); // also tried <string | Blob>

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
  };

  const uploadFile = function (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    console.log(fileSelected);

    if (fileSelected) {
      const formData = new FormData();
      formData.append("image", fileSelected, fileSelected.name);
    }
  };

  const Get = () => {
    ApiService.getCorreoRecuperarPassword().then((item: any) => {
      if (item.data.status === 200) {
        console.log(item.data);

        let data = item.data.data;
        let obj = {
          rowsPerPage: 0,
          page: 0,
          pendings: data.pendings[0].countItem,
          pendingOther: 0,
          sent: data.sent[0].countItem,
          gmail: data.gmail[0].countItem,
          outlook: data.outlook[0].countItem,
          hotmail: data.hotmail[0].countItem,
          other:
            Number(data.sent[0].countItem) -
            (Number(data.hotmail[0].countItem) +
              Number(data.outlook[0].countItem) +
              Number(data.gmail[0].countItem)),
          pendingGmail: 0,
          pendingOutlook: 0,
          pendingHotmail: 0,
          openSave: false,
          isVisible: false,
          isEdit: false,
          file: "",
          sincronizarActivo: false,
        };

        setStateObject(obj);

        return;
      }
    });
  };

  const GetProceso = () => {
    const form = new FormData();
    form.append("proceso", "recuperarPasswordSincronizar");
    ApiService.getProceso(form).then((item: any) => {
      if (item.data.status === 200) {
        let data = item.data.data;
        // this.setState({
        //     sincronizarActivo: data.activo,
        // })
        console.log(data);
        return;
      }
    });
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

  return (
    <KPage title="Recuperar contraseña">
      <Box max-height="100%" width="100%">
        <Grid templateColumns="repeat(1, 1fr)" gap={1}>
          <GridItem w="100%" h="10">
            <Stack spacing={4} direction="row" justifyContent="end">
              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                onClick={onOpen}
              >
                Subir Archivo
              </Button>
              <Button leftIcon={<RepeatIcon />} colorScheme="blue">
                Sincronizar
              </Button>
            </Stack>
          </GridItem>
        </Grid>
        <Divider marginBottom={10} p={4}></Divider>
        <Heading as="h5" size="sm" marginBottom={10}>
          Pendientes{" "}
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Correos pendientes
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.pendings}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Gmail
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.outlook}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Outlook
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.pendingOutlook}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Hotmail
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.pendingHotmail}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Otros
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.pendingOther}</Text>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Heading as="h5" size="sm" marginBottom={10}>
          Enviados{" "}
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Correos enviados
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.sent}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Gmail
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.gmail}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Outlook
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.outlook}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Hotmail
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.hotmail}</Text>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem w="100%" h="200">
            <Card maxW="sm" variant={"filled"}>
              <CardBody>
                <Stack mt="4" spacing="3" textAlign="center">
                  <Heading size="sm" textAlign="center">
                    Otros
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent="center">
                <Text textAlign="center">{stateObj.other}</Text>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </Box>

      {/* // MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>into</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>EJEMPLO@COPPEL.COM</Td>
                  </Tr>
                  <Tr>
                    <Td>EKRAKEN@GMAIL.COM</Td>
                  </Tr>
                  <Tr>
                    <Td>WEBDEV@HOTMAIL.COM</Td>
                  </Tr>
                  <Tr>
                    <Td>CLIENTEDIGITAL@OUTLOOK.COM</Td>
                  </Tr>
                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              variant={"outline"}
            >
              Close
            </Button>
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
                accept=".xml, .csv"
                onChange={handleFileSelect}
              />
              Subir archivo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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