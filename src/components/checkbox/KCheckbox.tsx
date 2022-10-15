import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

function KCheckbox(props){
    return(
<Stack spacing={5} direction={props.direction}>
  <Checkbox colorScheme={props.colorScheme} defaultChecked>
    {props.title}
  </Checkbox>
  <Checkbox colorScheme={props.colorScheme} defaultChecked>
    {props.title2}
  </Checkbox>
</Stack>
    )
}

export default KCheckbox;