import { Box, Portal } from "@chakra-ui/react";

export interface KPortalProps {
	/**
	 * Este es el titulo del portal
	 */
	text: string;
	/**
	 * Este es el titulo del portal
	 */
	portal: string;
}

function KPortal(props: KPortalProps) {
	return (
		<Box bg="gray.400" color="white">
			{props.text}
			<Portal>{props.portal}</Portal>
		</Box>
	);
}

export default KPortal;
