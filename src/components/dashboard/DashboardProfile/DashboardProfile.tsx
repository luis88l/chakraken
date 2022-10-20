import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

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
		<Flex flexDir="column" alignItems="center" pb={10} pt={10}>
			<Avatar />
			<Text textAlign="center">{username}</Text>
			<Button
				mt={5}
				bg="#c21a6e"
				size="sm"
				_hover={{ bg: "#5e173a" }}
				onClick={() => signOut({ callbackUrl: "/login" })}
			>
				Cerrar sesión
			</Button>
		</Flex>
	)
}
