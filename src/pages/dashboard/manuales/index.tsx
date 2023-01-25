import React, { useState } from "react";
import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import FileBase64 from "react-file-base64";
import {
  Box,
  Container,
  Divider,
  Icon,
  Input,
  Text,
  SimpleGrid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

// interface Props {
//   onRef?: Function;
//   onChange?: Function;
//   classes: {
//     body: string;
//     buttonPrimary: string;
//     eliminar: string;
//     formTitle: string;
//     header: string;
//     headerBreadCrumb: string;
//     headerTitle: string;
//     sectionHelper: string;
//     textField: string;
//     buttonPrimaryUpload: string;
//     buttonFile: string;
//     actionsButtons: string;
//   };

//   interface State {
//     rowsPerPage: number
//     page: number
//     items: []
//     id: string
//     name: string
//     descripcion: string
//     portada: string
//     openSave: boolean
//     isVisible: boolean
//     isEdit: boolean
//     modulos: []
//     sn_editado: boolean
//     file: any
//     nombrefile: string
//     manual: string
//     nombreportada: string
//     openConfirmar: boolean
//     nombreManual: string
//     portadaaux: string
//     nombreportadaaux: string
//     eliminando: string
// }

export default function Manuales(): any {
  const [stateObj, setStateObject] = useState<any>({
    rowsPerPage: 10,
    page: 0,
    items: [],
    id: "",
    name: "",
    openSave: false,
    isVisible: false,
    isEdit: false,
    modulos: [],
    sn_editado: false,
    file: null,
    nombrefile: "",
    manual: "",
    descripcion: "",
    portada: "",
    nombreportada: "",
    openConfirmar: false,
    nombreManual: "",
    portadaaux: "",
    nombreportadaaux: "",
    eliminando: "",
  });

  const {
    isLoading,
    data: tableros,
    isSuccess,
  } = useQuery("manuales", async () => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && stateObj.openSave) {
        closeAdd();
      }
    });

    Get();
  });

  const Get = () => {
    ApiService.getManuales().then(
      (item: { data: { status: number; data: [] } }) => {
        if (item.data.status === 200) {
          setStateObject({
            ...stateObj,
            items: item.data.data,
          });
          return;
        }
      }
    );
  };

  const closeAdd = () => {
    setStateObject({
      ...stateObj,
      name: "",
      isEdit: false,
      id: "",
      descripcion: "",
      portada: "",
      file: null,
      nombreportada: "",
      portadaaux: "",
      nombreportadaaux: "",
    }),
      () => {
        openAdd();
      };
  };

  const openAdd = () => {
    setStateObject({
      ...stateObj,
      openSave: stateObj.openSave,
    });
  };

  if (isLoading) {
    return <KSkeletonPage />;
  }

  console.log(stateObj, "ESTADO");

  if (isSuccess) {
    return (
      <KPage title="manuales">
        <Box textAlign="end">
          <Button
            colorScheme="blue"
            variant="solid"
            marginLeft={2}
            leftIcon={<PlusSquareIcon />}
          >
            Agregar manual
          </Button>
        </Box>
      </KPage>
    );
  }
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
