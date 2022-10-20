import { Flex, Heading } from "@chakra-ui/react"
import Link from "next/link"

export default function DashboardHeading() {
	return (
		<Heading
			fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
			alignSelf="center"
			letterSpacing="tight"
			pt={12}
			pb={12}
		>
			<Link href="/dashboard">Kraken</Link>
		</Heading>
	)
}
