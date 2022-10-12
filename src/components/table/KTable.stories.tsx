// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KTable from "./KTable";

export default {
	title: "Kraken+ChakraUI/Table",
	component: KTable,
} as ComponentMeta<typeof KTable>;

const Template: ComponentStory<typeof KTable> = (args) => <KTable />;

export const Default = Template.bind({});
