// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KImage from "./KImage";

export default {
  title: "Kraken+ChakraUI/Image",
  component: KImage,
} as ComponentMeta<typeof KImage>;

const Template: ComponentStory<typeof KImage> = (args) => <KImage />;

export const Default = Template.bind({});
