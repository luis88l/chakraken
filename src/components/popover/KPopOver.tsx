import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import React from "react";

function KPopOver(props: any): any {
  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <Button>{props.btnTitle}</Button>
      </PopoverTrigger>
      <PopoverContent
        color={props.FontColor}
        bg={props.bg}
        borderColor={props.borderColor}
      >
        <PopoverHeader
          pt={4}
          fontWeight={props.fontWeight}
          border={props.border}
        >
          {props.headerTitle}
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverBody>{props.BodyContent}</PopoverBody>

        <PopoverFooter
          border={props.borderContent}
          display={props.display}
          alignItems={props.alignItems}
          justifyContent={props.justifyContent}
          pb={4}
        >
          <Box fontSize={props.fontSize}>{props.boxContent}</Box>
          <ButtonGroup size={props.size}>
            <Button colorScheme={props.colorBtn1}>{props.txtBtn1}</Button>

            <Button colorScheme={props.colorBtn2}>{props.txtBtn2}</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default KPopOver;
