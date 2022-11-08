import { IconButton } from "@chakra-ui/react";
import { FC } from "react";

export interface KIconbuttonProps {
  arialabel: string;
  /**
   * Este es icono que utilizaremos, te recomendamos checar la variedad de iconos en
   * https://chakra-ui.com/docs/components/icon/usage
   */
  icon: any;
}

const KIconbutton: FC<KIconbuttonProps> = ({ arialabel, icon }) => {
  return <IconButton aria-label={arialabel} icon={icon} />;
};

export default KIconbutton;
