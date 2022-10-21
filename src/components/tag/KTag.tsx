import { AddIcon } from "@chakra-ui/icons";
import { Tag, TagLabel, TagLeftIcon, HStack } from "@chakra-ui/react";

export interface KTagProps {
	/**
	 * Este es el tamaño del Tag
	 */
	size: string;
	/**
	 * Este es el estilo del Tag
	 */
	variant: string;
	/**
	 * Este es el tamaño del icono
	 */
	boxSize: number;
	/**
	 * Este es el titulo del Tag
	 */
	title: string;
}

function KTag(props: KTagProps) {
	return (
		<Tag
			size={props.size}
			key={props.size}
			variant={props.variant}
			colorScheme="cyan"
		>
			<TagLeftIcon boxSize={props.boxSize} as={AddIcon} />
			<TagLabel>{props.title}</TagLabel>
		</Tag>
	);
}

export default KTag;
