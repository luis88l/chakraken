import { useState } from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function New(): any {
  const colSpan = { base: 2, md: 1 };
  const router = useRouter();
  const [nombreModulo, setNombreModulo] = useState("");
  const [claseModulo, setClaseModulo] = useState("");
  const [descripcionModulo, setDescripcionModulo] = useState("");
  const [updating, setUpdating] = useState(false);

  const crearModulo = useMutation(
    async (formData: any) => {
      return await ApiService.saveModulos(formData);
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
    formData.append("nb_modulo", nombreModulo);
    formData.append("de_clase", claseModulo);
    formData.append("de_modulo", descripcionModulo);
    crearModulo.mutate(formData);
  };

  return (
    <KPage title="Crear módulo">
      <Box>
        <Text fontSize="l" fontWeight="bold">
          Actualizar módulo
        </Text>
      </Box>
      <Divider mt={2} mb={2} />
      <Box>
        <form onSubmit={() => handleSubmit}>
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
