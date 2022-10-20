import { Box, Button, Divider, Flex } from "@chakra-ui/react"
import DashboardHeading from "./DashboardHeading/DashboardHeading"
import DashboardMenu from "./DashboardMenu/DashboardMenu"
import DashboardProfile from "./DashboardProfile/DashboardProfile"

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
				<Box>
					<DashboardHeading />
				</Box>
				<Flex
					flexDir="column"
					as="nav"
					overflowY="scroll"
					flex="auto"
					css={{
						"&::-webkit-scrollbar": {
							display: "none",
						},
					}}
				>
					<Box>
						<DashboardMenu items={userOptions} />
					</Box>
				</Flex>
				<Divider orientation="horizontal" color="#cccccc" mt={10} />
				<DashboardProfile />
			</Flex>
		</Flex>
	)
}
