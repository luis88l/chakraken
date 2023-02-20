import { Box } from "@chakra-ui/react";

export default function Content(props: { children: any }): any {
  return <Box width="100%">{props.children}</Box>;
}
