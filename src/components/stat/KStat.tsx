import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

interface KStatProps {
  title: string;
  number: string;
  type: "increase" | "decrease" | undefined;
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
