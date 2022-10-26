// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KList from "./KList";

export default {
  title: "Kraken+ChakraUI/List",
  component: KList,
} as ComponentMeta<typeof KList>;

const Template: ComponentStory<typeof KList> = (args) => <KList {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  text2: "Este es un texto de ejemplo",
};
