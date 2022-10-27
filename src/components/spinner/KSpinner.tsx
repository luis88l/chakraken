import { ResponsiveValue, Spinner } from "@chakra-ui/react";
import { FC } from "react";

export interface KSpinnerProps {
  size:
    | ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xl" | "xs">
    | undefined;
  color: string;
}

const KSpinner: FC<KSpinnerProps> = ({ size, color }) => {
  return <Spinner size={size} color={color} />;
};

export default KSpinner;
