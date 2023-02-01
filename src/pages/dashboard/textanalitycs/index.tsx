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
  useToast,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

export interface areasTable {
  de_rol: string;
  id_rol: string;
}

export default function ShortUrl(): any {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [url, setUrl] = useState("");
  const [urlcorta, setUrlcorta] = useState("");
  const [items, setItems] = useState([]);
  const [id, setIds] = useState("");
  const [name, setName] = useState("");
  const [openSave, setOpenSave] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modulos, setModulos] = useState([]);
  const [sn_editado, setSn_editado] = useState(false);
  const [texto, setTexto] = useState("");
  const [frasesclave, setFrasesclave] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [textoinvalido, setTextoinvalido] = useState(false);
  const [cargando, setCargando] = useState(false);

  const analizar = () => {
    if (texto === "") {
      setTextoinvalido(true);
      return;
    } else {
      setCargando(true);
    }
    const form = new FormData();
    form.append("texto", texto);

    ApiService.analizarTexto(form).then((item: any) => {
      console.log(item);
      if (item.data.status === 200) {
        setFrasesclave(item.data.fclaves);
        setSentiment(item.data.sentiment);
        setCargando(false);
        return;
      }
    });
  };

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== "") {
        // this.setState({
        //   textoinvalido: false,
        // });
        setTextoinvalido(false);
      } else {
        // this.setState({
        //   textoinvalido: true,
        // });
        setTextoinvalido(true);
      }

      //   this.setState<never>({
      //     [name]: event.target.value,
      //   });

      setName(event.target.value);
    };

  return (
    <KPage title="Analizar texto">
      <Box max-height="100%" width="100%" align={"center"}>
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
                  onChange={() => handleChange("texto")}
                ></Textarea>
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter justifyContent={"center"}>
            <Button mt={5} onClick={analizar}>
              Analizar
            </Button>
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
