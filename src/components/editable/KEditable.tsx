import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

export interface KEditableProps {
	/**
	 * Este es el texto que aparecera por Default
	 */
	defaultValue: string;
}

function KEditable(props: KEditableProps) {
	return (
		<Editable defaultValue={props.defaultValue}>
			<EditablePreview />
			<EditableInput />
		</Editable>
	);
}

export default KEditable;
