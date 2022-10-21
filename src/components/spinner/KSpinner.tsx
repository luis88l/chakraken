import { Spinner, Stack } from "@chakra-ui/react";

export interface KSpinnerProps {
	/**
	 * Este es el tamaño del Spinner
	 */
	size: string;
}

function KSpinner(props: KSpinnerProps) {
	return <Spinner size={props.size} color="#239bbf" />;
}

export default KSpinner;
