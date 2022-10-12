import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "../theme";
import { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps, router }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
	console.log(router);

	if (router.pathname.startsWith("/dashboard")) {
		return (
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<Layout>
						<Component {...pageProps}></Component>
					</Layout>
				</ChakraProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default MyApp;
