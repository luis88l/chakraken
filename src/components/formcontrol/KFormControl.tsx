import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
  } from '@chakra-ui/react';

  function KFormControl(props){
    return(
  <FormControl>
  <FormLabel>{props.formtitle}</FormLabel>
  <Select placeholder={props.placeholder}>
    <option>{props.option}</option>
    <option>{props.option2}</option>
  </Select>
</FormControl>
    )
  }

  export default KFormControl;