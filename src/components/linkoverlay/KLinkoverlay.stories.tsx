// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KLinkoverlay from "./KLinkoverlay";

export default {
  title: "Kraken+ChakraUI/Link Overlay",
  component: KLinkoverlay,
} as ComponentMeta<typeof KLinkoverlay>;

const Template: ComponentStory<typeof KLinkoverlay> = (args) => (
  <KLinkoverlay {...args} />
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
  text: "13 days ago",
  text2: "New Year, New Beginnings: Smashing Workshops & Audits",
  dateTime: "2021-01-15 15:30:00 +0000 UTC",
};
