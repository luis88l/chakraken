import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export interface KLinkProps {
	/**
	 * Aqui puedes agregar el Enlace donde te rediccionara
	 */
	href: string;
	/**
	 * Este es el texto que aparecera
	 */
	text: string;
	/**
	 * Es el margen
	 */
	mx: string;
}

function KLink(props: KLinkProps) {
	return (
		<Link href={props.href} isExternal>
			{props.text} <ExternalLinkIcon mx={props.mx} />
		</Link>
	);
}

export default KLink;
