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
import { areasInterface } from "../usuarios/new";

export interface modulosTable {
  nb_modulo: string;
  id_modulo: string;
  nu_orden: number;
  acciones: string;
}

export default function Area(): any {
  const colSpan = { base: 2, md: 1 };
  const router = useRouter();
  const [nombreArea, setNombreArea] = useState("");
  const [updating, setUpdating] = useState(false);

  const { isLoading, data: areas } = useQuery(
    "areas",
    async () => await ApiService.getAreas()
  );

  const updateArea = useMutation(
    async (formData: any) => {
      return await ApiService.updateAreas(formData);
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

  const area = areas?.filter(
    (area: { id_area: string | string[] | undefined }) =>
      area.id_area === router.query.id
  );
  // @ts-expect-error
  const areaDetails: areasInterface = area[0];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append("id", areaDetails.id_area);
    formData.append(
      "name",
      nombreArea === "" ? areaDetails.nb_area : nombreArea
    );

    updateArea.mutate(formData);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <KPage title={"Área " + areaDetails.nb_area}>
      <Box overflow="scroll" max-height="100%" width="100%">
        <Box>
          <Text fontSize="l" fontWeight="bold">
            Actualizar área
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
                    defaultValue={areaDetails.nb_area}
                    onChange={(event) => {
                      setNombreArea(event.currentTarget.value);
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
