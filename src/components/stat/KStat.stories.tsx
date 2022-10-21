// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KStat from "./KStat";
import { stat } from "fs/promises";

export default {
	title: "Kraken+ChakraUI/Stat",
	component: KStat,
} as ComponentMeta<typeof KStat>;

const Template: ComponentStory<typeof KStat> = (args) => <KStat {...args} />;

export const Stat1 = Template.bind({});
Stat1.args = {
	title: "Visits",
	Number: "345,670",
	percentage: "23.36%",
	type: "increase",
};
