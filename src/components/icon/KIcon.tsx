// 1. Import
import { HStack, Icon } from "@chakra-ui/react";
import { MdGroupWork, MdReceipt, MdSettings } from "react-icons/md";

export interface KIconProps {
	/**
	 * Este es el width del Icon
	 */
	w: number;
	/**
	 * Este es el Height del Icon
	 */
	h: number;
}

function KIcon(props: KIconProps) {
	return (
		<HStack>
			{/* Use the `color` prop to change the icon color */}
			<Icon as={MdGroupWork} w={props.w} h={props.h} color="red.500" />
		</HStack>
	);
}

export default KIcon;
