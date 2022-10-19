import { Flex, Box } from "@chakra-ui/react"
import Dashboard from "../dashboard/Dashboard"
import Head from "next/head"
import ApiService from "../../../data/services/ApiService"
import FormData from "form-data"
import { useQuery } from "react-query"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Layout(props) {
	const { data: session } = useSession()
	console.log(session)
	// @ts-ignore
	const user: any = session.user.user // eslint-disable-line no-use-before-define

	const form = new FormData()

	const {
		isLoading,
		error,
		data: userOptions,
	} = useQuery("menuOptions", () => ApiService.getOpcionesUsuario(form))

	if (isLoading) {
		return <p>loading...</p>
	}

	if (error) {
		return <p>error!</p>
	}

	return (
		<Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
			<Head>
				<title>Kraken</title>
			</Head>
			<Dashboard userProfile={user} userOptions={userOptions} />
			<>{props.children}</>
		</Flex>
	)
}
