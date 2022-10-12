// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KDrawer from "./KDrawer";

export default {
	title: "Kraken+ChakraUI/Drawer",
	component: KDrawer,
} as ComponentMeta<typeof KDrawer>;

const Template: ComponentStory<typeof KDrawer> = (args) => <KDrawer />;

export const Default = Template.bind({});
