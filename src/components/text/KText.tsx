import { Text } from "@chakra-ui/react";
import { FC } from "react";

export interface KTextProps {
  /**
   * Esto es el tamaño de la letra
   */
  fontSize?: string;
  /**
   * Este es el contenido
   */
  content: string;
}

const KText: FC<KTextProps> = ({ fontSize, content }) => {
  return <Text fontSize={fontSize}>{content}</Text>;
};

export default KText;
