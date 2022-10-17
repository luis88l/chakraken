import { Flex } from "@chakra-ui/react"
import DashboardHeading from "./DashboardHeading/DashboardHeading"
import DashboardMenu from "./DashboardMenu/DashboardMenu"
import DashboardProfile from "./DashboardProfile/DashboardProfile"

export default function Dashboard({ userOptions }) {
	return (
		<Flex
			w={["100%", "100%", "18%", "18%", "18%"]}
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
			</Flex>
		</Flex>
	)
}
