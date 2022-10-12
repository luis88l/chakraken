// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KStat from "./KStat";

export default {
	title: "Kraken+ChakraUI/Stat",
	component: KStat,
} as ComponentMeta<typeof KStat>;

const Template: ComponentStory<typeof KStat> = (args) => <KStat />;

export const Default = Template.bind({});
