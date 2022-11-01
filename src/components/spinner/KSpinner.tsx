import { ResponsiveValue, Spinner } from "@chakra-ui/react";
import { FC } from "react";

export interface KSpinnerProps {
  /**
   * Este es el tamaño del Spinner.
   */
  size:
    | ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xl" | "xs">
    | undefined;
  /**
   * Este es el color del Spinner.
   */
  color: string;
}

const KSpinner: FC<KSpinnerProps> = ({ size, color }) => {
  return <Spinner size={size} color={color} />;
};

export default KSpinner;
