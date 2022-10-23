import { CheckIcon } from "@chakra-ui/icons";
import { Button, VisuallyHidden } from "@chakra-ui/react";

function KHidden(): any {
  return (
    <Button>
      <VisuallyHidden>Checkmark</VisuallyHidden>
      <CheckIcon />
    </Button>
  );
}

export default KHidden;
