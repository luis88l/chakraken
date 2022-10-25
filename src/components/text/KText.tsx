import { Stack, Text } from "@chakra-ui/react";

interface KTextProps {
  /**
   * Esto es el tamaño de la letra
   */
  fontSize?: string;
  /**
   * Este es el contenido
   */
  content: string;
}

function KText(props: KTextProps): any {
  return (
    <Stack>
      <Text fontSize={props.fontSize}>{props.content}</Text>
    </Stack>
  );
}

export default KText;
