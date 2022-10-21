// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KTag from "./KTag";

export default {
	title: "Kraken+ChakraUI/Tag",
	component: KTag,
} as ComponentMeta<typeof KTag>;

const Template: ComponentStory<typeof KTag> = (args) => <KTag {...args} />;

export const Default = Template.bind({});
Default.args = {
	size: "md",
	variant: "subtle",
	boxSize: "12px",
	title: "Cyan",
};
