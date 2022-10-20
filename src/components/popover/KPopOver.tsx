import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	Button,
	Box,
	ButtonGroup,
} from "@chakra-ui/react";
import React from "react";

export interface KPopOverProps {
	/**
	 * Este es el titulo del Boton
	 */
	btnTitle: string;
	/**
	 * Este es el tipo de letra
	 */
	fontWeight: string;
	/**
	 * Este es el tamaño del borde del PopOver
	 */
	border: number;
	/**
	 * Este es el titulo del header
	 */
	headerTitle: string;
	/**
	 * Este es el contenido del PopOver
	 */
	BodyContent: string;
	/**
	 * Este es el tamaño del borde del contenido
	 */
	borderContent: number;
	display: string;
	/**
	 * De esta manera se alinearan los items
	 */
	alignItems: string;
	/**
	 * De esta manera se justifica el contenido.
	 */
	justifyContent: string;
	/**
	 * Este es el tamaño de la letra.
	 */
	fontSize: string;
	/**
	 * Este es el contenido del Box
	 */
	boxContent: string;
	/**
	 * Este es el tamaño de los botones dentro del PopOver
	 */
	size: string;
}

function KPopOver(props) {
	const initialFocusRef = React.useRef();
	return (
		<Popover
			initialFocusRef={initialFocusRef}
			placement="bottom"
			closeOnBlur={false}
		>
			<PopoverTrigger>
				<Button>{props.btnTitle}</Button>
			</PopoverTrigger>
			<PopoverContent color="white" bg="blue.800" borderColor="green.800">
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
						<Button colorScheme="red">{props.txtBtn1}</Button>

						<Button colorScheme="blue" ref={initialFocusRef}>
							{props.txtBtn2}
						</Button>
					</ButtonGroup>
				</PopoverFooter>
			</PopoverContent>
		</Popover>
	);
}

export default KPopOver;
