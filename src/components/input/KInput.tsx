import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  ResponsiveValue,
} from "@chakra-ui/react";
import React, { FC } from "react";

export interface KInput {
  /**
   * Este es el tamaño del Input
   */
  size: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs"> | undefined;
  /**
   * Este es el tamaño del Boton
   */
  sizebtn:
    | ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs">
    | undefined;
  /**
   * Este es el padding a la derecha
   */
  pr: string;
  /**
   * Este es el texto que aparecera por default en el Input.
   */
  placeholder: string;
  /**
   * Este es el ancho del Boton
   */
  width: string;
  /**
   * Este es el alto del Boton
   */
  h: string;
}

const KInput: FC<KInput> = ({ size, pr, placeholder, width, h, sizebtn }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = (): any => setShow(!show);

  return (
    <InputGroup size={size}>
      <Input
        pr={pr}
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />
      <InputRightElement width={width}>
        <Button h={h} size={sizebtn} onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default KInput;
