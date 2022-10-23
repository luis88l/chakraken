import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export interface KFormControlProps {
  /**
   * Este es el titulo del Form
   */
  formtitle: string;
  /**
   * Este es el titulo del Place Holder
   */
  placeholder: string;
  /**
   * Este es el nombre de la primer opcion
   */
  option: string;
  /**
   * Este es el titulo de la segunda opcion
   */
  option2: string;
}

function KFormControl(props: KFormControlProps): any {
  return (
    <FormControl>
      <FormLabel>{props.formtitle}</FormLabel>
      <Select placeholder={props.placeholder}>
        <option>{props.option}</option>
        <option>{props.option2}</option>
      </Select>
    </FormControl>
  );
}

export default KFormControl;
