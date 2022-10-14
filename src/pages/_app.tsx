import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "../theme";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps, router }: AppProps) {
	const [isLogged, setIsLogged] = useState(false);
	const [queryClient] = useState(() => new QueryClient());

	useEffect(() => {
		if (localStorage.getItem("session") !== null) {
			setIsLogged(true);
		}
	}, [isLogged, router]);

	if (isLogged || router.pathname.startsWith("/dashboard")) {
		return (
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<Layout>
						<Component {...pageProps}></Component>
					</Layout>
					{!isLogged && <Component {...pageProps} />}
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
