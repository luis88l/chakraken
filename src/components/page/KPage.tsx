import { Box, calc, Flex, Text } from "@chakra-ui/react"

export interface KPageProps {
	title: string
	children: React.ReactNode
}

export default function KPage(props: KPageProps) {
	return (
		<Box
			bgColor="#F5F5F5"
			w={["100%", "100%", "85%", "85%", "85%"]}
			paddingRight={10}
			paddingBottom={10}
			paddingLeft={10}
			paddingTop={0}
			margin={0}
			display="flex"
			flexDir={"column"}
		>
			<Box mt={4} mb={5} width="100%">
				<Text fontSize="2xl">{props.title}</Text>
			</Box>
			<Box width="100%" overflowY="scroll" flex="auto">
				<Flex bgColor="#fff" borderRadius={15} width="100%" minH="calc(81vh)">
					<Box p={10} width="100%">
						{props.children}
					</Box>
				</Flex>
			</Box>
		</Box>
	)
}
