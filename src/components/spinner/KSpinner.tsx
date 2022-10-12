import { Spinner, Stack } 
from '@chakra-ui/react';

function KSpinner(){
return (
<Stack direction='row' spacing={4}>
  <Spinner size='xs' color='#239bbf' />
  <Spinner size='sm' color='#239bbf'/>
  <Spinner size='md' color='#239bbf'/>
  <Spinner size='lg' color='#239bbf'/>
  <Spinner size='xl' color='#239bbf'/>
</Stack>
);
}

export default KSpinner;