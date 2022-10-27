import { Textarea } from "@chakra-ui/react";
import { FC } from "react";

export interface KTextareaProps {
  /**
   * Este es el texto que aparecera por default.
   */
  placeholder: string;
}

const KTextarea: FC<KTextareaProps> = ({ placeholder }) => {
  return <Textarea placeholder={placeholder} />;
};
export default KTextarea;
