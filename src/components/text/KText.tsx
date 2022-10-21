import { Stack, Text } from "@chakra-ui/react";

export interface KTextProps {
	/**
	 * Este es el tamaño de la letra
	 */
	fontSize: string;
	/**
	 * Este es el contenido
	 */
	content: string;
}

function KText(props: KTextProps) {
	return <Text fontSize={props.fontSize}>{props.content}</Text>;
}

export default KText;
