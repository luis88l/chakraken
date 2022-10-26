import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

interface KStatProps {
  /**
   * Esto es el titulo del Stat
   */
  title: string;
  /**
   * Esto es el numero de nuestro Stat
   */
  number: string;
  /**
   * Esto es el tipo que llevara nuestro stat, incremento o decremento
   * (increase o decrease)
   */
  type?: "increase" | "decrease" | undefined;
  /**
   * Esto es el porcentaje de nuestro Stat
   */
  percentage: string;
}

function KStat(props: KStatProps): any {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>{props.title}</StatLabel>
        <StatNumber>{props.number}</StatNumber>
        <StatHelpText>
          <StatArrow type={props.type} />
          {props.percentage}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
}

export default KStat;
