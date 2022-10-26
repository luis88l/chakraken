// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KTextarea from "./KTextarea";

export default {
  title: "Kraken+ChakraUI/Text Area",
  component: KTextarea,
} as ComponentMeta<typeof KTextarea>;

const Template: ComponentStory<typeof KTextarea> = (args) => (
  <KTextarea {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Here is a sample placeholder",
};
