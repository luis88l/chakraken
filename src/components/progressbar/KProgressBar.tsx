import { Progress, ResponsiveValue } from "@chakra-ui/react";
import { FC } from "react";

export interface KProgressBarProps {
  /**
   * Este es el color de la barra de progreso.
   */
  colorScheme:
    | (string & {})
    | "blue"
    | "cyan"
    | "gray"
    | "green"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "teal"
    | "yellow"
    | "whiteAlpha"
    | "blackAlpha"
    | "linkedin"
    | "facebook"
    | "messenger"
    | "whatsapp"
    | "twitter"
    | "telegram"
    | undefined;
  /**
   * Este es el tamaño de la barra de progreso
   */
  size: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs"> | undefined;
  /**
   * Este es el valor que tendra la barra de progreso
   */
  value: number;
}

const KProgressBar: FC<KProgressBarProps> = ({ colorScheme, size, value }) => {
  return <Progress colorScheme={colorScheme} size={size} value={value} />;
};

export default KProgressBar;
