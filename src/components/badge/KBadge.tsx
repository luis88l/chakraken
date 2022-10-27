import {
  Avatar,
  Badge,
  Box,
  Flex,
  ResponsiveValue,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KBadgeProps {
  /**
   * Aqui es donde ingresas la imagen.
   */
  src: string;
  /**
   * Esta es la separacion entre textos.
   */
  Ml: string;
  /**
   * Este es el tamaño de la letra.
   */
  fontSize: string;
  /**
   * Este es el titulo.
   */
  title: string;
  /**
   * Este es el estatus.
   */
  status: string;
  /**
   * Esta es la descripcion.
   */
  description: string;
  /**
   * Este es el estilo de la letra.
   */
  fontWeight:
    | ResponsiveValue<
        | number
        | (string & {})
        | "bold"
        | "hairline"
        | "thin"
        | "light"
        | "normal"
        | "medium"
        | "semibold"
        | "extrabold"
        | "black"
      >
    | undefined;
  /**
   * Este es el color de la alerta.
   */
  colorScheme: string;
}

const KBadge: FC<KBadgeProps> = ({
  src,
  Ml,
  fontSize,
  title,
  status,
  description,
  fontWeight,
  colorScheme,
}) => {
  return (
    <Flex>
      <Avatar src={src} />
      <Box ml={Ml}>
        <Text fontWeight={fontWeight}>
          {title}
          <Badge ml={Ml} colorScheme={colorScheme}>
            {status}
          </Badge>
        </Text>
        <Text fontSize={fontSize}>{description}</Text>
      </Box>
    </Flex>
  );
};

export default KBadge;
