import { Box, Button, Fade, useDisclosure } from "@chakra-ui/react";

export interface KTransitionsProps {
	/**
	 * Titulo que llevara el boton.
	 */
	buttontext: string;
	/**
	 * Altura del contenedor
	 */
	p: number;
	/**
	 * De esta manera se alineara el contenedor
	 */
	mt: number;
	/**
	 * bordes del contenedor
	 */
	rounded: number;
	/**
	 * tamaño de la sombra
	 */
	shadow: string;
	/**
	 * Este es el contenido dentro del contenedor.
	 */
	content: string;
}

function KTranstions(props: KTransitionsProps) {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<>
			<Button onClick={onToggle}>{props.buttontext}</Button>
			<Fade in={isOpen}>
				<Box
					p={props.p}
					color="white"
					mt={props.mt}
					bg="teal.500"
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
