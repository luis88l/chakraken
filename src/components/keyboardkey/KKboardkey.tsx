import { Kbd } from "@chakra-ui/react";

export interface KKboardkeyProps {
	/**
	 * Aqui puedes ingresar el primer comando
	 */
	funcion: string;
	/**
	 * Aqui puedes ingresar el segundo comando
	 */
	funcion2: string;
}

function KKbordkey(props: KKboardkeyProps) {
	return (
		<span>
			<Kbd>{props.funcion}</Kbd> + <Kbd>{props.funcion2}</Kbd>
		</span>
	);
}

export default KKbordkey;
