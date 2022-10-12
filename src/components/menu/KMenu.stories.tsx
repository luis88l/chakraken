// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KMenu from "./KMenu";

export default {
	title: "Kraken+ChakraUI/Menu",
	component: KMenu,
} as ComponentMeta<typeof KMenu>;

const Template: ComponentStory<typeof KMenu> = (args) => <KMenu />;

export const Default = Template.bind({});
