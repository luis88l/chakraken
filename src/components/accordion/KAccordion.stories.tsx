// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KAccordion from "./KAccordion";

export default {
  title: "Kraken+ChakraUI/Accordion",
  component: KAccordion,
} as ComponentMeta<typeof KAccordion>;

const Template: ComponentStory<typeof KAccordion> = (args) => <KAccordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: "warning",
  title: "Esto es el title del alert",
  text: "Este es el texto del alert.",
};


