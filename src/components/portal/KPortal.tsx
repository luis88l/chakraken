import { Box, Portal } from "@chakra-ui/react";

interface KPortalProps {
  color: string;
  text: string;
  portal: React.ReactNode;
  bg: string;
}

function KPortal(props: KPortalProps): any {
  return (
    <Box bg={props.bg} color={props.color}>
      {props.text}
      <Portal>{props.portal}</Portal>
    </Box>
  );
}

export default KPortal;
