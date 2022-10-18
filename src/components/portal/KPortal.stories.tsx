// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KPortal from "./KPortal";

export default {
	title: "Kraken+ChakraUI/Portal",
	component: KPortal,
} as ComponentMeta<typeof KPortal>;

const Template: ComponentStory<typeof KPortal> = (args) => <KPortal {...args}/>;

export const Portal = Template.bind({});
Portal.args={
    bg:'gray.400',
    color:'white',
    text:'im here',
    portal:'This text is portaled at the end of document.body!',
}
