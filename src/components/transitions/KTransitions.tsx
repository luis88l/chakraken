import { Box, Button, Fade, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";

export interface KTranstionsProps {
  /**
   * Esto es el texto del Boton
   */
  buttonText: string;
  /**
   * Esto es el margen del Boton
   */
  p: string;
  /**
   * Esto es el color del Boton
   */
  color: string;
  /**
   * Margen en la parte superior
   */
  mt: string;
  /**
   * Esto es el color del fondo
   */
  bg: string;
  /**
   * Esto es el tamaño del estilo de redondeado de la transicion
   */
  rounded: string;
  /**
   * Esto es la intenisad de la sombra que desplegara
   */
  shadow: string;
  /**
   * Esto es el texto dentro de la transicion
   */
  content: string;
}

const KTranstions: FC<KTranstionsProps> = ({
  buttonText,
  p,
  color,
  mt,
  bg,
  rounded,
  shadow,
  content,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>{buttonText}</Button>
      <Fade in={isOpen}>
        <Box
          p={p}
          color={color}
          mt={mt}
          bg={bg}
          rounded={rounded}
          shadow={shadow}
        >
          {content}
        </Box>
      </Fade>
    </>
  );
};

export default KTranstions;
