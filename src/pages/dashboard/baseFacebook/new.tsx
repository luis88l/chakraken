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
import { getSession } from "next-auth/react";
import { useState } from "react";
import KPage from "../../../components/page/KPage";

export default function New(): any {
  const colSpan = { base: 2, md: 1 };
  const [updating, setUpdating] = useState(false);

  return (
    <KPage title={"Crear Base"}>
      <Box>
        <Text fontSize={"l"} fontWeight="bold">
          Registra los datos correctamente
        </Text>
      </Box>
      <Divider mt={2} mb={2}></Divider>
      <Box>
        <form>
          <SimpleGrid columns={2} spacing={5}>
            <GridItem colSpan={colSpan}>
              <FormControl isRequired>
                <FormLabel>Base</FormLabel>
                <Input></Input>
              </FormControl>
            </GridItem>

            <GridItem colSpan={colSpan}>
              <FormControl isRequired>
                <FormLabel>Pixel</FormLabel>
                <Input></Input>
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}></GridItem>
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
