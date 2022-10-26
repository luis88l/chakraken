import { CheckIcon } from "@chakra-ui/icons";
import { Button, VisuallyHidden } from "@chakra-ui/react";
import { FC } from "react";

export interface KHiddenProps {
  /**
   * Este es el nombre que le pondremos al icon
   */
  nameicon: string;
}

const KHidden: FC<KHiddenProps> = ({ nameicon }) => {
  return (
    <Button>
      <VisuallyHidden>{nameicon}</VisuallyHidden>
      <CheckIcon />
    </Button>
  );
};

export default KHidden;
