import { CloseButton, ResponsiveValue, Stack } from "@chakra-ui/react";
import { FC } from "react";

export interface KClosebuttonProps {
  /**
   * Este es el tamaño del Boton.
   */
  size: ResponsiveValue<"md" | (string & {}) | "sm" | "lg"> | undefined;
}

const KClosebutton: FC<KClosebuttonProps> = ({ size }) => {
  return <CloseButton size={size} />;
};

export default KClosebutton;
