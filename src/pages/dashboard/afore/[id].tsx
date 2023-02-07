import { useState } from "react";
import { getSession } from "next-auth/react";

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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import ApiService from "../../../../data/services/ApiService";
import KPage from "../../../components/page/KPage";

export interface aforeTable {
  id: string;
  nombre_completo: string;
  correo: string;
  curp: string;
  telefono: string;
}

export default function Bases(): any {
  const router = useRouter();
  const [nombreBase, setNombreBase] = useState("");
  const [numeroPixel, setNombrePixel] = useState("");
  const [activo, setActivo] = useState(false);

  const { isLoading, data: aforeModulo } = useQuery(
    "Afore",
    async () => await ApiService.aforeGet(true)
  );

  const updateAfore = useMutation(
    async (formData: any) => {
      return await ApiService.aforeDelete(formData);
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

  const aforeData = aforeModulo.data.data;

  const afore = aforeData?.filter(
    (afore: { id: string | string[] | undefined }) =>
      afore.id === router.query.id
  );

  const aforeDetails: aforeTable = afore[0];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActivo(true);
    const formData = new FormData();
    formData.append("id", aforeDetails.id);
    formData.append("nombre_completo", nombreBase);
    formData.append("pixel", numeroPixel);
    const Id = aforeDetails.id;
    updateAfore.mutate(Id);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <KPage title={"Afore: " + aforeDetails.nombre_completo}>
      <Box textAlign={"right"} color="red">
        <Link href={"/dashboard/afore/"}>
          <CloseIcon fontSize={"2xl"} borderRadius="4px" cursor={"pointer"} />
        </Link>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color={"#E02020"}>
          ¿Estas seguro de que deseas eliminar el registro?
          <WarningIcon alignItems={"center"} ml="3" />
        </Text>
      </Box>
      <Divider mt={5} mb={3} />
      <Box>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={2} spacing={5}>
            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>Nombre(s)</FormLabel>
                <Input
                  value={aforeDetails.nombre_completo}
                  onChange={(event) => {
                    setNombreBase(event.currentTarget.value);
                  }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>ID</FormLabel>
                <Input
                  value={aforeDetails.id}
                  onChange={(event) => {
                    setNombrePixel(event.currentTarget.value);
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
