import { Skeleton } from "@chakra-ui/react";

export interface KSkeletonProps {
	/**
	 * Este es la altura del Skeleton
	 */
	height: number;
	/**
	 * Este es el ancho del Skeleton
	 */
	width: string;
}

function KSkeleton(props: KSkeletonProps) {
	return <Skeleton height={props.height} width={props.width} />;
}

export default KSkeleton;
