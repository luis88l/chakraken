// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KToolTip from "./KToolTip";

export default {
  title: "Kraken+ChakraUI/Tool Tip",
  component: KToolTip,
} as ComponentMeta<typeof KToolTip>;

const Template: ComponentStory<typeof KToolTip> = (args) => (
  <KToolTip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Search places",
  title: "Boton",
  bg: "green.600",
};
