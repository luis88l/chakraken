import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";

export interface KAccordionProps {
	flex;
	/**
	 * De esta manera se alinea el texto.
	 */
	textAlign;
	/**
	 * Este es el titulo del primer Box.
	 */
	titleBox1: string;
	/**
	 * Este es el tamaño de el contenido del Box
	 */
	pb: number;
	/**
	 * Este es el contenido del primer Box.
	 */
	contentPanel1: string;
	/**
	 * Este es el titulo del segundo Box
	 */
	titleBox2: string;
	/**
	 * Este es el contenido del segundo Box
	 */
	contentPanel2: string;
}

function KAccordion(props: KAccordionProps) {
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
				<AccordionPanel pb={props.pb}>{props.contentPanel1}</AccordionPanel>
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
				<AccordionPanel pb={props.pb}>{props.contentPanel2}</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

export default KAccordion;
