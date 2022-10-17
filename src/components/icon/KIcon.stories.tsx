// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KIcon from "./KIcon";

export default {
	title: "Kraken+ChakraUI/Icon",
	component: KIcon,
} as ComponentMeta<typeof KIcon>;

const Template: ComponentStory<typeof KIcon> = (args) => <KIcon />;

export const Default = Template.bind({});