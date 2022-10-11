// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KProgress from "./KProgress";

export default {
	title: "Kraken+ChakraUI/Progress",
	component: KProgress,
} as ComponentMeta<typeof KProgress>;

const Template: ComponentStory<typeof KProgress> = (args) => <KProgress />;

export const Default = Template.bind({});
