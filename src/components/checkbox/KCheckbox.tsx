import { Checkbox, Stack } from "@chakra-ui/react";

export interface KCheckboxProps {
	direction;
	/**
	 * Este es el titulo del primer CheckBox
	 */
	title: string;
	/**
	 * Este es el titulo del segundo CheckBox
	 */
	title2: string;
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
		<Stack spacing={props.spacing} direction={props.direction}>
			<Checkbox colorScheme={props.colorScheme} defaultChecked>
				{props.title}
			</Checkbox>
			<Checkbox colorScheme={props.colorScheme} defaultChecked>
				{props.title2}
			</Checkbox>
		</Stack>
	);
}

export default KCheckbox;
