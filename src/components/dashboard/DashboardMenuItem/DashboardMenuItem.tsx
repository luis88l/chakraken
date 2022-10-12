import {
	Flex,
	Heading,
	Box,
	Text,
	useDisclosure,
	Collapse,
	useAccordionItemState,
} from "@chakra-ui/react";
import {
	FiBox,
	FiBell,
	FiCircle,
	FiChevronDown,
	FiChevronUp,
} from "react-icons/fi";

import Link from "next/link";

interface DashboardMenuItemProps {
	title: string;
	items: any;
}

export default function DashboardMenuItem(props: DashboardMenuItemProps) {
	const { isOpen, onToggle } = useDisclosure();

	const subItems = props.items;

	return (
		<Box className="sidebar-item" color={isOpen ? "#ea4c89" : "#cbd5e0"}>
			<Flex
				width="100%"
				cursor="pointer"
				alignItems="center"
				justifyContent="space-between"
				onClick={onToggle}
			>
				<Box>
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
						<Box key={item.id_opcion} cursor="pointer">
							<Link href={"/" + item.de_ruta}>
								<Text pt={2} pb={2} fontSize="sm">
									{item.nb_opcion}
								</Text>
							</Link>
						</Box>
					))}
				</Box>
			</Collapse>
		</Box>
	);
}
