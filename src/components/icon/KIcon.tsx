// 1. Import
import { HStack, Icon } from "@chakra-ui/react";
import { MdGroupWork, MdReceipt, MdSettings } from "react-icons/md";

function KIcon(props) {
	return (
		<HStack>
			{/* The default icon size is 1em (16px) */}
			<Icon as={MdSettings} />

			{/* Use the `boxSize` prop to change the icon size */}
			<Icon as={MdReceipt} w={props.w} h={props.h} />

			{/* Use the `color` prop to change the icon color */}
			<Icon as={MdGroupWork} w={props.w} h={props.h} color={props.color} />
		</HStack>
	);
}

export default KIcon;
