import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import KPage from "../page/KPage";

function KSkeletonPage(): any {
  return (
    <KPage title="Loading...">
      <Box overflow="scroll" max-height="100%" width="100%">
        <SkeletonCircle size="10" />
        <Skeleton height="200px" mt={7} />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <Skeleton height="100px" mt={3} />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </KPage>
  );
}

export default KSkeletonPage;
