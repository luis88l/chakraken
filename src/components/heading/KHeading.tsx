import { Heading } from "@chakra-ui/react";
import { FC } from "react";

export interface KHeadingProps {
  /**
   * Este es el texto que se mostrara.
   */
  text: string;
}

const KHeading: FC<KHeadingProps> = ({ text }) => {
  return <Heading>{text}</Heading>;
};

export default KHeading;
