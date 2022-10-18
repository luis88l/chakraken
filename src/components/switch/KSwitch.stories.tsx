// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KSwitch from "./KSwitch";

export default {
	title: "Kraken+ChakraUI/Switch",
	component: KSwitch,
} as ComponentMeta<typeof KSwitch>;

const Template: ComponentStory<typeof KSwitch> = (args) => <KSwitch {...args}/>;

export const Default = Template.bind({});

export const Switch = Template.bind({});
Switch.args={
    display:'flex',
    alignItems:'center',
    htmlFor:'email-alerts',
    mb:'0',
    text:'Enable email alerts?',
    id:'email alerts'
}
