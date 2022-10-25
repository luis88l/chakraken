import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function KProgress(props: {
  /**
   * Esto es lo que indicaremos como maximo de progreso que pueda alcanzar
   */
  max: number | undefined;
  /**
   * Esto es lo que indicaremos como minimo de progreso que pueda tener
   */
  min: number | undefined;
  /**
   * Este es el progreso con el que indicaremos que partira
   */
  content: number | undefined;
  /**
   * Este es el color del componente de progreso
   */
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
