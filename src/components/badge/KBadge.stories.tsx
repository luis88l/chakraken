// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KBadge from "./KBadge";

export default {
	title: "Kraken+ChakraUI/Badge",
	component: KBadge,
} as ComponentMeta<typeof KBadge>;

const Template: ComponentStory<typeof KBadge> = (args) => <KBadge />;

export const Default = Template.bind({});
