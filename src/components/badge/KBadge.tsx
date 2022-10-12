import { Avatar, Badge, Box, Flex, Text } 
from '@chakra-ui/react';

function KBadge(){
    return(
<Flex>
  <Avatar src='https://bit.ly/sage-adebayo' />
  <Box ml='3'>
    <Text fontWeight='bold'>
      Segun Adebayo
      <Badge ml='1' colorScheme='green'>
        New
      </Badge>
    </Text>
    <Text fontSize='sm'>UI Engineer</Text>
  </Box>
</Flex>
    )
}

export default KBadge;