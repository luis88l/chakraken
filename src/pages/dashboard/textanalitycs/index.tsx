import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";

import {
  Box,
  Button,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  GridItem,
  Textarea,
} from "@chakra-ui/react";

export interface areasTable {
  de_rol: string;
  id_rol: string;
}

export default function ShortUrl(): any {
  // const analizar = ():any => {
  //   if (texto === "") {
  //     setTextoinvalido(true);
  //     return;
  //   } else {
  //     setCargando(true);
  //   }:
  //   const form = new FormData();
  //   form.append("texto", texto);

  //   ApiService.analizarTexto(form).then((item: any) => {
  //     console.log(item);
  //     if (item.data.status === 200) {
  //       setFrasesclave(item.data.fclaves);
  //       setSentiment(item.data.sentiment);
  //       setCargando(false);
  //     }
  //   });
  // };

  return (
    <KPage title="Analizar texto">
      <Box max-height="100%" width="100%">
        <Card maxW="lg" alignContent={"center"}>
          <CardHeader textAlign="center">
            <Heading size="md"> Ingresa un texto</Heading>
          </CardHeader>
          <CardBody textAlign={"center"}>
            <Grid templateColumns="repeat(1, 1fr)" gap={2}>
              <GridItem w="100%" h="10">
                <Textarea
                  placeholder=""
                  size="md"
                  //   value={}
                ></Textarea>
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter justifyContent={"center"}>
            <Button mt={5}>Analizar</Button>
          </CardFooter>
        </Card>
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
