import { Stack, Text } from '@chakra-ui/react';

function KText(props){
    return(
<Stack>
  <Text fontSize={props.fontSize}>{props.content}</Text>
</Stack>
    )
}

export default KText;
