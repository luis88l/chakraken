import { Avatar, Badge, Box, Flex, Text } 
from '@chakra-ui/react';

function KBadge(props){
    return(
<Flex>
  <Avatar src={props.src} />
  <Box ml={props.Ml}>
    <Text fontWeight={props.fontWeight}>
      Emiliano Rios
      <Badge ml={props.Ml} colorScheme={props.colorScheme}>
        Nuevo
      </Badge>
    </Text>
    <Text fontSize={props.fontSize}> Ui Engineer </Text>
  </Box>
</Flex>
    )
}

export default KBadge;