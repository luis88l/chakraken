import { Box, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";

export interface KLinkoverlayProps {
	maxW: string;
	p: number;
	borderWidth: number;
	rounded: string;
	size: string;
	my: number;
	href: string;
	text: string;
	text2: string;
	dateTime: string;
}

function KLinkoverlay(props: KLinkoverlayProps) {
	return (
		<LinkBox
			as="article"
			maxW={props.maxW}
			p={props.p}
			borderWidth={props.borderWidth}
			rounded={props.rounded}
		>
			<Box as="time" dateTime={props.dateTime}>
				{props.text}
			</Box>
			<Heading size={props.size} my={props.my}>
				<LinkOverlay href={props.href}>{props.text2}</LinkOverlay>
			</Heading>
		</LinkBox>
	);
}

export default KLinkoverlay;
