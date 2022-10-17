import { Flex } from "@chakra-ui/react"
import DashboardMenuItem from "../DashboardMenuItem/DashboardMenuItem"

export default function DashboardMenu(props) {
	const allMenuItems = props.items

	const menuItems = []

	allMenuItems.filter(function (item) {
		var i = menuItems.findIndex((x) => x.id_modulo == item.id_modulo)
		if (i <= -1) {
			menuItems.push(item)
		}
		return null
	})

	return (
		<Flex
			flexDir={["row", "row", "column", "column", "column"]}
			justifyContent="center"
		>
			{menuItems.map((menuItem) => (
				<DashboardMenuItem
					title={menuItem.nb_modulo}
					key={menuItem.id_modulo}
					items={allMenuItems.filter(
						(item) => item.id_modulo === menuItem.id_modulo
					)}
				/>
			))}
		</Flex>
	)
}
