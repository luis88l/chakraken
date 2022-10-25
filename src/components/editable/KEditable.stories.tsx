// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KEditable from "./KEditable";

export default {
  title: "Kraken+ChakraUI/Editable",
  component: KEditable,
} as ComponentMeta<typeof KEditable>;

const Template: ComponentStory<typeof KEditable> = (args) => (
  <KEditable {...args} />
);

export const Editable = Template.bind({});
Editable.args = {
  defaultValue: "Write here...",
};
