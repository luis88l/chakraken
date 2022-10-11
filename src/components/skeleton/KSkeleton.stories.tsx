// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KSkeleton from "./KSkeleton";

export default {
  title: "Kraken+ChakraUI/Skeleton",
  component: KSkeleton,
} as ComponentMeta<typeof KSkeleton>;

const Template: ComponentStory<typeof KSkeleton> = (args) => <KSkeleton {...args} />;

export const Hidden = Template.bind({});
Hidden.args = {
  status: "warning",
  title: "Esto es el title del alert",
  text: "Este es el texto del alert.",
};


