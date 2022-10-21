import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export interface KProgressProps {
	/**
	 * Este es el nivel  de progreso maximo del Circular Progress
	 */
	max: number;
	/**
	 * Este es el nivel de progreso minimo del Progress
	 */
	min: number;
	/**
	 * Este es el nivel de progreso del Circular Progress
	 */
	content: number;
}

function KProgress(props: KProgressProps) {
	return (
		<CircularProgress
			max={props.max}
			min={props.min}
			value={props.content}
			color="green.500"
		>
			<CircularProgressLabel>{props.content}%</CircularProgressLabel>
		</CircularProgress>
	);
}

export default KProgress;
