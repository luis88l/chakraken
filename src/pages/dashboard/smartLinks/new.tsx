import { getSession } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import router, { useRouter } from "next/router";
import KPage from "../../../components/page/KPage";
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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function New(): any {
  const [updating, setUpdating] = useState(false);
  const [nombreLanding, setNombreLanding] = useState("");
  const [nombreDescripcion, setNombreDescripcion] = useState("");
  const [URL, setURL] = useState("");
  const [Keywords, setKeywords] = useState("");
  const colSpan = { base: 2, md: 2 };

  const crearBase = useMutation(
    async (formData: any) => {
      return await ApiService.saveSmartLink(formData);
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append("nb_nombre", nombreLanding);
    formData.append("nb_description", nombreDescripcion);
    formData.append("nb_url", URL);
    formData.append("nb_keyWords", Keywords);
    crearBase.mutate(formData);
  };

  return (
    <KPage title={"Crear Formulario"}>
      <Box textAlign={"right"} color="red">
        <Link href={"/dashboard/smartLinks/"}>
          <CloseIcon fontSize={"2xl"} borderRadius="4px" cursor={"pointer"} />
        </Link>
      </Box>
      <Box>
        <Text fontSize={"l"} fontWeight="bold">
          Registra los datos correctamente
        </Text>
      </Box>
      <Divider mt={5} mb={2}></Divider>
      <Box>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={2} spacing={5}>
            <Box>
              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Nombre Landing</FormLabel>
                  <Input
                    onChange={(event) => {
                      setNombreLanding(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan} mt={3}>
                <FormControl isRequired>
                  <FormLabel>Descripcion</FormLabel>
                  <Input
                    onChange={(event) => {
                      setNombreDescripcion(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={colSpan} mt={3}>
                <FormControl isRequired>
                  <FormLabel>URL</FormLabel>
                  <Input
                    onChange={(event) => {
                      setURL(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={colSpan} mt={3}>
                <FormControl isRequired>
                  <FormLabel>Keywords</FormLabel>
                  <Input
                    onChange={(event) => {
                      setKeywords(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>
            </Box>

            <GridItem colSpan={2}></GridItem>
            <GridItem colSpan={1}>
              <Button
                type="submit"
                size={"lg"}
                bg="blue.400"
                variant="primary"
                borderRadius={15}
                color="white"
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
                Crear Formulario LUX
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
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
