// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KTab from "./KTab";

export default {
  title: "Kraken+ChakraUI/Tab",
  component: KTab,
} as ComponentMeta<typeof KTab>;

const Template: ComponentStory<typeof KTab> = (args) => <KTab />;

export const Default = Template.bind({});
