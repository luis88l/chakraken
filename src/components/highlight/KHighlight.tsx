import { Highlight } from "@chakra-ui/react";

function KHighlight() {
	return (
		<Highlight
			query="spotlight"
			styles={{ px: "1", py: "1", bg: "orange.100" }}
		>
			With the Highlight component, you can spotlight words.
		</Highlight>
	);
}

export default KHighlight;
