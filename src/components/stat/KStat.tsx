import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

function KStat(props) {
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

      <Stat>
        <StatLabel>{props.title2}</StatLabel>
        <StatNumber>{props.Number2}</StatNumber>
        <StatHelpText>
          <StatArrow type={props.type2} />
          {props.percentage2}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
}

export default KStat;
