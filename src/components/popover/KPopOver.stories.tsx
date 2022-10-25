// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KPopOver from "./KPopOver";

export default {
  title: "Kraken+ChakraUI/Pop Over",
  component: KPopOver,
} as ComponentMeta<typeof KPopOver>;

const Template: ComponentStory<typeof KPopOver> = (args) => (
  <KPopOver {...args} />
);

export const PopOver1 = Template.bind({});
PopOver1.args = {
  btnTitle: "Trigger",
  FontColor: "white",
  bg: "blue.800",
  borderColor: "green.800",
  fontWeight: "bold",
  border: "0",
  headerTitle: "Manage your channels",
  BodyContent:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
  borderContent: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "sm",
  boxContent: "Step 2 of 4",
  size: "sm",
  colorBtn1: "red",
  colorBtn2: "blue",
  txtBtn1: "Setup Email",
  txtBtn2: "Next",
};
