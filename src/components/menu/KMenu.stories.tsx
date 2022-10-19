// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KMenu from "./KMenu";

export default {
	title: "Kraken+ChakraUI/Menu",
	component: KMenu,
} as ComponentMeta<typeof KMenu>;

const Template: ComponentStory<typeof KMenu> = (args) => <KMenu {...args} />;

export const Menu1 = Template.bind({});
Menu1.args = {
	items: [
		{
			link: "home",
			title: "home",
		},
		{
			link: "docs",
			title: "prueba",
		},
		{
			link: "page",
			title: "delete",
		},
	],
	titleMenu: "Actions",
};
