import { Checkbox, Stack, StackDirection } from "@chakra-ui/react";

export interface KCheckboxProps {
  direction: StackDirection | undefined;
  /**
   * Este es el titulo del primer CheckBox
   */
  title: string;
  /**
   * Este es el titulo del segundo CheckBox
   */
  title2: string;
  /**
   * Este es el color del CheckBox
   */
  colorScheme: string;
  /**
   * Este es el espacio entre los CheckBox
   */
  spacing: string;
}

function KCheckbox(props: KCheckboxProps): any {
  return (
    <Stack spacing={props.spacing} direction={props.direction}>
      <Checkbox colorScheme={props.colorScheme} defaultChecked>
        {props.title}
      </Checkbox>
      <Checkbox colorScheme={props.colorScheme} defaultChecked>
        {props.title2}
      </Checkbox>
    </Stack>
  );
}

export default KCheckbox;
