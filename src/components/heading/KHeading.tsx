import { Heading } from "@chakra-ui/react";

export interface KHeadingProps {
	/**
	 * Este es el Heading
	 */
	text: string;
}

function KHeading(props: KHeadingProps) {
	return <Heading>{props.text}</Heading>;
}

export default KHeading;
