import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider, Hydrate } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import theme from "../theme"
import { AppProps } from "next/app"
import { useEffect, useState } from "react"
import Layout from "../components/layout/layout"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { ...pageProps }, router }: AppProps) {
	const [isLogged, setIsLogged] = useState(false)
	const [queryClient] = useState(() => new QueryClient())

	if (router.pathname.startsWith("/dashboard")) {
		return (
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					<ChakraProvider theme={theme}>
						<Layout>
							<Component {...pageProps}></Component>
						</Layout>
					</ChakraProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</SessionProvider>
		)
	}

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default MyApp
