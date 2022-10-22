// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KBadge from "./KBadge";
import { Badge } from "@chakra-ui/react";

export default {
  title: "Kraken+ChakraUI/Badge",
  component: KBadge,
} as ComponentMeta<typeof KBadge>;

const Template: ComponentStory<typeof KBadge> = (args) => <KBadge {...args} />;

export const Example1 = Template.bind({});
Example1.args = {
  src: "https://bit.ly/sage-adebayo",
  Ml: "3",
  fontWeight: "thin",
  colorScheme: "purple",
  fontSize: "sm",
  title: "Emiliano Rios",
  status: "nuevo",
  description: "Ui Engineer",
};
