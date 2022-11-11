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
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface modulosTable {
  nb_modulo: string;
  id_modulo: string;
  nu_orden: number;
  acciones: string;
}

interface moduloProps {
  id_modulo: string;
  nb_modulo: string;
  de_clase: string;
  de_modulo: string;
}

export default function Role(): any {
  const colSpan = { base: 2, md: 1 };
  const router = useRouter();
  const [nombreModulo, setNombreModulo] = useState("");
  const [updating, setUpdating] = useState(false);

  const { isLoading, data: modules } = useQuery(
    "modulos",
    async () => await ApiService.getModulos()
  );

  const updateModulo = useMutation(
    async (formData: any) => {
      return await ApiService.updateModulos(formData);
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

  const modulo = modules?.filter(
    (modulo: { id_modulo: string | string[] | undefined }) =>
      modulo.id_modulo === router.query.id
  );
  // @ts-expect-error
  const moduloDetails: moduloProps = modulo[0];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append("id_modulo", moduloDetails.id_modulo);
    formData.append(
      "nb_modulo",
      nombreModulo === "" ? moduloDetails.nb_modulo : nombreModulo
    );
    updateModulo.mutate(formData);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <KPage title={"Rol " + moduloDetails.nb_modulo}>
      <Box>
        <Text fontSize="l" fontWeight="bold">
          Actualizar rol
        </Text>
      </Box>
      <Divider mt={2} mb={2} />
      <Box>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={2} spacing={5}>
            <GridItem colSpan={colSpan}>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  defaultValue={moduloDetails.nb_modulo}
                  onChange={(event) => {
                    setNombreModulo(event.currentTarget.value);
                  }}
                />
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
                Actualizar
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
