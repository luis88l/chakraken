// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KLink from "./KLink";

export default {
  title: "Kraken+ChakraUI/Link",
  component: KLink,
} as ComponentMeta<typeof KLink>;

const Template: ComponentStory<typeof KLink> = (args) => <KLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: "https://chakra-ui.com",
  text: "Chakra Design system",
  mx: "2px",
};
