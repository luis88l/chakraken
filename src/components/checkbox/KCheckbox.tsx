import { Checkbox, Stack } from "@chakra-ui/react";

export interface KCheckboxProps {
	direction;
	/**
	 * Este es el titulo del primer CheckBox
	 */
	title: string;
	/**
	 * Este es el color del CheckBox
	 */
	colorScheme: string;
	/**
	 * Este es el espacio entre los CheckBox
	 */
	spacing: number;
}

function KCheckbox(props: KCheckboxProps) {
	return (
		<Checkbox colorScheme={props.colorScheme} defaultChecked>
			{props.title}
		</Checkbox>
	);
}

export default KCheckbox;
