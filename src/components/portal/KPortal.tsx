import { Box, Portal } from '@chakra-ui/react';

function KPortal(props) {
    return (
      <Box bg={props.bg} color={props.color}>
        {props.text}
        <Portal>{props.portal}</Portal>
      </Box>
    )
  }

  export default KPortal;