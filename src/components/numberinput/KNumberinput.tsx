import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ResponsiveValue,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KNumberinputProps {
  /**
   * Este es el valor por defecto en que partira el Componente.
   */
  defaultValue: number;
  /**
   * Este es el tamaño del Componente.
   */
  size: ResponsiveValue<"sm" | "md" | "lg" | (string & {}) | "xs"> | undefined;
  /**
   * Este es el valor maximo que puede alcanzar el NumberInput.
   */
  max: number;
  /**
   * Este es el valor minimo que puede alcanzar el NumberInput.
   */
  min: number;
  /**
   * Este es el estilo del componente.
   */
  variant:
    | ResponsiveValue<
        "outline" | (string & {}) | "filled" | "flushed" | "unstyled"
      >
    | undefined;
}

const KNumberinput: FC<KNumberinputProps> = ({
  defaultValue,
  size,
  max,
  min,
  variant,
}) => {
  return (
    <NumberInput
      defaultValue={defaultValue}
      size={size}
      max={max}
      min={min}
      variant={variant}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default KNumberinput;
