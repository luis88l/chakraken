import { Button, Tooltip } from "@chakra-ui/react";
import { FC } from "react";

export interface KToolTipProps {
  /**
   * Mensaje que desplegara el boton al pasar por encima
   */
  label: string;
  /**
   * Este es el titulo del boton.
   */
  title: string;
  /**
   * Este es el color del Tip de desplegara.
   */
  bg: string;
}

const KToolTip: FC<KToolTipProps> = ({ label, title, bg }) => {
  return (
    <Tooltip hasArrow label={label} bg={bg}>
      <Button>{title}</Button>
    </Tooltip>
  );
};

export default KToolTip;
