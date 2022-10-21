import { Button, Tooltip } from "@chakra-ui/react";

export interface KToolTipProps {
	/**
	 * Mensaje que desplegara el boton al pasar por encima
	 */
	label: string;
	/**
	 * Este es el titulo del boton.
	 */
	title: string;
}

function KToolTip(props: KToolTipProps) {
	return (
		<Tooltip hasArrow label={props.label} bg="green.600">
			<Button>{props.title}</Button>
		</Tooltip>
	);
}

export default KToolTip;
