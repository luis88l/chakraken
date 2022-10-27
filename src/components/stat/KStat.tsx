import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KStatProps {
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

const KStat: FC<KStatProps> = ({ title, number, type, percentage }) => {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>{number}</StatNumber>
        <StatHelpText>
          <StatArrow type={type} />
          {percentage}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default KStat;
