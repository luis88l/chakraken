// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KAccordion from "./KAccordion";

export default {
	title: "Kraken+ChakraUI/Accordion",
	component: KAccordion,
} as ComponentMeta<typeof KAccordion>;

const Template: ComponentStory<typeof KAccordion> = (args) => <KAccordion {...args} />;

export const Accordion1 = Template.bind({});
Accordion1.args={
	flex:'5',
	textAlign:'center',
	titleBox1:'Section 1 Title',
	titleBox2:'Section 2 Title',
	contentPanel1:'Text example here...',
	contentPanel2:'Text example here...',
	bg:'blue.500',
	fontColor:'white',
}