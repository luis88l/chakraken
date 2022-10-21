import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
} from "@chakra-ui/react";

export interface KStatProps {
	/**
	 * Este es el titulo de la Estadistica
	 */
	title: string;
	/**
	 * Este es el numero de la estadistica
	 */
	Number: number;
	/**
	 * Porcentaje
	 */
	percentage: string;
	/**
	 * Este es el tipo de Estadistica (increase or decrease)
	 */
	type;
}

function KStat(props: KStatProps) {
	return (
		<StatGroup>
			<Stat>
				<StatLabel>{props.title}</StatLabel>
				<StatNumber>{props.Number}</StatNumber>
				<StatHelpText>
					<StatArrow type={props.type} />
					{props.percentage}
				</StatHelpText>
			</Stat>
		</StatGroup>
	);
}

export default KStat;
