// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KHidden from "./KHidden";

export default {
  title: "Kraken+ChakraUI/Hidden",
  component: KHidden,
} as ComponentMeta<typeof KHidden>;

const Template: ComponentStory<typeof KHidden> = (args) => (
  <KHidden {...args} />
);

export const Default = Template.bind({});
Default.args = {
  nameicon: "Checkmark",
};
