import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function KAccordion(props): any {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex={props.flex} textAlign={props.textAlign}>
              {props.titleBox1}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{props.contentPanel1}</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex={props.flex} textAlign={props.textAlign}>
              {props.titleBox2}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{props.contentPanel2}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default KAccordion;
