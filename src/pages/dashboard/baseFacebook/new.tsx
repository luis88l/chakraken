import { getSession } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { useRouter } from "next/router";
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
  const colSpan = { base: 2, md: 2 };
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [nombreBase, setNombreBase] = useState("");
  const [nombrePixel, setNombrePixel] = useState("");

  const crearBase = useMutation(
    async (formData: any) => {
      return await ApiService.saveBases(formData);
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
    formData.append("name", nombreBase);
    formData.append("nu_Pixel", nombrePixel);
    crearBase.mutate(formData);
  };

  console.log();

  return (
    <Box w={"100%"}>
      <KPage title={"Crear Base"}>
        <Box>
          <Box textAlign={"right"} color="red" mr={"-158%"}>
            <Link href={"/dashboard/baseFacebook/"}>
              <CloseIcon
                fontSize={"2xl"}
                borderRadius="4px"
                cursor={"pointer"}
              />
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
                      <FormLabel>Base</FormLabel>
                      <Input
                        onChange={(event) => {
                          setNombreBase(event.currentTarget.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={colSpan} mt={3}>
                    <FormControl isRequired>
                      <FormLabel>Pixel</FormLabel>
                      <Input
                        onChange={(event) => {
                          setNombrePixel(event.currentTarget.value);
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
                    Crear Base
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
