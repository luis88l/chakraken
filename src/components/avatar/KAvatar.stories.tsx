// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KAvatar from "./KAvatar";

export default {
	title: "Kraken+ChakraUI/Avatar",
	component: KAvatar,
} as ComponentMeta<typeof KAvatar>;

const Template: ComponentStory<typeof KAvatar> = (args) => <KAvatar />;

export const Default = Template.bind({});
