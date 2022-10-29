import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  ResponsiveValue,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KLinkoverlayProps {
  /**
   * Este es el ancho maximo
   */
  maxW: string;
  /**
   * Padding superior, izquierdo, inferior y derecho
   */
  p: string;
  /**
   * Este es el ancho del borde.
   */
  borderWidth:
    | ResponsiveValue<
        | number
        | (string & {})
        | "-moz-initial"
        | "inherit"
        | "initial"
        | "revert"
        | "revert-layer"
        | "unset"
        | "medium"
        | "thick"
        | "thin"
      >
    | undefined;
  /**
   * Esta es la intensidad del efecto redondeado.
   */
  rounded: string;
  /**
   * Tamaño de la letra dentro del componente
   */
  size:
    | ResponsiveValue<
        "sm" | "md" | "lg" | "xl" | "2xl" | (string & {}) | "xs" | "3xl" | "4xl"
      >
    | undefined;
  /**
   * Margen superior e inferior
   */
  my: string;
  /**
   * Este es el enlace a donde nos redireccionara al dar click.
   */
  href: string;
  /**
   * propiedad de texto
   */
  text: string;
  /**
   * propiedad de texto (contenido)
   */
  text2: string;
  /**
   * propiedad de tiempo
   */
  dateTime?: string | undefined;
}

const KLinkoverlay: FC<KLinkoverlayProps> = ({
  maxW,
  p,
  borderWidth,
  rounded,
  size,
  my,
  href,
  text,
  text2,
  dateTime,
}) => {
  return (
    <LinkBox
      as="article"
      maxW={maxW}
      p={p}
      borderWidth={borderWidth}
      rounded={rounded}
    >
      <Box as="time" dateTime={dateTime}>
        {text}
      </Box>
      <Heading size={size} my={my}>
        <LinkOverlay href={href}>{text2}</LinkOverlay>
      </Heading>
    </LinkBox>
  );
};

export default KLinkoverlay;
