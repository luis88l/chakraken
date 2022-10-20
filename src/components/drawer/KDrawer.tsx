import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Input,
	DrawerContentProps,
	ColorProps,
} from "@chakra-ui/react";
import React from "react";

export interface KDrawerProps {
	/**
	 * Este es el tamaño del boton princiál
	 */
	size: string;
	/**
	 * Posicion donde se desplegara el Drawer
	 */
	placement;
	/**
	 * Este es el titulo del Drawer
	 */
	title: string;
	/**
	 * Este es el texto sombreado donde podras escribir.
	 */
	placeholder: string;
	/**
	 * Este es el estilo que tendran los botones
	 */
	variant: string;
	/**
	 * Esta es la separacion que hay entre botones
	 */
	mr: number;
	/**
	 * Este es el texto del Boton
	 */
	titleBtnDrawer: string;
	/**
	 * Este es el texto del Boton del drawer (Cancel)
	 */
	titleBtnCancel: string;
	/**
	 * Este es el texto del Boton del drawer (Save)
	 */
	titleBtnSave: string;
}

function KDrawer(props: KDrawerProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	return (
		<>
			<Button
				ref={btnRef}
				colorScheme="linkedin"
				size={props.size}
				onClick={onOpen}
			>
				{props.titleBtnDrawer}
			</Button>
			<Drawer
				isOpen={isOpen}
				placement={props.placement}
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{props.title}</DrawerHeader>

					<DrawerBody>
						<Input placeholder={props.placeholder} />
					</DrawerBody>

					<DrawerFooter>
						<Button
							variant={props.variant}
							mr={props.mr}
							colorScheme="red"
							onClick={onClose}
						>
							{props.titleBtnCancel}
						</Button>
						<Button colorScheme="blue">{props.titleBtnSave}</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default KDrawer;
