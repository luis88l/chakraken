import { Image, Stack } from "@chakra-ui/react";

export interface KImageProps {
	/**
	 * Este es el tamaño de la imagen
	 */
	boxSize: number;
	objectFit;
	/**
	 * Este es el enlace para ingresar la imagen
	 */
	src: string;
	/**
	 * Este es el nombre de la imagen
	 */
	alt: string;
}

function KImage(props: KImageProps) {
	return (
		<Image
			boxSize={props.boxSize}
			objectFit={props.objectFit}
			src={props.src}
			alt={props.alt}
		/>
	);
}

export default KImage;
