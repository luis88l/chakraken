import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface KAccordionProps {
  flex: BoxProps["flex"];
  /**
   * De esta manera se alineara el Texto
   */
  textAlign: BoxProps["textAlign"];
  /**
   * Este es el titulo de la Box
   */
  titleBox: string;
  contentPanel: ReactNode;
}

function KAccordion(props: KAccordionProps): any {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex={props.flex} textAlign={props.textAlign}>
              {props.titleBox}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{props.contentPanel}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default KAccordion;
