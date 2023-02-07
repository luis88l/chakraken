import { useState } from "react";
import { getSession } from "next-auth/react";
import KPage from "../../../../components/page/KPage";
import ApiService from "../../../../../data/services/ApiService";
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
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";

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
  const [nombreLanding, setNombreLanding] = useState("");
  const [nombreDescripcion, setNombreDescripcion] = useState("");
  const [URL, setURL] = useState("");
  const [Keywords, setKeywords] = useState("");
  const [activo, setActivo] = useState(false);

  const { isLoading, data: smartLinks } = useQuery(
    "Smart",
    async () => await ApiService.getSmartLink()
  );

  const deleteSmartLink = useMutation(
    async (formData: any) => {
      return await ApiService.deleteSmartLinks(formData);
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
    setActivo(true);
    const formData = new FormData();
    formData.append("id_page", smartDetails.id_page);
    const id = smartDetails.id_page;
    deleteSmartLink.mutate(id);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <KPage title={"Smart Link: " + smartDetails.nb_nombre}>
      <Box textAlign={"right"} color="red">
        <Link href={"/dashboard/baseFacebook/"}>
          <CloseIcon fontSize={"2xl"} borderRadius="4px" cursor={"pointer"} />
        </Link>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color={"#E02020"}>
          ¿Estas seguro de que deseas eliminar el Formulario?
          <WarningIcon alignItems={"center"} ml="3" />
        </Text>
      </Box>
      <Divider mt={5} mb={3} />
      <Box>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={2} spacing={5}>
            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  value={smartDetails.nb_nombre}
                  onChange={(event) => {
                    setNombreLanding(event.currentTarget.value);
                  }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>Descripcion</FormLabel>
                <Input
                  value={smartDetails.nb_description}
                  onChange={(event) => {
                    setNombreDescripcion(event.currentTarget.value);
                  }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>URL</FormLabel>
                <Input
                  value={smartDetails.nb_url}
                  onChange={(event) => {
                    setURL(event.currentTarget.value);
                  }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>Keywords</FormLabel>
                <Input
                  value={smartDetails.nb_keyWords}
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
                bg="#E02020"
                borderRadius={15}
                color="#fff"
                rightIcon={
                  activo ? (
                    <CircularProgress
                      isIndeterminate
                      color="white"
                      size={"20px"}
                    />
                  ) : undefined
                }
              >
                Eliminar
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
