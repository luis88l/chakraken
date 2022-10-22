import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

export interface KInputProps {
	pr: string;
	placeholder: string;
	width: string;
	size: string;
	h: string;
}

function KInput(props: KInputProps) {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<InputGroup size={props.size}>
			<Input
				pr={props.pr}
				type={show ? "text" : "password"}
				placeholder={props.placeholder}
			/>
			<InputRightElement width={props.width}>
				<Button h={props.h} size={props.size} onClick={handleClick}>
					{show ? "Hide" : "Show"}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}

export default KInput;
