// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KBreadcrumb from "./KBreadcrumb";

export default {
	title: "Kraken+ChakraUI/Breadcrumb",
	component: KBreadcrumb,
} as ComponentMeta<typeof KBreadcrumb>;

const Template: ComponentStory<typeof KBreadcrumb> = (args) => <KBreadcrumb {...args}/>;

export const Default = Template.bind({});
Default.args={
	items:[
		{
			link: "link", title: "home"
		},{
			link: "docs", title: "prueba"
		},{
			link: "page", title: "page"
		}
	]
}
