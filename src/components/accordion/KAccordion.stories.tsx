// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KAccordion from "./KAccordion";

export default {
	title: "Kraken+ChakraUI/Accordion",
	component: KAccordion,
} as ComponentMeta<typeof KAccordion>;

const Template: ComponentStory<typeof KAccordion> = (args) => <KAccordion />;

export const Default = Template.bind({});
