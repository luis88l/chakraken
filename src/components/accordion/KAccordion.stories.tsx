// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import KAccordion from "./KAccordion";

export default {
  title: "Kraken+ChakraUI/Accordion",
  component: KAccordion,
} as Meta;

const Template: ComponentStory<typeof KAccordion> = (args) => (
  <KAccordion {...args} />
);

export const Accordion1 = Template.bind({});
Accordion1.args = {
  flex: "5",
  textAlign: "center",
  titleBox: "Section 1 Title",
  contentPanel: "Text example here...",
};
