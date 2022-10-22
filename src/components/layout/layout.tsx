import { Flex } from "@chakra-ui/react";
import Dashboard from "../dashboard/Dashboard";
import Head from "next/head";
import ApiService from "../../../data/services/ApiService";
import FormData from "form-data";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";

interface userInfoDataProps {
  cl_password: string;
  de_email: string;
  de_rol: string;
  de_tokenPush: string | null;
  fh_cumpleanios: string | null;
  fh_modificado: string;
  fh_registro: string;
  id_area: string | null;
  id_rol: string;
  id_usuario: string;
  nb_area: string;
  nb_nombre: string;
  nb_usuario: string;
  sn_activo: boolean;
  user_photo: string | null;
}

export default function Layout(props: { children: any }): any {
  const { data: session } = useSession();
  // @ts-expect-error
  const user: userInfoDataProps = session.user.user; // eslint-disable-line no-use-before-define

  const form = new FormData();

  const {
    isLoading,
    error,
    data: userOptions,
  } = useQuery(
    "menuOptions",
    async () => await ApiService.getOpcionesUsuario(form)
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error!</p>;
  }

  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
      <Head>
        <title>Kraken</title>
      </Head>
      <Dashboard userProfile={user} userOptions={userOptions} />
      <>{props.children}</>
    </Flex>
  );
}
