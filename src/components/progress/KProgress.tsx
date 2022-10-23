import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function KProgress(props: {
  max: number | undefined;
  min: number | undefined;
  content: number | undefined;
  color: string | undefined;
}): any {
  return (
    <CircularProgress
      max={props.max}
      min={props.min}
      value={props.content}
      color={props.color}
    >
      <CircularProgressLabel>{props.content}%</CircularProgressLabel>
    </CircularProgress>
  );
}

export default KProgress;
