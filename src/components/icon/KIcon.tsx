// 1. Import
import { Icon } from "@chakra-ui/react";
import { FC } from "react";

export interface KIconProps {
  /**
   * Este es el ancho del Icono
   */
  w: string;
  /**
   * Este es la altura del Icono
   */
  h: string;
  /**
   * Este es el color del Icono
   */
  color: string;
  /**
   * Este es icono que utilizaremos, te recomendamos checar la variedad de iconos en
   * https://chakra-ui.com/docs/components/icon/usage
   */
  as: any;
}

const KIcon: FC<KIconProps> = ({ w, h, color, as }) => {
  return <Icon as={as} w={w} h={h} color={color} />;
};

export default KIcon;
