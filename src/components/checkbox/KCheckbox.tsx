import { Checkbox, Stack, StackDirection } from "@chakra-ui/react";
import { FC } from "react";

export interface KCheckboxProps {
  /**
   * Este es el titulo del primer CheckBox
   */
  title: string;
  /**
   * Este es el color del CheckBox
   */
  colorScheme: string;
}

const KCheckbox: FC<KCheckboxProps> = ({ title, colorScheme }) => {
  return (
    <Checkbox colorScheme={colorScheme} defaultChecked>
      {title}
    </Checkbox>
  );
};

export default KCheckbox;
