import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

interface KSwitchProps {
  display: string;
  alignItems: string;
  htmlFor: string;
  text: string;
  id: string;
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
