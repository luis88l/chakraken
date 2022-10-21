import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KText from "./KText";

export default {
	title: "Kraken+ChakraUI/Text",
	component: KText,
} as ComponentMeta<typeof KText>;

const Template: ComponentStory<typeof KText> = (args) => <KText {...args} />;

export const Text = Template.bind({});
Text.args = {
	fontSize: "1xl",
	content: "Algunos otros tamaños de texto son 2xl 3xl 4xl md lg...etc",
};
