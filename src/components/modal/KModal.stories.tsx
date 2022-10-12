// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KModal from "./KModal";

export default {
	title: "Kraken+ChakraUI/Modal",
	component: KModal,
} as ComponentMeta<typeof KModal>;

const Template: ComponentStory<typeof KModal> = (args) => <KModal />;

export const Default = Template.bind({});
