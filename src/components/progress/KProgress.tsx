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
  /**
   * Este es el tamaño del componente
   */
  size: number;
}

const KProgress: FC<KProgressProps> = ({ max, min, content, color, size }) => {
  return (
    <CircularProgress
      max={max}
      min={min}
      value={content}
      color={color}
      size={size}
    >
      <CircularProgressLabel>{content}%</CircularProgressLabel>
    </CircularProgress>
  );
};

export default KProgress;
