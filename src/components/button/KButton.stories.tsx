// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KButton from "./KButton";

export default {
	title: "Kraken+ChakraUI/Button",
	component: KButton
} as ComponentMeta<typeof KButton>;

const Template: ComponentStory<typeof KButton> = (args) => <KButton />;

export const Default = Template.bind({});
