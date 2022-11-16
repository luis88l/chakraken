import { IconButton } from "@chakra-ui/react";
import { FC } from "react";

export interface KIconbuttonProps {
  arialabel: string;
  /**
   * Este es icono que utilizaremos, te recomendamos checar la variedad de iconos en
   * https://chakra-ui.com/docs/components/icon/usage
   */
  icon: any;
  colorScheme:
    | (string & {})
    | "whiteAlpha"
    | "blackAlpha"
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink"
    | "linkedin"
    | "facebook"
    | "messenger"
    | "whatsapp"
    | "twitter"
    | "telegram"
    | undefined;

  rounded: string;
}

const KIconbutton: FC<KIconbuttonProps> = ({
  arialabel,
  icon,
  colorScheme,
  rounded,
}) => {
  return (
    <IconButton
      aria-label={arialabel}
      icon={icon}
      colorScheme={colorScheme}
      rounded={rounded}
    />
  );
};

export default KIconbutton;
