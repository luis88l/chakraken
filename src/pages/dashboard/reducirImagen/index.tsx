import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import Compressor from "compressorjs";

import {
  Box,
  Button,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Input,
  CardFooter,
  SimpleGrid,
  UnorderedList,
  ListItem,
  Image,
} from "@chakra-ui/react";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";

export interface areasTable {
  de_rol: string;
  id_rol: string;
}

export default function ShortUrl(): any {
  const [imagenAReducir, setImagenReducir] = useState("");
  const [imagenInfoAReducir, setImagenInfoReducir] = useState({
    name: "",
    type: "",
    size: 0,
  });
  const [infoImagenReducida, setInfoImagenReducida] = useState({
    name: "",
    type: "",
    size: 0,
  });
  const [imagenReducida, seImagenReducida] = useState("");
  const {
    isLoading,
    data: roles,
    isSuccess,
  } = useQuery("roles", async () => await ApiService.getRoles());

  if (isLoading) {
    return <KSkeletonPage />;
  }

  const subirImagen = (imagen: any) => {
    const reader = new FileReader();

    reader.onload = function () {
      if (reader.readyState === 2 || reader.readyState === 0) {
        setImagenReducir(reader.result);
      }
    };

    // reader.readAsDataURL(imagen.target.files[0]);

    new Compressor(imagen.target.files[0], {
      quality: 0.6,
      success: (result: any) => {
        const readers = new FileReader();

        readers.onload = function () {
          if (reader.readyState === 2 || reader.readyState === 0) {
            seImagenReducida(readers.result);
            setInfoImagenReducida(result);
            //   seImagen(result);
          }
        };

        readers.readAsDataURL(result);
      },
      error(err: any) {
        console.log(err.message);
      },
    });
    setImagenInfoReducir(imagen.target.files[0]);
    // var urlCreator = window.URL || window.webkitURL
    // var imageUrl = urlCreator.createObjectURL(i.result)
  };

  console.log(imagenAReducir);

  const descargarImagen = () => {
    const byteCharacters = atob(imagenReducida.replace(/^[^,]+,/, ""));

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], {
      type: infoImagenReducida.type,
    });
    let newVariable: any;

    newVariable = window.navigator;

    if (newVariable.msSaveBlob) {
      const filename = infoImagenReducida.name;
      newVariable.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.setAttribute("visibility", "hidden");
      link.download = infoImagenReducida.name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isSuccess) {
    return (
      <KPage title="Reducir img">
        <Box max-height="100%" width="100%">
          <Card align="center">
            <CardHeader>
              <Heading size="md"> Reducir tamaño de imagenes</Heading>
            </CardHeader>
            <CardBody>
              <Button leftIcon={<FiUpload />} colorScheme="blue">
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
                  onChange={subirImagen}
                  multiple
                />
                Subir archivo
              </Button>
            </CardBody>
            <CardFooter>
              <SimpleGrid columns={2} gap={2} mt={10}>
                <Card align="center">
                  <CardHeader>
                    <Heading size="sm"> Imagen Original</Heading>
                  </CardHeader>
                  <CardBody>
                    <Box mb={5}>
                      {imagenReducida != "" ? (
                        <img src={imagenReducida} alt="" className="mw-100" />
                      ) : null}
                    </Box>
                    <UnorderedList>
                      {imagenInfoAReducir != null ? (
                        <>
                          <ListItem>
                            <strong>Nombre: </strong> &nbsp;
                            {imagenInfoAReducir.name}
                          </ListItem>
                          <ListItem>
                            <strong>Tipo: </strong> &nbsp;
                            {imagenInfoAReducir.type}
                          </ListItem>
                          <ListItem>
                            <strong>Tamaño: </strong> &nbsp;
                            {imagenInfoAReducir.size > 1048576
                              ? Math.round(
                                  (imagenInfoAReducir.size / 1048576 +
                                    Number.EPSILON) *
                                    100
                                ) /
                                  100 +
                                " MB"
                              : Math.round(
                                  (imagenInfoAReducir.size / 1024 +
                                    Number.EPSILON) *
                                    100
                                ) /
                                  100 +
                                " KB"}
                          </ListItem>
                        </>
                      ) : null}
                    </UnorderedList>
                  </CardBody>
                </Card>
                <Card align="center">
                  <CardHeader>
                    <Heading size="sm"> Imagen Comprimida</Heading>
                  </CardHeader>
                  <CardBody>
                    <Box mb={5}>
                      {imagenReducida != "" ? (
                        <img src={imagenReducida} alt="" className="mw-100" />
                      ) : null}
                    </Box>

                    <UnorderedList>
                      {infoImagenReducida != null ? (
                        <>
                          <ListItem>
                            <strong>Nombre: </strong> &nbsp;
                            {infoImagenReducida.name}
                          </ListItem>
                          <ListItem>
                            <strong>Tipo: </strong> &nbsp;
                            {infoImagenReducida.type}
                          </ListItem>
                          <ListItem>
                            <strong>Tamaño: </strong> &nbsp;
                            {infoImagenReducida.size > 1048576
                              ? Math.round(
                                  (infoImagenReducida.size / 1048576 +
                                    Number.EPSILON) *
                                    100
                                ) /
                                  100 +
                                " MB"
                              : Math.round(
                                  (infoImagenReducida.size / 1024 +
                                    Number.EPSILON) *
                                    100
                                ) /
                                  100 +
                                " KB"}
                          </ListItem>
                        </>
                      ) : null}
                    </UnorderedList>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={descargarImagen}> Descargar</Button>
                  </CardFooter>
                </Card>
              </SimpleGrid>
            </CardFooter>
          </Card>
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
