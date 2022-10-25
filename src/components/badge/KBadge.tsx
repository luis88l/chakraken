import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";

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

  fontWeight: string;
  colorScheme: string;
}

function KBadge(props: KBadgeProps): any {
  return (
    <Flex>
      <Avatar src={props.src} />
      <Box ml={props.Ml}>
        <Text fontWeight={props.fontWeight}>
          {props.title}
          <Badge ml={props.Ml} colorScheme={props.colorScheme}>
            {props.status}
          </Badge>
        </Text>
        <Text fontSize={props.fontSize}>{props.description}</Text>
      </Box>
    </Flex>
  );
}

export default KBadge;
