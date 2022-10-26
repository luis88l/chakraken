import { Heading } from "@chakra-ui/react";

interface KHeadingProps {
  /**
   * Este es el texto que se mostrara.
   */
  text: string;
}

function KHeading(props: KHeadingProps): any {
  return <Heading>{props.text}</Heading>;
}

export default KHeading;
