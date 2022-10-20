import { Box, calc, Flex, Text } from "@chakra-ui/react"

export interface KPageProps {
	title: string
	children: React.ReactNode
}

export default function KPage(props: KPageProps) {
	return (
		<Flex bgColor="#F5F5F5" w={["100%", "100%", "85%", "85%", "85%"]} p={10}>
			<Box width="100%">
				<Flex mb={5}>
					<Text fontSize="4xl">{props.title}</Text>
				</Flex>
				<Flex bgColor="#fff" borderRadius={15} width="100%" minH="calc(81vh)">
					<Box p={10} width="100%">
						{props.children}
					</Box>
				</Flex>
			</Box>
		</Flex>
	)
}
