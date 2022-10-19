import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

function KBreadcrumb(props) {
	const items = props.items
	return (
		<Breadcrumb>
			{items.map((item, index) => (
				<BreadcrumbItem key={index}>
					<BreadcrumbLink href={item.link}> {item.title} </BreadcrumbLink>
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	)
}

export default KBreadcrumb
