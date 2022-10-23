import { Box, Button, Fade, useDisclosure } from "@chakra-ui/react";

interface KTranstionsProps {
  buttonText: string;
  p: string;
  color: string;
  mt: string;
  bg: string;
  rounded: string;
  shadow: string;
  content: string;
}

function KTranstions(props: KTranstionsProps): any {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>{props.buttonText}</Button>
      <Fade in={isOpen}>
        <Box
          p={props.p}
          color={props.color}
          mt={props.mt}
          bg={props.bg}
          rounded={props.rounded}
          shadow={props.shadow}
        >
          {props.content}
        </Box>
      </Fade>
    </>
  );
}

export default KTranstions;
