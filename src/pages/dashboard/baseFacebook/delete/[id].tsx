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

export interface BasesTable {
  id_Base: string;
  nb_Base: string;
  nu_Pixel: string;
  sn_activo: boolean;
  acciones: string;
}

interface BaseFacebookProps {
  id_Base: string;
  nb_Base: string;
  nu_Pixel: string;
}

export default function Bases(): any {
  const colSpan = { base: 2, md: 2 };
  const router = useRouter();
  const [nombreBase, setNombreBase] = useState("");
  const [numeroPixel, setNombrePixel] = useState("");
  const [activo, setActivo] = useState(false);
  const [updating, setUpdating] = useState(false);

  const {
    isLoading,
    data: basesFaceBook,
    isSuccess,
  } = useQuery("Bases", async () => await ApiService.getBases());

  const updateBase = useMutation(
    async (formData: any) => {
      return await ApiService.basesDelete(formData);
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

  const bases = basesFaceBook?.filter(
    (bases: { id_Base: string | string[] | undefined }) =>
      bases.id_Base === router.query.id
  );

  const basesDetails: BaseFacebookProps = bases[0];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActivo(true);
    const formData = new FormData();
    formData.append("id", basesDetails.id_Base);
    updateBase.mutate(formData);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <KPage title={"Base: " + basesDetails.nb_Base}>
      <Box textAlign={"right"} color="red">
        <Link href={"/dashboard/baseFacebook/"}>
          <CloseIcon fontSize={"2xl"} borderRadius="4px" cursor={"pointer"} />
        </Link>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color={"#E02020"}>
          ¿Estas seguro de que deseas eliminar la Base?
          <WarningIcon alignItems={"center"} ml="3" />
        </Text>
      </Box>
      <Divider mt={5} mb={3} />
      <Box>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={2} spacing={5}>
            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>Base</FormLabel>
                <Input
                  value={basesDetails.nb_Base}
                  onChange={(event) => {
                    setNombreBase(event.currentTarget.value);
                  }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl isRequired>
                <FormLabel>Pixel</FormLabel>
                <Input
                  value={basesDetails.nu_Pixel}
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
