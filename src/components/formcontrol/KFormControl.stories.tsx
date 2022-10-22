// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KFormControl from "./KFormControl";

export default {
  title: "Kraken+ChakraUI/Form Control",
  component: KFormControl,
} as ComponentMeta<typeof KFormControl>;

const Template: ComponentStory<typeof KFormControl> = (args) => (
  <KFormControl {...args} />
);

export const Form1 = Template.bind({});
Form1.args = {
  formtitle: "Country",
  placeholder: "Select country",
  option: "Mexico",
  option2: "Argentina",
};
