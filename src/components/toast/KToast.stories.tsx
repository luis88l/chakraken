// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KToast from "./KToast";

export default {
  title: "Kraken+ChakraUI/Toast",
  component: KToast,
} as ComponentMeta<typeof KToast>;

const Template: ComponentStory<typeof KToast> = (args) => <KToast />;

export const Default = Template.bind({});
