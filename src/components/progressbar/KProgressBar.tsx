import { Progress, Stack } from "@chakra-ui/react";

export interface KProgressBarProps {
	/**
	 * Este es el tamaño de la barra de progreso.
	 */
	size: string;
	/**
	 * Este es el valor de la barra de progreso.
	 */
	value: number;
}

function KProgressBar(props: KProgressBarProps) {
	return <Progress colorScheme="green" size={props.size} value={props.value} />;
}

export default KProgressBar;
