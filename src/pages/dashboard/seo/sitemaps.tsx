import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { useMutation } from "react-query";

export default function Sitemaps(): any {
  const getSitemap = useMutation(
    async (formData: any) => {
      return await ApiService.downloadSitemap(formData);
    },
    {
      onSuccess: (formData: any) => {
        const filenameString: string = formData.data.filename.toString();
        const downloadString = "http://apikraken/xml/" + filenameString;
        void downloadURI(downloadString, filenameString, "xml");
      },
    }
  );

  const handleClick = async (event: any, cat: string): Promise<any> => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("cat", cat);
    getSitemap.mutate(formData);
  };

  const downloadURI = async (
    uri: string,
    name: string,
    fileType: string
  ): Promise<any> => {
    void fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/" + fileType,
      },
    })
      .then(async (response) => await response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);

        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  return (
    <KPage title="Seo Sitemaps">
      <Box overflow="scroll" max-height="100%" width="100%">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Categoría</Th>
                <Th>Descargar</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Bicicletas/bebes/automotriz</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(
                            event,
                            "Bicicletas/bebes/automotriz"
                          )
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Perf/cosm</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Perf/cosm")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Blancos</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Blancos")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Hombres</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Hombres")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Celulares</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Celulares")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Cocina y Electrodomésticos</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Cocina y Electrodomésticos")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Consolas y Videojuegos</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Consolas y Videojuegos")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Damas </Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Damas")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Deportes </Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Deportes")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Domesticos </Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Domesticos")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Electrónica </Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Electronica")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Ferretería y Mejoras del Hogar </Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(
                            event,
                            "Ferretería y Mejoras del Hogar"
                          )
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Hogar y Muebles</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Hogar y Muebles")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Instrumentos Musicales</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Instrumentos Musicales")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Relojes Lentes y Joyería</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Relojes Lentes y Joyería")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Juguetes</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Juguetes")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Libros Revistas y Cómics</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Libros Revistas y Cómics")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Línea Blanca</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Línea Blanca")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Maletas Bolsas y Mochilas</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Maletas Bolsas y Mochilas")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Mascotas</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Mascotas")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Motos y movilidad</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Motos y movilidad")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Mujeres</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Mujeres")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Hogar y Muebles</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Hogar y Muebles")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Niños y Adolescentes</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Niños y Adolescentes")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Optica</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Optica")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Salas, Recamaras, Comedores</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(
                            event,
                            "Salas, Recamaras, Comedores"
                          )
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>Zapateria</Td>
                <Td>
                  <ButtonGroup gap="2">
                    <Box m={2} cursor="pointer">
                      <DownloadIcon
                        onClick={async (event) =>
                          await handleClick(event, "Zapateria")
                        }
                      />
                    </Box>
                  </ButtonGroup>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
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
