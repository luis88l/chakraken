import { Flex, Box, Text, useDisclosure, Collapse } from "@chakra-ui/react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

import Link from "next/link"

interface DashboardMenuItemProps {
	title: string
	items: any
}

export default function DashboardMenuItem(props: DashboardMenuItemProps) {
	const { isOpen, onToggle } = useDisclosure()

	const subItems = props.items

	return (
		<Box className="sidebar-item" color={isOpen ? "#ea4c89" : "#cbd5e0"}>
			<Flex
				width="100%"
				cursor="pointer"
				alignItems="center"
				justifyContent="space-between"
				onClick={onToggle}
			>
				<Box mr={3}>
					<Text className="active">{props.title}</Text>
				</Box>
				<Box>
					{!isOpen && <FiChevronDown />}
					{isOpen && <FiChevronUp />}
				</Box>
			</Flex>
			<Collapse in={isOpen} animateOpacity>
				<Box color="white" mt="4" rounded="md" shadow="md">
					{subItems.map((item) => (
						<Box
							key={item.id_opcion}
							cursor="pointer"
							_hover={{ color: "#ea4c89" }}
						>
							<Link href={`/dashboard/${item.de_ruta}`}>
								<Text pt={2} pb={2} fontSize="sm">
									{item.nb_opcion}
								</Text>
							</Link>
						</Box>
					))}
				</Box>
			</Collapse>
		</Box>
	)
}
