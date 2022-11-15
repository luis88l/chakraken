// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KClosebutton from "./KClosebutton";

export default {
  title: "Kraken+ChakraUI/Close Button",
  component: KClosebutton,
} as ComponentMeta<typeof KClosebutton>;

const Template: ComponentStory<typeof KClosebutton> = (args) => (
  <KClosebutton {...args} />
);

export const CloseButton = Template.bind({});
CloseButton.args = {
  size: "md",
  color: "red",
};
