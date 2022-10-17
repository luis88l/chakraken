import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
  } from '@chakra-ui/react';

function KEditable(){
    return(
<Editable defaultValue='Write here...'>
  <EditablePreview />
  <EditableInput />
</Editable>
    )
}

export default KEditable;