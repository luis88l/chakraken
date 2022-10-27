// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KKeyboardkey from "./KKeyboardkey";

export default {
  title: "Kraken+ChakraUI/Kboard key",
  component: KKeyboardkey,
} as ComponentMeta<typeof KKeyboardkey>;

const Template: ComponentStory<typeof KKeyboardkey> = (args) => (
  <KKeyboardkey {...args} />
);

export const Default = Template.bind({});
Default.args = {
  funcion: "Ctrl",
  funcion2: "H",
};
