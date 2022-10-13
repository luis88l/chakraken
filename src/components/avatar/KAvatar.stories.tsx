// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KAvatar from "./KAvatar";

export default {
	title: "Kraken+ChakraUI/Avatar",
	component: KAvatar,
} as ComponentMeta<typeof KAvatar>;

const Template: ComponentStory<typeof KAvatar> = (args) => <KAvatar {...args} />;

export const Default = Template.bind({});

export const Dosxs = Template.bind({});
Dosxs.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'2xs'};

export const Xs = Template.bind({});
Xs.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'xs'};

export const Sm = Template.bind({});
Sm.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'sm'};

export const Md = Template.bind({});
Md.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'md'};

export const Lg = Template.bind({});
Lg.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'lg'};

export const Xl = Template.bind({});
Xl.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'xl'};

export const Dosxl = Template.bind({});
Dosxl.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'2xl'};

export const Full = Template.bind({});
Full.args={name:"Emiliano", src:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=", size:'full'};