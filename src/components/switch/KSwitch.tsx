import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { FC } from "react";

export interface KSwitchProps {
  display: string;
  /**
   * De esta manera se alineara
   */
  alignItems: string;
  htmlFor: string;
  /**
   * Este es el texto de nuestro Switch
   */
  text: string;
  id: string;
  /**
   * Este es el margen del switch
   */
  mb: string;
}

const KSwitch: FC<KSwitchProps> = ({
  display,
  htmlFor,
  alignItems,
  mb,
  text,
  id,
}) => {
  return (
    <FormControl display={display} alignItems={alignItems}>
      <FormLabel htmlFor={htmlFor} mb={mb}>
        {text}
      </FormLabel>
      <Switch id={id} />
    </FormControl>
  );
};

export default KSwitch;
