import { CloseButton, Stack } from "@chakra-ui/react";

export interface KClosebuttonProps {
  direction: any;
  /**
   * Este es el tamaño del Boton.
   */
  size: string;
}

function KClosebutton(props: KClosebuttonProps): any {
  return (
    <Stack direction={props.direction}>
      <CloseButton size={props.size} />
    </Stack>
  );
}

export default KClosebutton;
