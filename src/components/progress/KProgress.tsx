import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { FC } from "react";

export interface KProgressProps {
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
}

const KProgress: FC<KProgressProps> = ({ max, min, content, color }) => {
  return (
    <CircularProgress max={max} min={min} value={content} color={color}>
      <CircularProgressLabel>{content}%</CircularProgressLabel>
    </CircularProgress>
  );
};

export default KProgress;
