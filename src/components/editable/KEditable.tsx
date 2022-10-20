import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

function KEditable() {
	return (
		<Editable defaultValue="write here...">
			<EditablePreview />
			<EditableInput />
		</Editable>
	);
}

export default KEditable;
