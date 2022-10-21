import { Textarea } from "@chakra-ui/react";

export interface KTextareaProps {
	/**
	 * Este es el placeholder del text area.
	 */
	placeholder: string;
}

function KTextarea(props: KTextareaProps) {
	return <Textarea placeholder={props.placeholder} />;
}
export default KTextarea;
