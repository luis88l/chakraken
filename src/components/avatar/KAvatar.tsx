import { Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem } 
from '@chakra-ui/react';

function KAvatar(props){
  console.log(props.size);
    return(
<Wrap>
  <WrapItem>
    <Avatar size={props.size} name={props.name} src={props.src} />
  </WrapItem>
      
</Wrap>
    )
}

export default KAvatar;