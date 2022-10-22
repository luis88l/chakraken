// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KKboardkey from "./KKboardkey";

export default {
  title: "Kraken+ChakraUI/Kboard key",
  component: KKboardkey,
} as ComponentMeta<typeof KKboardkey>;

const Template: ComponentStory<typeof KKboardkey> = (args) => <KKboardkey />;

export const Default = Template.bind({});
