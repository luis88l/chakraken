import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  ButtonGroup,
  Button,
  ResponsiveValue,
} from "@chakra-ui/react";
import React, { FC } from "react";

export interface KPopOverProps {
  /**
   * Este es el titulo del boton
   */
  btnTitle: string;
  /**
   * Este es el color de la letra
   */
  FontColor: string;
  /**
   * Este es el color del fondo
   */
  bg: string;
  /**
   * Este es el color del borde del Pop Over.
   */
  borderColor: string;
  /**
   * Este es el estilo de la letra
   */
  fontWeight:
    | ResponsiveValue<
        | number
        | (string & {})
        | "bold"
        | "normal"
        | "medium"
        | "black"
        | "hairline"
        | "thin"
        | "light"
        | "semibold"
        | "extrabold"
      >
    | undefined;
  /**
   * Tamaño del borde que se desplega en la parte superior del pop over
   */
  border?: string;
  /**
   * Este es el titulo principal del pop over.
   */
  headerTitle: string;
  /**
   * Este es el contenido del pop over.
   */
  BodyContent: string;
  /**
   * Tamaño del borde que se desplega en la parte inferior del pop over
   */
  borderContent?: string;
  display: string;
  /**
   * (space-between)
   */
  justifyContent: string;
  /**
   * Este es el tamaño de la letra (inferiores)
   */
  fontSize: string;
  /**
   * Este es el contenido que se ubica en la parte inferior izquierda
   */
  boxContent: string;
  /**
   * Este es el tamaño de los botones dentro del pop over.
   */
  size: ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xs"> | undefined;
  /**
   * Este es el color del primer boton(pop over)
   */
  colorBtn1: string;
  /**
   * Este es el color del segundo boton(pop over)
   */
  colorBtn2: string;
  /**
   * Este es el titulo del primer boton(pop over)
   */
  txtBtn1: string;
  /**
   * Este es el titulo del segundo boton(pop over)
   */
  txtBtn2: string;
}

const KPopOver: FC<KPopOverProps> = ({
  btnTitle,
  FontColor,
  bg,
  borderColor,
  fontWeight,
  border,
  headerTitle,
  BodyContent,
  borderContent,
  display,
  justifyContent,
  fontSize,
  boxContent,
  size,
  colorBtn1,
  colorBtn2,
  txtBtn1,
  txtBtn2,
}) => {
  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <Button>{btnTitle}</Button>
      </PopoverTrigger>
      <PopoverContent color={FontColor} bg={bg} borderColor={borderColor}>
        <PopoverHeader pt={4} fontWeight={fontWeight} border={border}>
          {headerTitle}
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverBody>{BodyContent}</PopoverBody>

        <PopoverFooter
          border={borderContent}
          display={display}
          justifyContent={justifyContent}
          pb={4}
        >
          <Box fontSize={fontSize}>{boxContent}</Box>
          <ButtonGroup size={size}>
            <Button colorScheme={colorBtn1}>{txtBtn1}</Button>

            <Button colorScheme={colorBtn2}>{txtBtn2}</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default KPopOver;
