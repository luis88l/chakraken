// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KBreadcrumb from "./KBreadcrumb";

export default {
	title: "Kraken+ChakraUI/Breadcrumb",
	component: KBreadcrumb,
} as ComponentMeta<typeof KBreadcrumb>;

const Template: ComponentStory<typeof KBreadcrumb> = (args) => <KBreadcrumb />;

export const Default = Template.bind({});
