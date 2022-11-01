import { PinInput, PinInputField, ResponsiveValue } from "@chakra-ui/react";
import { FC } from "react";

export interface KPininputProps {
  /**
   * Este es el valor que aparecera por default.
   */
  defaultValue?: string;
  /**
   * Este es el tamaño del Componente.
   */
  size: ResponsiveValue<(string & {}) | "lg" | "sm" | "md" | "xs"> | undefined;
  /**
   * Este es el texto del Componente que aparecera sombreado de manera predeterminada.
   */
  placeholder: string;
  /**
   * Este es el estilo del Componente.
   */
  variant:
    | ResponsiveValue<
        (string & {}) | "flushed" | "outline" | "filled" | "unstyled"
      >
    | undefined;
}

const KPininput: FC<KPininputProps> = ({
  defaultValue,
  size,
  placeholder,
  variant,
}) => {
  return (
    <PinInput
      defaultValue={defaultValue}
      size={size}
      placeholder={placeholder}
      variant={variant}
    >
      <PinInputField />
      <PinInputField />
    </PinInput>
  );
};

export default KPininput;
