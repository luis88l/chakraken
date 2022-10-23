import { Flex } from "@chakra-ui/react";
import Dashboard from "../dashboard/Dashboard";
import Head from "next/head";
import ApiService from "../../../data/services/ApiService";
import FormData from "form-data";
import { useQuery } from "react-query";

export default function Layout(props: { children: any }): any {
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

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (error) {
    return <p>error!</p>;
  }

  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
      <Head>
        <title>Kraken</title>
      </Head>
      <Dashboard userOptions={userOptions} />
      <>{props.children}</>
    </Flex>
  );
}
