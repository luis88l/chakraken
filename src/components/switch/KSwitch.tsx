import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

export interface KSwitchProps {
	display;
	/**
	 * De esta manera se alinea el Switch
	 */
	alignItems;
	/**
	 * Este es el tamaño del contenedor del switch
	 */
	mb: string;
	/**
	 * Este es el texto del switch
	 */
	text: string;
	id;
	htmlFor;
}

function KSwitch(props: KSwitchProps) {
	return (
		<FormControl display={props.display} alignItems={props.alignItems}>
			<FormLabel htmlFor={props.htmlFor} mb={props.mb}>
				{props.text}
			</FormLabel>
			<Switch id={props.id} />
		</FormControl>
	);
}

export default KSwitch;
