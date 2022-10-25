// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KLinkoverlay from "./KLinkoverlay";

export default {
  title: "Kraken+ChakraUI/Link Overlay",
  component: KLinkoverlay,
} as ComponentMeta<typeof KLinkoverlay>;

const Template: ComponentStory<typeof KLinkoverlay> = (args) => (
  <KLinkoverlay />
);

export const Default = Template.bind({});
Default.args = {
  maxW: "sm",
  p: "5",
  borderWidth: "1px",
  rounded: "md",
  size: "md",
  my: "2",
  href: "#",
  text: "New Year, New Beginnings: Smashing Workshops & Audits",
  text2: "Catch up on whats been cookin",
  dateTime: "2021-01-15 15:30:00 +0000 UTC",
};
