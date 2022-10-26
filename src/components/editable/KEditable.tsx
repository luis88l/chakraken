import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { FC } from "react";

export interface KEditableProps {
  /**
   * Este es el texto que aparecera por default
   */
  defaultValue: string | undefined;
}

const KEditable: FC<KEditableProps> = ({ defaultValue }) => {
  return (
    <Editable defaultValue={defaultValue}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};

export default KEditable;
