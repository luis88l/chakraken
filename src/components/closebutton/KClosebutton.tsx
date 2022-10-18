import { CloseButton, Stack } from '@chakra-ui/react';

function KClosebutton(props){
    return(
<Stack direction={props.direction}>
  <CloseButton size={props.size} />
</Stack>
    )
}

export default KClosebutton;