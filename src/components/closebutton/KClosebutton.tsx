import { CloseButton, ResponsiveValue } from "@chakra-ui/react";
import { FC } from "react";

export interface KClosebuttonProps {
  /**
   * Este es el tamaño del Boton.
   */
  size: ResponsiveValue<"md" | (string & {}) | "sm" | "lg"> | undefined;
  /**
   * Este es el color que se le asignara a nuestro boton
   */
  color: string;
}

const KClosebutton: FC<KClosebuttonProps> = ({ size, color }) => {
  return <CloseButton size={size} color={color} />;
};

export default KClosebutton;
