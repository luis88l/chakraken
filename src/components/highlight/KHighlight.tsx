import { Highlight } from "@chakra-ui/react";
import { FC } from "react";

export interface KHighlightProps {
  /**
   * Este es el texto principal.
   */
  text: string;
}

const KHighlight: FC<KHighlightProps> = ({ text }) => {
  return (
    <Highlight
      query="spotlight"
      styles={{ px: "1", py: "1", bg: "orange.100" }}
    >
      {text}
    </Highlight>
  );
};

export default KHighlight;
