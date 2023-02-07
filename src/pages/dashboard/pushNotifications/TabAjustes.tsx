/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSession } from "next-auth/react";
import React, { useState } from "react";
// import KPage from "../../../components/page/KPage";
import { Flex, Box } from "@chakra-ui/react";

export default function TabAjustes(): any {
  const [notification, setNotificatiion] = useState({
    titulo: "",
    topic: "",
    horas: "",
    url: "",
    mensaje: "",
    url_imagen: "",
    campa: "",
    fecha: "",
    tokenUsuario: "",
  });

  const onChangeHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificatiion({
      ...notification,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Flex>
        <Box w="100%">
          <h2>PENDIENTE</h2>
        </Box>
      </Flex>
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
