// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KProgressBar from "./KProgressBar";

export default {
	title: "Kraken+ChakraUI/Progress Bar",
	component: KProgressBar,
} as ComponentMeta<typeof KProgressBar>;

const Template: ComponentStory<typeof KProgressBar> = (args) => <KProgressBar />;

