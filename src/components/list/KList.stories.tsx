// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KList from "./KList";

export default {
  title: "Kraken+ChakraUI/List",
  component: KList,
} as ComponentMeta<typeof KList>;

const Template: ComponentStory<typeof KList> = (args) => <KList />;

export const Default = Template.bind({});
