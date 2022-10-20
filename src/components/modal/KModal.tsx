import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
} from "@chakra-ui/react";

export interface KModalProps {
	/**
	 * Este es el titulo del Boton
	 */
	BtnTitle: string;
	/**
	 * Este es el titulo del Header
	 */
	ModalHeaderTitle: string;
	/**
	 * Este es el texto del body
	 */
	ModalBodyTitle: string;
	/**
	 * Este es el titulo de el boton del Modal (Close)
	 */
	TxtBtnClose: string;
	/**
	 * Este es el titulo de el boton del Modal (Save)
	 */
	TxtBtnSave: string;
	/**
	 * Este es el estilo de el boton
	 */
	variant: string;
}

function KModal(props: KModalProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}> {props.BtnTitle} </Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{props.ModalHeaderTitle}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{props.ModalBodyTitle}</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							{props.TxtBtnClose}
						</Button>
						<Button variant={props.variant} colorScheme="green">
							{props.TxtBtnSave}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default KModal;
