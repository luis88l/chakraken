import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

function KSwitch(props) {
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
