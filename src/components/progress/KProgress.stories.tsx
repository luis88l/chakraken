// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KProgress from "./KProgress";

export default {
  title: "Kraken+ChakraUI/Progress",
  component: KProgress,
} as ComponentMeta<typeof KProgress>;

const Template: ComponentStory<typeof KProgress> = (args) => <KProgress {...args} />;

export const Progress = Template.bind({});
Progress.args = {
  status: "warning",
  title: "Esto es el title del alert",
  text: "Este es el texto del alert.",
};


