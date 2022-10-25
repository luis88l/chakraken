import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "../theme";
import { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/layout/layout";
import { SessionProvider } from "next-auth/react";

interface krakenSessionProps {
  user: any;
  expires: string;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: krakenSessionProps }>): any {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (session) {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps}></Component>
            </Layout>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
