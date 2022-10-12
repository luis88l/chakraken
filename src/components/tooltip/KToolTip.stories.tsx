// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KToolTip from "./KToolTip";

export default {
	title: "Kraken+ChakraUI/Tool Tip",
	component: KToolTip,
} as ComponentMeta<typeof KToolTip>;

const Template: ComponentStory<typeof KToolTip> = (args) => <KToolTip />;

export const Default = Template.bind({});
