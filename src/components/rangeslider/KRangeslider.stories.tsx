// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KRangeslider from "./KRangeslider";

export default {
  title: "Kraken+ChakraUI/Range slider",
  component: KRangeslider,
} as ComponentMeta<typeof KRangeslider>;

const Template: ComponentStory<typeof KRangeslider> = (args) => (
  <KRangeslider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: [2, 3],
  max: 10,
  min: 1,
  minStepsBetweenThumbs: 1,
  size: "md",
};
