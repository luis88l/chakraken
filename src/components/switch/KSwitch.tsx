import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

interface KSwitchProps {
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

function KSwitch(props: KSwitchProps): any {
  return (
    <FormControl display={props.display} alignItems={props.alignItems}>
      <FormLabel htmlFor={props.htmlFor} mb={props.mb}>
        {props.text}
      </FormLabel>
      <Switch id={props.id} />
    </FormControl>
  );
}

export default KSwitch;
