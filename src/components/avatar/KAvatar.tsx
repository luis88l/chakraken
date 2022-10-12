import { Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem } 
from '@chakra-ui/react';

function KAvatar(){
    return(
<Wrap>
  <WrapItem>
    <Avatar size='2xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </WrapItem>
  <WrapItem>
    <Avatar
      size='xs'
      name='Kola Tioluwani'
      src='https://bit.ly/tioluwani-kolawole'
    />{' '}
  </WrapItem>
  <WrapItem>
    <Avatar size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />{' '}
  </WrapItem>
  <WrapItem>
    <Avatar size='md' name='Ryan Florence' src='https://bit.ly/ryan-florence' />{' '}
  </WrapItem>
  <WrapItem>
    <Avatar
      size='lg'
      name='Prosper Otemuyiwa'
      src='https://bit.ly/prosper-baba'
    />{' '}
  </WrapItem>
  <WrapItem>
    <Avatar size='xl' name='Christian Nwamba' src='https://bit.ly/code-beast' />{' '}
  </WrapItem>
  <WrapItem>
    <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />{' '}
  </WrapItem>
</Wrap>
    )
}

export default KAvatar;