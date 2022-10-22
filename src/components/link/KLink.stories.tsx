// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KLink from "./KLink";

export default {
  title: "Kraken+ChakraUI/Link",
  component: KLink,
} as ComponentMeta<typeof KLink>;

const Template: ComponentStory<typeof KLink> = (args) => <KLink />;

export const Default = Template.bind({});
