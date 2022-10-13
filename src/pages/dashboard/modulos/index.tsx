/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Breadcrumb, Flex, Heading } from "@chakra-ui/react";

import { userProfile, userOptions } from "../../../fixtures/user";
import KBreadcrumb from "../../../components/breadcrumb/KBreadcrumb";
import KAvatar from "../../../components/avatar/KAvatar";

export default function modulos() {
	const [display, changeDisplay] = useState("hide");
	const [value, changeValue] = useState(1);

	const { data: userData } = userProfile;

	return (
		<Flex
			w={["100%", "100%", "60%", "60%", "55%"]}
			p="3%"
			flexDir="column"
			overflow="auto"
			minH="100vh"
		>
			<Heading fontWeight="normal" mb={4} letterSpacing="tight">
				<Flex display="inline-flex" fontWeight="bold">
					Módulos Kraken
				</Flex>
			</Heading>
			<KAvatar name="Emiliano" src='avatar-1.jpg' size='md'/>
		</Flex>
	);
}
