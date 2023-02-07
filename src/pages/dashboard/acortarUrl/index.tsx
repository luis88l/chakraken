import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Input,
  CardFooter,
  GridItem,
  // useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

export interface areasTable {
  de_rol: string;
  id_rol: string;
}

export default function ShortUrl(): any {
  // const toast = useToast();
  // const toastIdRef = React.useRef();
  const [url, setUrl] = useState("");
  const [urlcorta, setUrlcorta] = useState("");
  // const [cargando, setCargador] = useState(false);
  // const [error, setError] = useState(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const acortarUrl = (): any => {
    if (url === "") {
      return;
    }

    const form = new FormData();
    form.append("url", url);

    return ApiService.acortarUrl(form).then((item: any) => {
      if (item.data.status === 200) {
        if (item.data.url === "Error") {
          return;
        }

        setUrlcorta(item.data.url);
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const copiar = (): any => {
    // navigator.clipboard.writeText(this.state.urlcorta)
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = urlcorta;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    // const status = document.execCommand("copy");
    document.body.removeChild(selBox);

    // if (status) {
    //   toastIdRef.current = toast({ description: "Url copiada con exito" });
    // } else {
    //   toastIdRef.current = toast({
    //     description: " Error al guardar url",
    //     status: "error",
    //   });
    // }
  };

  return (
    <KPage title="Short URL">
      <Box max-height="100%" width="100%">
        <Card align="center">
          <CardHeader>
            <Heading size="md"> Acortar url</Heading>
          </CardHeader>
          <CardBody textAlign={"center"}>
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              <GridItem w="100%" h="10">
                <Input
                  placeholder="Ingresa una url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </GridItem>
              <GridItem w="100%" h="10">
                <Button colorScheme="blue" onClick={acortarUrl}>
                  Acortar
                </Button>
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter>
            <Box mt={2} marginRight={5}>
              {urlcorta}
            </Box>
            <Box>
              {urlcorta !== "" ? (
                <CopyIcon boxSize={6} onClick={copiar} cursor="pointer" />
              ) : null}
            </Box>
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
