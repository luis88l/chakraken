import { Flex, Box } from "@chakra-ui/react";
import Dashboard from "../dashboard/Dashboard";
import { userProfile, userOptions } from "../../fixtures/user";
import Head from "next/head";

export default function Layout(props) {
	const { data: userData } = userProfile;

	return (
		<Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
			<Head>
				<title>Kraken</title>
			</Head>
			<Dashboard userProfile={userData} userOptions={userOptions.data} />
			<>{props.children}</>
		</Flex>
	);
}
