// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KSlider from "./KSlider";

export default {
  title: "Kraken+ChakraUI/Slider",
  component: KSlider,
} as ComponentMeta<typeof KSlider>;

const Template: ComponentStory<typeof KSlider> = (args) => <KSlider />;

export const Default = Template.bind({});
Default.args = {
  defaultValue: 30,
};
