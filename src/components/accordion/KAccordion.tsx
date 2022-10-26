import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export interface KAccordionProps {
  flex: BoxProps["flex"];
  /**
   * De esta manera se alineara el Texto
   */
  textAlign: BoxProps["textAlign"];
  /**
   * Este es el titulo de la Box
   */
  titleBox: string;
  /**
   * Este es el contenido dentro del panel
   */
  contentPanel: ReactNode;
}

const KAccordion: FC<KAccordionProps> = ({
  flex,
  textAlign,
  titleBox,
  contentPanel,
}) => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex={flex} textAlign={textAlign}>
              {titleBox}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{contentPanel}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default KAccordion;
