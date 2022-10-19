import { CloseButton, Stack } from "@chakra-ui/react";

export interface KClosebuttonProps {
	direction;
	/**
	 * Este es el tamaño del Boton.
	 */
	size: string;
}

function KClosebutton(props: KClosebuttonProps) {
	return (
		<Stack direction={props.direction}>
			<CloseButton size={props.size} />
		</Stack>
	);
}

export default KClosebutton;
