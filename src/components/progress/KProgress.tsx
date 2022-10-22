import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { ReactElement, JSXElementConstructor, ReactFragment } from "react";

function KProgress(props: {
  max: number | undefined;
  min: number | undefined;
  content:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | null
    | undefined;
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
