// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KSkeleton from "./KSkeleton";

export default {
  title: "Kraken+ChakraUI/Skeleton",
  component: KSkeleton,
} as ComponentMeta<typeof KSkeleton>;

const Template: ComponentStory<typeof KSkeleton> = (args) => (
  <KSkeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  height: "30",
  width: "100%",
};
