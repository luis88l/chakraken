// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KIconbutton from "./KIconbutton";
import { SearchIcon } from "@chakra-ui/icons";

export default {
  title: "Kraken+ChakraUI/IconButton",
  component: KIconbutton,
} as ComponentMeta<typeof KIconbutton>;

const Template: ComponentStory<typeof KIconbutton> = (args) => (
  <KIconbutton {...args} />
);

export const Iconbutton = Template.bind({});
Iconbutton.args = {
  arialabel: "search database",
  icon: <SearchIcon />,
};
