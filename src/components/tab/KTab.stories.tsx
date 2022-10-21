// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KTab from "./KTab";

export default {
	title: "Kraken+ChakraUI/Tab",
	component: KTab,
} as ComponentMeta<typeof KTab>;

const Template: ComponentStory<typeof KTab> = (args) => <KTab {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "One",
	title2: "Two",
	content: "Text here...",
	content2: "Write here...",
};
