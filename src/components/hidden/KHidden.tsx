import { CheckIcon } from "@chakra-ui/icons";
import { Button, VisuallyHidden, VisuallyHiddenInput } from "@chakra-ui/react";

function KHidden() {
	return (
		<Button>
			<VisuallyHidden>Checkmark</VisuallyHidden>
			<CheckIcon />
		</Button>
	);
}

export default KHidden;
