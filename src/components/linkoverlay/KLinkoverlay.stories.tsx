// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KLinkoverlay from "./KLinkoverlay";

export default {
	title: "Kraken+ChakraUI/Link Overlay",
	component: KLinkoverlay
} as ComponentMeta<typeof KLinkoverlay>;

const Template: ComponentStory<typeof KLinkoverlay> = (args) => <KLinkoverlay />;

export const Default = Template.bind({});
