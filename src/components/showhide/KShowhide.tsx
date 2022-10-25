import { Show, Box } from "@chakra-ui/react";

function KShowhide(): any {
  return (
    <Show breakpoint="(max-width: 400px)">
      <Box>This text appears only on screens 400px and smaller.</Box>
    </Show>
  );
}

export default KShowhide;
