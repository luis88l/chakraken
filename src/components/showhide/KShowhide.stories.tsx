// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KShowhide from "./KShowhide";

export default {
	title: "Kraken+ChakraUI/Show or Hide",
	component: KShowhide,
} as ComponentMeta<typeof KShowhide>;

const Template: ComponentStory<typeof KShowhide> = (args) => <KShowhide />;

export const Default = Template.bind({});
