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
Menu1.args={
	colorItem:'blue.300',
	colorItemDelete:'red.500',
	colorScheme:'telegram',
	titleMenu:'Actions',
	item1:'News',
	item2:'Contact us',
	item3:'Mark as draft',
	item4:'Download',
	item5:'Delete',
	href:'https://www.google.com/',
}
