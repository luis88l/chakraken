// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KInput from "./KInput";

export default {
  title: "Kraken+ChakraUI/Input",
  component: KInput,
} as ComponentMeta<typeof KInput>;

const Template: ComponentStory<typeof KInput> = (args) => <KInput />;

export const Input1 = Template.bind({});
