import { Box, Portal } from "@chakra-ui/react";
import { FC } from "react";

export interface KPortalProps {
  /**
   * Este es el color de la letra
   */
  color: string;
  /**
   * Este es el texto del Portal
   */
  text: string;
  /**
   * Este es el texto que se situara al final del documento
   */
  portal: React.ReactNode;
  /**
   * Este es color de fondo del portal
   */
  bg: string;
}

const KPortal: FC<KPortalProps> = ({ color, text, portal, bg }) => {
  return (
    <Box bg={bg} color={color}>
      {text}
      <Portal>{portal}</Portal>
    </Box>
  );
};

export default KPortal;
