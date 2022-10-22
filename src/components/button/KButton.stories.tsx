// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KButton from "./KButton";

export default {
  title: "Kraken+ChakraUI/Button",
  component: KButton,
} as ComponentMeta<typeof KButton>;

const Template: ComponentStory<typeof KButton> = (args) => (
  <KButton {...args} />
);

export const Button1 = Template.bind({});
Button1.args = {
  direction: "row",
  align: "center",
  colorScheme: "teal",
  size: "md",
  title: "Button",
};
