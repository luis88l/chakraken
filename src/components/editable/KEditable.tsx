import {
  Editable,
  EditableInput,
  EditablePreview,
  propNames,
} from "@chakra-ui/react";

function KEditable(props) {
  return (
    <Editable defaultValue={props.defaultValue}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
}

export default KEditable;
