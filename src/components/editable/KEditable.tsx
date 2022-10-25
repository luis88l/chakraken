import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

interface KEditableProps {
  /**
   * Este es el texto que aparecera por default
   */
  defaultValue: string | undefined;
}

function KEditable(props: KEditableProps): any {
  return (
    <Editable defaultValue={props.defaultValue}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
}

export default KEditable;
