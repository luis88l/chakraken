import { Flex, useMediaQuery } from "@chakra-ui/react";
import Dashboard from "../dashboard/Dashboard";
import DashboardMobile from "../dashboard/DashboardMobile";
import Head from "next/head";
import ApiService from "../../../data/services/ApiService";
import FormData from "form-data";
import { useQuery } from "react-query";
import Content from "../dashboard/Content";

export default function Layout(props: { children: any }): any {
  const [isLargerThan450] = useMediaQuery("(min-width: 624px)");
  const form = new FormData();
  const {
    isLoading,
    error,
    data: userOptions,
  } = useQuery(
    "opcionesModulos",
    async () => await ApiService.getOpcionesUsuario(form)
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (error) {
    return <p>error!</p>;
  }

  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" w={{ base: "100%" }}>
      <Head>
        <title>Kraken</title>
      </Head>
      {isLargerThan450 ? (
        <Dashboard userOptions={userOptions} cerrarModal={undefined} />
      ) : (
        <DashboardMobile userOptions={userOptions} />
      )}

      <Content> {props.children}</Content>
    </Flex>
  );
}
