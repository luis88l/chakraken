// 1. Import
import { HStack, Icon } from '@chakra-ui/react'
import { MdGroupWork, MdReceipt, MdSettings } from 'react-icons/md'

function KIcon(){
    return(
<HStack>
  {/* The default icon size is 1em (16px) */}
  <Icon as={MdSettings} />

  {/* Use the `boxSize` prop to change the icon size */}
  <Icon as={MdReceipt} w={6} h={6} />

  {/* Use the `color` prop to change the icon color */}
  <Icon as={MdGroupWork} w={8} h={8} color='red.500' />
</HStack>
    )
}

export default KIcon