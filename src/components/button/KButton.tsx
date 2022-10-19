import { Button, Stack } from "@chakra-ui/react"

export interface KButtonProps {
	direction
	align: string
	/**
	 * Este es el color del Boton.
	 */
	colorScheme: string
	/**
	 * Este es el tamaño del Boton
	 */
	size: string
	/**
	 * Este es el titulo del Boton
	 */
	title: string
}

function KButton(props: KButtonProps) {
	return (
		<Stack direction={props.direction} align={props.align}>
			<Button colorScheme={props.colorScheme} size={props.size}>
				{props.title}
			</Button>
		</Stack>
	)
}

export default KButton
