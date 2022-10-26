import { Box, Button, Fade, useDisclosure } from "@chakra-ui/react";

interface KTranstionsProps {
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

function KTranstions(props: KTranstionsProps): any {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>{props.buttonText}</Button>
      <Fade in={isOpen}>
        <Box
          p={props.p}
          color={props.color}
          mt={props.mt}
          bg={props.bg}
          rounded={props.rounded}
          shadow={props.shadow}
        >
          {props.content}
        </Box>
      </Fade>
    </>
  );
}

export default KTranstions;
