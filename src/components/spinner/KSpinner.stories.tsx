// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KSpinner from "./KSpinner";

export default {
  title: "Kraken+ChakraUI/Spinner",
  component: KSpinner,
} as ComponentMeta<typeof KSpinner>;

const Template: ComponentStory<typeof KSpinner> = (args) => (
  <KSpinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  size: "md",
  color: "#239bbf",
};
