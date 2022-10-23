import { Heading } from "@chakra-ui/react";

interface KHeadingProps {
  text: string;
}

function KHeading(props: KHeadingProps): any {
  return <Heading>{props.text}</Heading>;
}

export default KHeading;
