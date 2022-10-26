// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KImage from "./KImage";

export default {
  title: "Kraken+ChakraUI/Image",
  component: KImage,
} as ComponentMeta<typeof KImage>;

const Template: ComponentStory<typeof KImage> = (args) => <KImage {...args}/>;

export const Default = Template.bind({});
Default.args = {
  boxSize: "100px",
  objectFit: "cover",
  src: "https://bit.ly/dan-abramov",
  alt: "Dan Abramov",
};
