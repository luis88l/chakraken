// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KPage from "./KPage";

export default {
  title: "Kraken+ChakraUI/Page",
  component: KPage,
} as ComponentMeta<typeof KPage>;

const Template: ComponentStory<typeof KPage> = (args) => (
  <KPage {...args}>Hola</KPage>
);

export const Default = Template.bind({});
Default.args = {
  title: "Modulos",
};
