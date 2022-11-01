// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KNumberinput from "./KNumberinput";

export default {
  title: "Kraken+ChakraUI/Number Input",
  component: KNumberinput,
} as ComponentMeta<typeof KNumberinput>;

const Template: ComponentStory<typeof KNumberinput> = (args) => (
  <KNumberinput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: 0,
  size: "lg",
  max: 100,
  min: 1,
  variant: "filled",
};
