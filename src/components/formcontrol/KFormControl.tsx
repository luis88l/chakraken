import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FC } from "react";

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
  option2?: string;
}

const KFormControl: FC<KFormControlProps> = ({
  formtitle,
  placeholder,
  option,
  option2,
}) => {
  return (
    <FormControl>
      <FormLabel>{formtitle}</FormLabel>
      <Select placeholder={placeholder}>
        <option>{option}</option>
        <option>{option2}</option>
      </Select>
    </FormControl>
  );
};

export default KFormControl;
