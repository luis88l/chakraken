import { Button, ResponsiveValue } from "@chakra-ui/react";
import { FC } from "react";

export interface KButtonProps {
  /**
   * Este es el color del Boton.
   */
  colorScheme: string;
  /**
   * Este es el tamaño del Boton
   */
  size: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs"> | undefined;
  /**
   * Este es el titulo del Boton
   */
  title: string;
}

const KButton: FC<KButtonProps> = ({ colorScheme, size, title }) => {
  return (
    <Button colorScheme={colorScheme} size={size}>
      {title}
    </Button>
  );
};

export default KButton;
