// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KHeading from "./KHeading";

export default {
  title: "Kraken+ChakraUI/Heading",
  component: KHeading,
} as ComponentMeta<typeof KHeading>;

const Template: ComponentStory<typeof KHeading> = (args) => (
  <KHeading {...args} />
);

export const Heading = Template.bind({});
Heading.args = {
  text: "Im a heading",
};
