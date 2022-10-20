// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KPopOver from "./KPopOver";

export default {
	title: "Kraken+ChakraUI/Pop Over",
	component: KPopOver,
} as ComponentMeta<typeof KPopOver>;

const Template: ComponentStory<typeof KPopOver> = (args) => (
	<KPopOver {...args} />
);

export const PopOver1 = Template.bind({});
PopOver1.args = {
	btnTitle: "Trigger",
	fontWeight: "bold",
	border: "0",
	headerTitle: "Manage your channels",
	BodyContent: "Lorem ipsumpor incididunt ut labore et dolore.",
	borderContent: "0",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	fontSize: "sm",
	boxContent: "Step 2 of 4",
	size: "sm",
	txtBtn1: "Setup Email",
	txtBtn2: "Next",
};
