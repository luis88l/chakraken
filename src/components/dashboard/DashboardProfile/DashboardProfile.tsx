import { Avatar, Flex, Heading, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"

interface DashboardProfileProps {
	nb_nombre: string
}

export default function DashboardProfile(props) {
	const { data: session } = useSession()

	if (!session) {
		return null
	}
	//@ts-ignore
	const username = session.user.user.nb_usuario

	return (
		<Flex flexDir="column" alignItems="center" mb={10} mt={50}>
			<Avatar my={2} />
			<Text textAlign="center">{username}</Text>
		</Flex>
	)
}
