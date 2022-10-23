import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

interface KEditableProps {
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
