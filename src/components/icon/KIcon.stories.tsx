// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KIcon from "./KIcon";
import { CloseIcon } from "@chakra-ui/icons";

export default {
  title: "Kraken+ChakraUI/Icon",
  component: KIcon,
} as ComponentMeta<typeof KIcon>;

const Template: ComponentStory<typeof KIcon> = (args) => <KIcon {...args} />;

export const Icon = Template.bind({});
Icon.args = {
  w: "7",
  h: "7",
  color: "red.500",
  as: CloseIcon,
};
