import { Box, Button, Fade, ScaleFade, Slide, SlideFade, useDisclosure } from '@chakra-ui/react';

function KTranstions(props) {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
        <Button onClick={onToggle}>{props.buttontext}</Button>
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
    )
  }

  export default KTranstions;