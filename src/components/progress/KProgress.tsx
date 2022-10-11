import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

function KProgress(){
    return(
<CircularProgress value={40} color='green.400'>
  <CircularProgressLabel>40%</CircularProgressLabel>
</CircularProgress>
);
}

export default KProgress;