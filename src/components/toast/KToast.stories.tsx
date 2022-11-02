import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KToast from "./KToast";

export default {
  title: "Kraken+ChakraUI/Toast",
  component: KToast,
} as ComponentMeta<typeof KToast>;

const Template: ComponentStory<typeof KToast> = (args) => <KToast {...args} />;

export const Default = Template.bind({});
Default.args = {
  btntext: "show toast",
  color: "white",
  p: "3",
  bg: "blue.500",
  text: "hello world",
};
