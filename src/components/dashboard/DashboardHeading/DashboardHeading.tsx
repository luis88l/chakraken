import { Flex, Heading } from "@chakra-ui/react";

export default function DashboardHeading() {
	return (
		<Heading
			mt={50}
			mb={[25, 50, 70]}
			fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
			alignSelf="center"
			letterSpacing="tight"
		>
			Kraken
		</Heading>
	);
}
