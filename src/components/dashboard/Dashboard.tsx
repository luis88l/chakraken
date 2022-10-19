import { Button, Flex } from "@chakra-ui/react"
import DashboardHeading from "./DashboardHeading/DashboardHeading"
import DashboardMenu from "./DashboardMenu/DashboardMenu"
import DashboardProfile from "./DashboardProfile/DashboardProfile"
import { signOut } from "next-auth/react"

export default function Dashboard({ userOptions, userProfile }) {
	return (
		<Flex
			w={["100%", "100%", "15%", "15%", "15%"]}
			flexDir="column"
			alignItems="center"
			backgroundColor="#020202"
			color="#fff"
		>
			<Flex flexDir="column" h={[null, null, "100vh"]}>
				<Flex flexDir="column" as="nav">
					<DashboardHeading />
					<DashboardMenu items={userOptions} />
				</Flex>
				<DashboardProfile nb_nombre="example" />
				<Button
					bg="#c21a6e"
					size="sm"
					_hover={{ bg: "#5e173a" }}
					onClick={() => signOut({ callbackUrl: "/login" })}
				>
					Cerrar sesión
				</Button>
			</Flex>
		</Flex>
	)
}
