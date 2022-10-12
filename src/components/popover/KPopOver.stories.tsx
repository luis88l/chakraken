// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KPopOver from "./KPopOver";

export default {
	title: "Kraken+ChakraUI/Pop Over",
	component: KPopOver,
} as ComponentMeta<typeof KPopOver>;

const Template: ComponentStory<typeof KPopOver> = (args) => <KPopOver />;

export const Default = Template.bind({});
