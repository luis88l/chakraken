// 1. Import
import { HStack, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { MdGroupWork } from "react-icons/md";

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
}

const KIcon: FC<KIconProps> = ({ w, h, color }) => {
  return (
    <HStack>
      {/* Use the `color` prop to change the icon color */}
      <Icon as={MdGroupWork} w={w} h={h} color={color} />
    </HStack>
  );
};

export default KIcon;
