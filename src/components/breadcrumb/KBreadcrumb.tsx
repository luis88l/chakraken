import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

function KBreadcrumb(props) {
	const items = props.items;
	return (
		<Breadcrumb>
			{items.map((item) => (
				<BreadcrumbItem>
					<BreadcrumbLink href={item.link}> {item.title} </BreadcrumbLink>
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	);
}

export default KBreadcrumb;
