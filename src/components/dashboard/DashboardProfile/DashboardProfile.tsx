import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";

interface DashboardProfileProps {
	name: string;
}

export default function DashboardProfile(props: DashboardProfileProps) {
	return (
		<Flex flexDir="column" alignItems="center" mb={10} mt={50}>
			<Avatar my={2} src="avatar-1.jpg" />
			<Text textAlign="center">{props.name}</Text>
		</Flex>
	);
}
