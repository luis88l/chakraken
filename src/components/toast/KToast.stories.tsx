// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KToast from "./KToast";

export default {
  title: "Kraken+ChakraUI/Toast",
  component: KToast,
} as ComponentMeta<typeof KToast>;

const Template: ComponentStory<typeof KToast> = (args) => <KToast {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Cuenta creada exitosamente.",
  description: "Hemos creado su cuenta.",
  status: "success",
  duration: 9000,
  isClosable: true,
};
