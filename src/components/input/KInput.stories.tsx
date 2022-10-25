// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KInput from "./KInput";

export default {
  title: "Kraken+ChakraUI/Input",
  component: KInput,
} as ComponentMeta<typeof KInput>;

const Template: ComponentStory<typeof KInput> = (args) => <KInput />;

export const Input1 = Template.bind({});
Input1.args = {
  size: "md",
  pr: "4.5rem",
  placeholder: "Enter password",
  width: "4.5rem",
  h: "1.75rem",
};
