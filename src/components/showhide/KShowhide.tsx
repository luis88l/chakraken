import { Show, Hide, Box } from "@chakra-ui/react";

function KShowhide() {
	return (
		<Show breakpoint="(max-width: 400px)">
			<Box>This text appears only on screens 400px and smaller.</Box>
		</Show>
	);
}

export default KShowhide;
