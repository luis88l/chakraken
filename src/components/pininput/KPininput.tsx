import { HStack, PinInput, PinInputField } from '@chakra-ui/react';

function KPininput(){
    return(
<HStack>
  <PinInput>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
    )
}

export default KPininput;