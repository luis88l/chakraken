import { getSession } from "next-auth/react";
import { useState } from "react";
import KPage from "../../../components/page/KPage";
import { useMutation } from "react-query";
import {
  Box,
  Button,
  CircularProgress,
  useToast,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Textarea,
  Text,
} from "@chakra-ui/react";
import ApiService from "../../../../data/services/ApiService";

export default function Carruseles(): any {
  const toast = useToast();
  const [updating, setUpdating] = useState(false);
  const [tituloCarrusel, setTituloCarrusel] = useState("");
  const [listadoSkus, setListadoSkus] = useState("");
  const [carruseles, setCarruseles] = useState("");
  const [errores, setErrores] = useState([]);

  const crearCarrusel = useMutation(
    async (formData: any) => {
      return await ApiService.crearCarrusel(formData);
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Carrusel creado exitosamente",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        console.log(res);
        if (res.data.error.length > 0) setErrores(res.data.error);
        else if (res.data.error.length === 0 && errores.length > 0) {
          setErrores([]);
        }
        setCarruseles(JSON.stringify(res.data.carrusel, null, 4));
        setUpdating(false);
      },
    }
  );

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();
    setUpdating(true);
    console.log(typeof listadoSkus);
    const formData = new FormData();
    formData.append("tituloCarrusel", tituloCarrusel);
    formData.append("listadoSkus", listadoSkus);
    crearCarrusel.mutate(formData);
  };

  return (
    <KPage title="Creador de carruseles">
      <Box>
        <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={5}>
          <GridItem
            colSpan={1}
            display="flex"
            justifyContent={"center"}
            flexDirection="column"
            alignSelf="baseline"
          >
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Ingrese el titulo</FormLabel>
                <Input
                  marginBottom="10px"
                  onChange={(event) => {
                    setTituloCarrusel(event.currentTarget.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Ingrese un listado de SKUs</FormLabel>
                <Textarea
                  height={300}
                  onChange={(event) => {
                    setListadoSkus(event.currentTarget.value);
                  }}
                />
              </FormControl>
              <Box display={"flex"} justifyContent="center">
                <Button
                  disabled={updating}
                  variant="primary"
                  size="lg"
                  type="submit"
                  bg="#3a47bd"
                  borderRadius={15}
                  marginTop={5}
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
                  Crear carrusel
                </Button>
              </Box>
            </form>
            {carruseles !== "" && !updating && (
              <Button
                variant="primary"
                size="lg"
                bg="#239bbf"
                borderRadius={15}
                marginTop={5}
                color="#fff"
                width={40}
                alignSelf="center"
                onClick={() => {
                  navigator.clipboard.writeText(carruseles);
                  toast({
                    title: "Carrusel copiado exitosamente",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                }}
              >
                Copiar carrusel
              </Button>
            )}
            {errores.length > 0 && (
              <Box
                bg="red.200"
                marginTop="15px"
                borderRadius="5px"
                padding="5px"
              >
                No se encontraron los siguientes sku: <br />
                {errores.toString()}
              </Box>
            )}
          </GridItem>
          <GridItem colSpan={{ sm: 1, md: 3 }}>
            <Text
              bg="#ebebeb"
              minHeight={400}
              maxHeight={600}
              border="1px solid"
              borderColor="inherit"
              borderRadius={5}
              padding="10px"
              overflow="auto"
            >
              <pre> {carruseles} </pre>
            </Text>
          </GridItem>
        </SimpleGrid>
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
