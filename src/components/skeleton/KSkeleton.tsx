import { Skeleton } from "@chakra-ui/react";
import { FC } from "react";

export interface KSkeletonProps {
  height: string;
  width: string;
}

const KSkeleton: FC<KSkeletonProps> = ({ height, width }) => {
  return <Skeleton height={height} width={width} />;
};

export default KSkeleton;
