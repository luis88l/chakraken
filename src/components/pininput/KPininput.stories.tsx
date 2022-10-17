// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KPininput from "./KPininput";

export default {
	title: "Kraken+ChakraUI/Pin input",
	component: KPininput
} as ComponentMeta<typeof KPininput>;

const Template: ComponentStory<typeof KPininput> = (args) => <KPininput />;

export const Default = Template.bind({});
