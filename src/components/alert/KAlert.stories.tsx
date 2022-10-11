// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KAlert from "./KAlert";

export default {
  title: "Kraken+ChakraUI/Alert",
  component: KAlert,
} as ComponentMeta<typeof KAlert>;

const Template: ComponentStory<typeof KAlert> = (args) => <KAlert {...args} />;

export const Alert = Template.bind({});
Alert.args = {
  status: "warning",
  title: "Esto es el title del alert",
  text: "Este es el texto del alert.",
};

export const Success = Template.bind({});
Success.args = {
  status: "success",
  title: "Esto es el title del alert",
  text: "Este es el texto del alert.",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  status: "success",
  title: "Esto es el title del alert",
  text: "Este es el texto del alert.",
  icon: true,
};
