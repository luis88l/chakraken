// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KProgress from "./KProgress";

export default {
  title: "Kraken+ChakraUI/Progress",
  component: KProgress,
} as ComponentMeta<typeof KProgress>;

const Template: ComponentStory<typeof KProgress> = (args) => (
  <KProgress {...args} />
);

export const Progress1 = Template.bind({});
Progress1.args = {
  color: "green.500",
  content: "82",
  max: "100",
  min: "0",
};
