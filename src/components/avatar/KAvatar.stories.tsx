// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KAvatar from "./KAvatar";

export default {
	title: "Kraken+ChakraUI/Avatar",
	component: KAvatar,
} as ComponentMeta<typeof KAvatar>;

const Template: ComponentStory<typeof KAvatar> = (args) => (
	<KAvatar {...args} />
);

export const Dosxs = Template.bind({});
Dosxs.args = {
	name: "Emiliano",
	src: "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
	size: "2xs",
};
