import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';

function KSkeleton(){
return(
<Stack>
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
</Stack>
);
}

export default KSkeleton;