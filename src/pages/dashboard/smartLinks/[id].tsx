import { useState } from "react";
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
  Link,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CloseIcon } from "@chakra-ui/icons";

export interface SmartTable {
  id_page: string;
  nb_nombre: string;
  nb_url: string;
  nb_description: string;
  nb_keyWords: string;
  acciones: string;
  sn_activo: boolean;
}

interface SmartTableProps {
  id_page: string;
  nb_nombre: string;
  nb_url: string;
  nb_description: string;
  nb_keyWords: string;
}

export default function Bases(): any {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [nombreLanding, setNombreLanding] = useState("");
  const [nombreDescripcion, setNombreDescripcion] = useState("");
  const [URL, setURL] = useState("");
  const [Keywords, setKeywords] = useState("");

  const { isLoading, data: smartLinks } = useQuery(
    "Smart",
    async () => await ApiService.getSmartLink()
  );

  const updateSmartLink = useMutation(
    async (formData: any) => {
      return await ApiService.updateSmartLinks(formData);
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  const smart = smartLinks?.filter(
    (smart: { id_page: string | string[] | undefined }) =>
      smart.id_page === router.query.id
  );

  const smartDetails: SmartTableProps = smart[0];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append("id_page", smartDetails.id_page);
    formData.append(
      "nb_nombre",
      nombreLanding === "" ? smartDetails.nb_nombre : nombreLanding
    );
    formData.append("nb_url", URL === "" ? smartDetails.nb_url : URL);
    formData.append(
      "nb_description",
      nombreDescripcion === "" ? smartDetails.nb_description : nombreDescripcion
    );
    formData.append(
      "nb_keyWords",
      Keywords === "" ? smartDetails.nb_keyWords : Keywords
    );
    updateSmartLink.mutate(formData);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <Box w={"100%"}>
      <KPage title={"Smart Link " + smartDetails.nb_nombre}>
        <Box>
          <Box textAlign={"right"} color="red" mr={"-330%"}>
            <Link href={"/dashboard/smartLinks/"}>
              <CloseIcon
                fontSize={"2xl"}
                borderRadius="4px"
                cursor={"pointer"}
              />
            </Link>
          </Box>
          <Text fontSize="l" fontWeight="bold">
            Actualizar datos del formulario
          </Text>
          <Divider mt={5} mb={3} />
          <Box>
            <form onSubmit={handleSubmit}>
              <SimpleGrid columns={2} spacing={5}>
                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      defaultValue={smartDetails.nb_nombre}
                      onChange={(event) => {
                        setNombreLanding(event.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Descripcion</FormLabel>
                    <Textarea
                      defaultValue={smartDetails.nb_description}
                      onChange={(event) => {
                        setNombreDescripcion(event.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>URL</FormLabel>
                    <Input
                      defaultValue={smartDetails.nb_url}
                      onChange={(event) => {
                        setURL(event.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Keywords</FormLabel>
                    <Input
                      defaultValue={smartDetails.nb_keyWords}
                      onChange={(event) => {
                        setKeywords(event.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}></GridItem>
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
