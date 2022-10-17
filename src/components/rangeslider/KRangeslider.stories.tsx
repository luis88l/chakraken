// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KRangeslider from "./KRangeslider";

export default {
	title: "Kraken+ChakraUI/Range slider",
	component: KRangeslider
} as ComponentMeta<typeof KRangeslider>;

const Template: ComponentStory<typeof KRangeslider> = (args) => <KRangeslider />;

export const Default = Template.bind({});
