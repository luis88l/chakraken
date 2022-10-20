// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KNumberinput from "./KNumberinput";

export default {
	title: "Kraken+ChakraUI/Number Input",
	component: KNumberinput,
} as ComponentMeta<typeof KNumberinput>;

const Template: ComponentStory<typeof KNumberinput> = (args) => (
	<KNumberinput />
);

export const Default = Template.bind({});
