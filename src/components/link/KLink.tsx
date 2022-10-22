import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export interface KLinkProps {
	href: string;
	text: string;
	mx: string;
}

function KLink(props) {
	return (
		<Link href={props.href} isExternal>
			{props.text} <ExternalLinkIcon mx={props.mx} />
		</Link>
	);
}

export default KLink;
