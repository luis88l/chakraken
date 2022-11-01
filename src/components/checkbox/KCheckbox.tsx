import { Checkbox } from "@chakra-ui/react";
import { FC } from "react";

export interface KCheckboxProps {
  /**
   * Este es el titulo del primer CheckBox
   */
  title: string;
  /**
   * Este es el color del CheckBox
   */
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
}

const KCheckbox: FC<KCheckboxProps> = ({ title, colorScheme }) => {
  return (
    <Checkbox colorScheme={colorScheme} defaultChecked>
      {title}
    </Checkbox>
  );
};

export default KCheckbox;
