// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KTransitions from "./KTransitions";

export default {
	title: "Kraken+ChakraUI/Transitions",
	component: KTransitions,
} as ComponentMeta<typeof KTransitions>;

const Template: ComponentStory<typeof KTransitions> = (args) => (
	<KTransitions {...args} />
);

export const Transition = Template.bind({});
Transition.args = {
	buttontext: "Click me",
	p: "40px",
	mt: "4",
	rounded: "5px",
	shadow: "2xl",
	content: "Aqui va el contenido...",
};
